import { gsap } from "gsap";

/**
 * Template component
 * explain what this class is doing
 */
export default class Loader {
    constructor() {
        /**
         *
         * @type {{letter: string, letterAlt: string}}
         */
        this.DOM = {
            loader: ".js-loader",
            loaderLogo: ".js-loader-logo",
            loaderClipper: ".js-loader-clipper",
            letter: ".js-letter-initial",
            letterAlt: ".js-letter-alt",
        };

        /**
         *
         * @type {Element}
         */
        this.loader = document.querySelector(this.DOM.loader);

        /**
         *
         * @type {Element}
         */
        this.loaderLogo = document.querySelector(this.DOM.loaderLogo);

        /**
         *
         * @type {Element}
         */
        this.loaderClipper = document.querySelector(this.DOM.loaderClipper);

        /**
         *
         * @type {NodeListOf<Element>}
         */
        this.letters = document.querySelectorAll(this.DOM.letter);

        /**
         *
         * @type {NodeListOf<Element>}
         */
        this.lettersAlt = document.querySelectorAll(this.DOM.letterAlt);

        this.link = document.querySelectorAll("a");
    }

    /**
     * Init
     */
    init() {
        if (!this.loader || this.link.length < 1) {
            return;
        }

        for (let i = 0; i < this.link.length; i++) {
            if (this.link[i].classList.contains("no-loader")) {
                continue;
            }

            this.link[i].addEventListener("click", (ev) => {
                if (this.link[i].target !== "_blank") {
                    ev.preventDefault();
                    this.delayedAnimation(this.link[i].href);
                }
            });
        }

        this.studioLoader();

        if (this.loader.classList.contains("is-shown")) {
            this.studioLoader();
        }
    }

    delayedAnimation(url) {
        if (url !== "" || url != null) {
            gsap.timeline({
                onComplete: () => {
                    this.loader.classList.add("is-shown");
                    setTimeout(() => {
                        window.location.href = url;
                    }, 10);
                },
            })
                .to(
                    this.loaderClipper,
                    {
                        duration: 1.4,
                        ease: "expo.inOut",
                        y: "0%",
                    },
                    "clip",
                )
                .to(
                    this.loader,
                    {
                        duration: 1.4,
                        ease: "expo.inOut",
                        y: "0%",
                    },
                    "clip",
                )
                .fromTo(
                    this.loaderLogo,
                    {
                        autoAlpha: 0,
                        y: "-50%",
                    },
                    {
                        duration: 0.6,
                        autoAlpha: 1,
                        y: "0%",
                        ease: "expo.out",
                    },
                    "clip+=0.6",
                );
        }
    }

    /**
     *
     */
    studioLoader() {
        gsap.set(this.lettersAlt, {
            autoAlpha: 0,
            fill: "#FFFFFF",
        });

        const studioTimeline = gsap.timeline({
            paused: true,
            delay: 0.5,
            onComplete: () => {
                gsap.set([this.letters, this.loaderLogo], {
                    autoAlpha: 1,
                });

                gsap.set(this.lettersAlt, {
                    autoAlpha: 0,
                });
            },
        });

        const duration = 0;
        const each = 0.15;

        studioTimeline
            .add("start")
            .to(
                this.lettersAlt,
                {
                    autoAlpha: 1,
                    duration: duration,
                    stagger: {
                        from: "random",
                        each: each,
                    },
                },
                "start",
            )
            .to(
                this.letters,
                {
                    autoAlpha: 0,
                    duration: duration,
                    stagger: {
                        grid: [3, 6],
                        from: "random",
                        each: each,
                    },
                },
                "start",
            )
            .add("clip")
            .fromTo(
                this.loaderLogo,
                {
                    autoAlpha: 1,
                    y: "0%",
                },
                {
                    duration: 0.6,
                    autoAlpha: 0,
                    y: "-50%",
                    ease: "expo.out",
                },
                "clip+=0.6",
            )
            .to(
                this.loaderClipper,
                {
                    duration: 1.4,
                    ease: "expo.inOut",
                    y: "-100%",
                },
                "clip",
            )
            .to(
                this.loader,
                {
                    duration: 1.4,
                    ease: "expo.inOut",
                    y: "100%",
                },
                "clip",
            );

        studioTimeline.timeScale(1).play();
    }
}
