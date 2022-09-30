import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * OnScrollAnimations component
 * explain what this class is doing
 */
export default class OnScrollAnimations {
    constructor() {
        /**
         * OnScrollAnimations component DOM selectors
         * @type {{templateComponentArray: string, templateComponent: string, states: {isActive: string}}}
         */
        this.DOM = {
            animationTranslate: ".js-animation-translate",
            states: {
                isInViewport: "is-in-viewport",
            },
        };

        /**
         * Fetch animated component list of DOM elements
         * @type {NodeListOf<Element>}
         */
        this.animationsTranslate = document.querySelectorAll(this.DOM.animationTranslate);
    }

    /**
     * Init
     */
    init() {
        if (this.animationsTranslate.length < 1) {
            return;
        }
        console.log("OnScrollAnimations component init");
        this.animationsInit();
        // this.pinInit();
    }

    /**
     * OnScrollAnimations method
     * explain what this method is doing
     */
    animationsInit() {
        gsap.defaults({ overwrite: "auto", duration: 0.5 });

        const duration = 2;

        for (let i = 0, l = this.animationsTranslate.length; i < l; i++) {
            ScrollTrigger.create({
                trigger: this.animationsTranslate[i],
                start: "top 100%",
                end: "400%",
                // markers: true,
                scrub: 0.2,
                // scrub: true,
                toggleClass: this.DOM.states.isInViewport,
                animation: gsap.to(this.animationsTranslate[i], {
                    x: "-100%",
                    duration: duration,
                    ease: "power3.out",
                }),
            });
        }
    }

    pinInit() {
        ScrollTrigger.create({
            trigger: ".js-credits",
            start: "bottom bottom",
            end: "200vh",
            pin: ".js-credits-title-top",
            pinType: "fixed",
            markers: true,
        });
    }
}
