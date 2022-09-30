import { gsap } from "gsap/dist/gsap";

export default class PerspectiveParallax {
    constructor() {
        this.DOM = {
            body: "body",
            //
            mousemoveParallaxContainer: ".js-mousemove-parallax-container",
            mousemoveParallaxItem: ".js-mousemove-parallax-item",
        };

        this.body = document.getElementsByTagName(this.DOM.body)[0];

        this.mousemoveParallaxContainer = document.querySelector(this.DOM.mousemoveParallaxContainer);
        this.mousemoveParallaxItem = document.querySelector(this.DOM.mousemoveParallaxItem);
    }

    init() {
        // console.log("PerspectiveParallax init()");

        if (!this.mousemoveParallaxContainer || window.innerWidth < 1024) {
            return;
        }

        this.initMouseEvents();
    }

    initMouseEvents() {
        this.body.addEventListener("mousemove", (ev) => {
            this.linkImagesMousemove(ev);
        });
    }

    linkImagesMousemove(ev) {
        const amountX = ev.clientX / window.innerWidth - 0.5;
        const amountY = ev.clientY / window.innerHeight - 0.5;

        gsap.to(this.mousemoveParallaxItem, {
            rotationY: 10 * amountX,
            rotationX: 10 * amountY,
            x: (i, target) => -amountX * target.dataset.speed * 330,
            y: (i, target) => -amountY * target.dataset.speed * 330,
            transformPerspective: 700,
            ease: "quad.out",
            duration: 0.5,
        });
    }
}
