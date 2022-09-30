import gsap from "gsap";

export default class ImageTrailSlider {
    constructor() {
        this.DOM = {
            images: ".js-image-trail-img",
            wrapper: ".js-image-trail",
        };

        this.wrapper = document.querySelectorAll(this.DOM.wrapper);
    }
    init() {
        if (this.wrapper.length < 1) {
            return;
        }

        this.wrapper.forEach((wrapper) => {
            this.singleSlider(wrapper);
        });
    }

    singleSlider(wrapper) {
        const images = wrapper.querySelectorAll(this.DOM.images);

        images.forEach((image, index) => {
            const delay = index * 0.3;

            gsap.set(image, {
                autoAlpha: 0,
                rotate: `${6 - Math.random() * 12}deg`,
                zIndex: index,
            });

            gsap.set(image, {
                autoAlpha: 1,
                delay: delay,
                onComplete: () => {
                    if (index === images.length - 1) {
                        this.singleSlider(wrapper);
                    }
                },
            });

            gsap.set(image, {
                autoAlpha: 0,
                delay: delay + 1.5,
            });
        });
    }
}
