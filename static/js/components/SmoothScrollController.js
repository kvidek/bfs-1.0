import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scroll controller
 * smooth scroll via gsap scrolltrigger
 */
export default class SmoothScrollController {
    constructor() {
        /**
         * Template component DOM selectors
         * @type {{templateComponentArray: string, templateComponent: string, states: {isActive: string}}}
         */
        this.DOM = {
            smoothScroll: ".js-smooth-scroll",
            smoothScrollContent: ".js-smooth-scroll-content",
            states: {},
        };

        /**
         *
         * @type {Element}
         */
        this.smoothScroll = document.querySelector(this.DOM.smoothScroll);

        /**
         *
         * @type {Element}
         */
        this.smoothScrollContent = document.querySelector(this.DOM.smoothScrollContent);

        this.height = null;
    }

    /**
     * Init
     */
    init() {
        if (this.smoothScroll === null) {
            return;
        }
        // if (this.templateComponentArray.length < 1) {
        //     return;
        // }
        console.log("SmoothScrollController init()");
        this.setHeight();
        this.smoothScrollInit();
    }

    /**
     * Template method
     * explain what this method is doing
     */
    smoothScrollInit() {
        gsap.defaults({ overwrite: "auto", duration: 0.3 });

        ScrollTrigger.addEventListener("refreshInit", () => {
            this.setHeight();
        });

        ScrollTrigger.create({
            start: 1,
            animation: gsap.to(this.smoothScrollContent, {
                duration: 1,
                y: () => -(this.height - document.documentElement.clientHeight),
                ease: "none",
            }),
            end: () => ScrollTrigger.maxScroll(window) - 1,
            scrub: 1,
            invalidateOnRefresh: true,
        });
    }

    setHeight() {
        this.height = this.smoothScrollContent.clientHeight;
        document.body.style.height = this.height + "px";
    }
}
