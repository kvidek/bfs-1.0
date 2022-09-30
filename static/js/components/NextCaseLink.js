import gsap from "gsap/dist/gsap";

/**
 * ColorSwitch component
 * explain what this class is doing
 */
export default class NextCaseLink {
    constructor() {
        /**
         * NextCaseLink component DOM selectors
         */
        this.DOM = {
            link: ".js-next-project-link",
            image: ".js-next-project-image",
        };

        this.link = document.querySelector(this.DOM.link);
        this.image = document.querySelector(this.DOM.image);
    }

    /**
     * Init
     */
    init() {
        if (!this.link || !this.image) {
            return;
        }

        this.controller();
    }

    controller() {
        gsap.set(this.image, {
            autoAlpha: 0,
        });

        this.link.addEventListener("mouseenter", () => {
            gsap.to(this.image, {
                autoAlpha: 1,
                rotate: "2.5deg",
                ease: "power4.out",
            });
        });

        this.link.addEventListener("mouseleave", () => {
            gsap.to(this.image, {
                autoAlpha: 0,
                rotate: "0deg",
                ease: "power4.out",
            });
        });

        this.link.addEventListener("mousemove", (e) => {
            const rect = e.target.getBoundingClientRect();
            const posx = (e.clientX - rect.left) / e.currentTarget.offsetWidth - 0.5;
            const posy = (e.clientY - rect.top) / e.currentTarget.offsetHeight - 0.5;

            gsap.to(this.image, {
                rotationY: 10 * posx,
                rotationX: 10 * posy,
                x: -posx * 0.15 * 330,
                y: -posy * 0.15 * 330,
                transformPerspective: 500,
                ease: "quad.out",
                duration: 0.5,
            });
        });
    }
}
