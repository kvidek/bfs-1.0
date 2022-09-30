import 'ab-interchange';
import abMediaQuery from 'ab-mediaquery';
import gsap from "gsap/dist/gsap";
import LocomotiveScroll from "locomotive-scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * OnScrollAnimations component
 * explain what this class is doing
 */
export default class LocomotiveScrollController {
    constructor() {
        /**
         * OnScrollAnimations component DOM selectors
         * @type {{templateComponentArray: string, templateComponent: string, states: {isActive: string}}}
         */
        this.DOM = {};

        document.documentElement.classList.add("is-loaded");
        document.documentElement.classList.remove("is-loading");

        this.animate = true;

        this.mobile = false;
        this.isLanding = false;

        this.projects = document.querySelectorAll(".js-project-inner");

        AB.plugins.mediaQuery({
            bp: {
                // sm:  'screen and (max-width: 480px)',
                md:     'screen and (max-width: 1024px)',
                lg:     'screen and (max-width: 1140px)',
                // xl:      'screen and (max-width: 1440px)',
                xla:      'screen and (min-width: 2000px)',
                xlb:      'screen and (min-width: 3000px)',
                xxl:      'screen and (min-width: 4000px)'
            }
        });

        setTimeout(() => {
            document.documentElement.classList.add("is-ready");
            // this.triggerResize();
        }, 300);
    }

    /**
     * Init
     */
    init() {
        const self = this;

        this.scrollWrapper = document.querySelector("#js-scroll");


        if (!this.scrollWrapper) {
            return;
        }

        if (this.scrollWrapper.classList.contains("is-landing")) this.isLanding = true;

        self.locomotiveMethod();

        ScrollTrigger.addEventListener("refreshInit", () => {
            this.locoScroll.update();
            this.setHeight();
        });

        window.addEventListener('changed.ab-mediaquery', () => {
            location.reload();
            this.locoScroll.update();
        });

        function locomotiveHeightBug(){
            self.locoScroll.update();
            self.setHeight();
        }
        setInterval(locomotiveHeightBug, 1000);
    }

    setHeight() {
        window.scrollHeight = this.locoScroll.options.el.offsetHeight;
    }

    locomotiveMethod () {
        const self = this;
        let options = {
            el: this.scrollWrapper,
            smooth: true,
            getSpeed: true,
            getDirection: true,
            offset: ["0%", "-10%"],
            initPosition: { x: 0, y: 0 },
            reloadOnContextChange: true,
            lerp: 0.1,
            class: "is-inview",
            scrollbarContainer: !1,
            scrollbarClass: "c-scrollbar",
            scrollingClass: "has-scroll-scrolling",
            draggingClass: "has-scroll-dragging",
            smoothClass: "has-scroll-smooth",
            initClass: "has-scroll-init",
            scrollFromAnywhere: true,
            multiplier: 1,
            firefoxMultiplier: 50,
            touchMultiplier: 2,
            resetNativeScroll: false,
            tablet: {
                smooth: false,
                direction: "vertical",
                gestureDirection: "vertical",
                breakpoint: 1024,
            },
            smartphone: {
                smooth: false,
                direction: "vertical",
                gestureDirection: "vertical",
            },
        };

        self.locoScroll = new LocomotiveScroll(options);

        // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
        ScrollTrigger.scrollerProxy("#js-scroll", {
            scrollTop(value) {
                return arguments.length ? self.locoScroll.scrollTo(value, 0, 0) : self.locoScroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: document.querySelector("#js-scroll").style.transform ? "transform" : "fixed",
        });

        // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
        ScrollTrigger.addEventListener("refresh", () => self.locoScroll.update());

        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();

        const height = (window.scrollHeight = self.locoScroll.options.el.offsetHeight);
        this.scrollPosition = 0;

        // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
        self.locoScroll.on("scroll", (instance) => {
            ScrollTrigger.update;
            instance.direction === "up" ? (this.direction = "up") : (this.direction = "down");
            document.documentElement.setAttribute("data-direction", instance.direction);

            this.scrollPosition = Math.round(instance.scroll.y) || this.scrollPosition;

            let offsetY = `${-((50 / window.scrollHeight) * this.scrollPosition)}vh`;

            if (window.innerWidth < 1024) {
                offsetY = `${this.scrollPosition - 150}px`;
            }

            if (document.querySelector(".js-header-title")) {
                gsap.set(".js-header-title", {
                    y: offsetY,
                });
            }
        });

        self.locoScroll.on("call", (value, way, obj) => {});

        if (window.innerWidth > 1024 && this.isLanding) {
            setTimeout(() => {
                this.autoScroll(self.locoScroll);
            }, 2000);
        }
    }

    triggerResize() {
        const self = this;

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
              self.locoScroll.update();
          }),
        );
    }

    // Debounce function: Input as function which needs to be debounced and delay is the debounced time in milliseconds
    debounceFunction(func, delay) {
        // Cancels the setTimeout method execution
        clearTimeout(this.timerId);

        // Executes the func after delay time.
        this.timerId = setTimeout(func, delay);
    }

    autoScroll(locoScroll) {
        const pageScroll = () => {
            if (!this.animate) {
                return;
            }

            locoScroll.scrollTo(this.scrollPosition + 20, {
                duration: 100,
                easing: [0.0, 0.0, 1.0, 1.0],
                disableLerp: true,
                offset: 0,
                callback: () => {
                    if (this.scrollPosition <= window.scrollHeight - window.innerHeight) {
                        pageScroll();
                    }
                },
            });
        };

        pageScroll();

        this.stopAutoScroll();
    }

    stopAutoScroll() {
        document.addEventListener("wheel", () => {
            this.animate = false;
        });

        if (this.projects.length > 0) {
            this.projects.forEach((project) => {
                project.addEventListener("mouseenter", () => {
                    if (this.animate) this.animate = false;
                });
            });
        }
    }
}
