import gsap from "gsap/dist/gsap";

/**
 * ColorSwitch component
 * explain what this class is doing
 */
export default class ColorSwitchController {
    constructor() {
        /**
         * ColorSwitch component DOM selectors
         * @type {{templateComponentArray: string, templateComponent: string, states: {isActive: string}}}
         */
        this.DOM = {
            html: "html",
            trigger: ".js-color-switch-trigger",
            isMobileClassName: ".is-mobile",
            states: {
                colorChanged: "is-color-changed",
            },
        };

        this.html = document.documentElement;
        this.triggers = document.querySelectorAll(this.DOM.trigger);
        this.initialBodyTextColor = this.html.dataset.initBodyTextColor;
        this.initialBodyBgColor = this.html.dataset.initBodyBgColor;
    }

    /**
     * Init
     */
    init() {
        if (this.triggers.length > 0 && window.innerWidth > 1024) {
            this.colorSwitch();
        }
    }

    /**
     * ColorSwitch method
     * explain what this method is doing
     */
    colorSwitch() {
        // console.log("ColorSwitch method init");
        for (let trigger of this.triggers) {
            trigger.addEventListener("mouseenter", () => {
                if(!document.body.classList.contains('is-mobile')) {
                    this.html.classList.add(this.DOM.states.colorChanged);
                    this.switchColors(trigger);
                }
            });

            trigger.addEventListener("mouseleave", () => {
                if(!document.body.classList.contains('is-mobile')) {
                    this.html.classList.remove(this.DOM.states.colorChanged);
                    this.reverseColors();
                }
            });
        }
    }

    switchColors(trigger) {
        gsap.to("html", {
            "--body-text-color": `${trigger.dataset.color}`,
            "--body-bg-color": `${trigger.dataset.bgColor}`,
            duration: 0.3,
            overwrite: "auto",
        });
    }

    reverseColors() {
        gsap.to("html", {
            "--body-text-color": `${this.initialBodyTextColor}`,
            "--body-bg-color": `${this.initialBodyBgColor}`,
            duration: 0.3,
            overwrite: "auto",
        });
    }
}
