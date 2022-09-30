import { gsap } from "gsap";

/**
 * ImageTrail component
 */

// body element
const body = document.body;

// helper functions
const MathUtils = {
    // linear interpolation
    lerp: (a, b, n) => (1 - n) * a + n * b,
    // distance between two points
    distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
};

// calculate the viewport size
let winsize;
const calcWinsize = () => (winsize = { width: window.innerWidth, height: window.innerHeight });
calcWinsize();
// and recalculate on resize
window.addEventListener("resize", calcWinsize);

// get the mouse position
const getMousePos = (ev) => {
    const elementBox = ev.currentTarget.getBoundingClientRect();
    let posx = 0;
    let posy = 0;
    if (!ev) ev = window.event;
    posx = ev.clientX;
    posy = ev.clientY - elementBox.top;
    return { x: posx, y: posy };
};

// mousePos: current mouse position
// cacheMousePos: previous mouse position
// lastMousePos: last last recorded mouse position (at the time the last image was shown)
let lastMousePos = 0;
let cacheMousePos = 0;
let mousePos = (lastMousePos = cacheMousePos = { x: 0, y: 0 });
let getMouseDistance = null;

class Image {
    constructor(img) {
        this.image = img;
        // image default styles
        this.defaultStyle = {
            x: 0,
            y: 0,
            opacity: 0,
        };
        // get sizes/position
        this.getRect();
        // init/bind events
        this.initEvents();
    }
    initEvents() {
        // on resize get updated sizes/position
        window.addEventListener("resize", () => this.resize());
    }
    resize() {
        // reset styles
        gsap.set(this.image, this.defaultStyle);
        // get sizes/position
        this.getRect();
    }
    getRect() {
        this.rect = this.image.getBoundingClientRect();
    }
    isActive() {
        // check if image is animating or if it's visible
        return gsap.isTweening(this.image) || this.image.style.opacity != 0;
    }
}

export default class ImageTrail {
    constructor() {
        this.DOM = {
            images: ".js-image-trail-img",
            wrapper: ".js-image-trail",
        };

        // images container
        this.wrapper = document.querySelector(this.DOM.wrapper);

        if (this.wrapper == null) {
            return;
        }

        this.images = this.wrapper.querySelectorAll(this.DOM.images);

        if (this.wrapper.length < 1) {
            return;
        }

        // array of Image objs, one per image element
        this.imageArray = [];
        this.images.forEach((img) => {
            this.imageArray.push(new Image(img));
        });
        // total number of images
        this.imagesTotal = this.imageArray.length;
        // upcoming image index
        this.imgPosition = 0;
        // zIndex value to apply to the upcoming image
        this.zIndexVal = 1;
        // mouse distance required to show the next image
        this.threshold = 100;
    }

    init() {
        if (this.wrapper == null || this.images.length < 1) {
            return;
        }

        // update the mouse position
        this.wrapper.addEventListener("mousemove", (ev) => (mousePos = getMousePos(ev)));

        // gets the distance from the current mouse position to the last recorded mouse position
        getMouseDistance = () => MathUtils.distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);

        // Preload images
        const preloadImages = () => {
            return new Promise((resolve, reject) => {
                imagesLoaded(this.images, resolve);
            });
        };

        preloadImages().then(() => {
            this.imageArray.forEach((img, index) => {
                this.imageArray[index].rect.height = img.image.clientHeight;
            });

            // render the images
            requestAnimationFrame(() => this.render());
        });
    }

    render() {
        // get distance between the current mouse position and the position of the previous image
        let distance = getMouseDistance();
        // cache previous mouse position
        cacheMousePos.x = MathUtils.lerp(cacheMousePos.x || mousePos.x, mousePos.x, 0.1);
        cacheMousePos.y = MathUtils.lerp(cacheMousePos.y || mousePos.y, mousePos.y, 0.1);

        // if the mouse moved more than [this.threshold] then show the next image
        if (distance > this.threshold) {
            let direction = 0;

            if (mousePos.x - lastMousePos.x < 0) {
                direction = -1;
            } else {
                direction = 1;
            }

            this.showNextImage(direction);

            ++this.zIndexVal;
            this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;

            lastMousePos = mousePos;
        }

        // check when mousemove stops and all images are inactive (not visible and not animating)
        let isIdle = true;
        for (let img of this.imageArray) {
            if (img.isActive()) {
                isIdle = false;
                break;
            }
        }
        // reset z-index initial value
        if (isIdle && this.zIndexVal !== 1) {
            this.zIndexVal = 1;
        }

        // loop..
        requestAnimationFrame(() => this.render());
    }
    showNextImage(direction) {
        // show image at position [this.imgPosition]
        const img = this.imageArray[this.imgPosition];
        // kill any tween on the image
        gsap.killTweensOf(img.image);

        gsap.timeline()
            // show the image
            .set(
                img.image,
                {
                    startAt: { opacity: 0 },
                    opacity: 1,
                    rotation: "0deg",
                    zIndex: this.zIndexVal,
                    x: cacheMousePos.x - img.rect.width / 2,
                    y: cacheMousePos.y - img.rect.height / 2,
                },
                0,
            )
            // animate position
            .to(
                img.image,
                {
                    duration: 1.8,
                    ease: "expo.out",
                    rotation: `${direction * 4}deg`,
                    x: mousePos.x - img.rect.width / 2,
                    y: mousePos.y - img.rect.height / 2,
                },
                0,
            )
            // translate down the image
            .to(
                img.image,
                {
                    duration: 1.5,
                    ease: "expo.in",
                    y: `+=${winsize.height + img.rect.height}`,
                },
                0.8,
            );
    }
}
