import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeaderTitle component
 */
export default class HeaderTitle {
    constructor() {
        /**
         * HeaderTitle component DOM selectors
         * @type {{video: string}}
         */
        this.DOM = {
            title: ".js-header-title",
            titleAddon: ".js-header-title-addon",
            wrapper: ".js-header-wrapper",
        };

        this.title = document.querySelector(this.DOM.title);
        this.titleAddon = document.querySelectorAll(this.DOM.titleAddon);
        this.wrapper = document.querySelector(this.DOM.wrapper);
    }

    /**
     * Init
     */
    init() {
        if (!this.title || !this.titleAddon) {
            return;
        }

        this.titleScroll();
    }

    titleScroll() {

        let bodyScrollOpacity = 0.05;
        let start = `top 10%`;

        if (window.innerWidth < 1024) {
            start = `top 50%`;
            bodyScrollOpacity = 0;
        }

        gsap.set(this.titleAddon, {
            autoAlpha: 0,
        });

        ScrollTrigger.create({
            trigger: this.title,
            start: "top 25%",
            end: `bottom ${window.scrollHeight / 2}px`,
            scroller: "#js-scroll",
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // console.log(window.offsetY);
            },
            // markers: true,
            onEnter: () => {
                gsap.to(this.title, {
                    autoAlpha: bodyScrollOpacity,
                });
            },
            onEnterBack: () => {
                gsap.to(this.title, {
                    autoAlpha: 1,
                });
            },
        });

        ScrollTrigger.create({
            trigger: ".js-image-trail",
            start: start,
            end: 200,
            scroller: "#js-scroll",
            invalidateOnRefresh: true,
            // markers: true,
            onEnter: () => {
                if (this.wrapper) {
                    this.wrapper.classList.add("is-on-bottom");
                }

                gsap.fromTo(
                    this.titleAddon,
                    {
                        autoAlpha: 0,
                        y: "35%",
                    },
                    {
                        autoAlpha: 1,
                        y: "0%",
                        ease: "expo.out",
                        stagger: {
                            each: 0.1,
                            from: "start",
                        },
                    },
                );
                gsap.to(this.title, {
                    autoAlpha: 1,
                });
            },
            onEnterBack: () => {
                if (this.wrapper) {
                    this.wrapper.classList.remove("is-on-bottom");
                }

                gsap.to(this.titleAddon, {
                    autoAlpha: 0,
                    y: "10%",
                    ease: "expo.in",
                    stagger: {
                        each: 0.1,
                        from: "end",
                    },
                });
                gsap.to(this.title, {
                    autoAlpha: bodyScrollOpacity,
                });
            },
        });

        function debounce(func) {
            var timer;
            return function (event) {
                if (timer) clearTimeout(timer);
                timer = setTimeout(func, 100, event);
            };
        }

        window.addEventListener(
          "resize",
          debounce(() => {
              console.log("resize");
              ScrollTrigger.refresh();
          }),
        );
    }
}
