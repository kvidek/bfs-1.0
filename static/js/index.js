/**
 * MAIN JS FILE
 */

/**
 * Helpers
 * Imports of helper functions are stripped out of bundle
 * Include them within "start-strip-code" and "end-strip-code" comments
 */
/* start-strip-code */
import GridHelper from "./helpers/GridHelper";
/* end-strip-code */

import LazyLoad from "vanilla-lazyload";

/**
 * Components
 */
import ColorSwitchController from "./components/ColorSwitchController";
import VideoController from "./components/VideoController";
import ImageTrail from "./components/ImageTrail";
import ImageTrailSlider from "./components/ImageTrailSlider";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import LocomotiveScrollController from "./components/LocomotiveScrollController";
import HeaderTitle from "./components/HeaderTitle";
import CookieController from "./components/CookieController";
import PerspectiveParallax from "./components/PerspectiveParallax";
import NextCaseLink from "./components/NextCaseLink";
import MQ from "./components/MQ";
import PetPakAwwwards from "./components/PetPakAwwwards";

/**
 * Check if document is ready cross-browser
 * @param callback
 */
const ready = (callback) => {
    if (document.readyState !== "loading") {
        /**
         * Document is already ready, call the callback directly
         */
        callback();
    } else if (document.addEventListener) {
        /**
         * All modern browsers to register DOMContentLoaded
         */
        document.addEventListener("DOMContentLoaded", callback);
    } else {
        /**
         * Old IE browsers
         */
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState === "complete") {
                callback();
            }
        });
    }
};

/**
 * Document ready callback
 */
ready(() => {
    // 100vh on mobile fix
    const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };

    window.addEventListener("resize", appHeight);
    appHeight();

    /**
     * HELPERS INIT
     * Only init helpers if they exist
     * Will be undefined on production because of import stripping
     */
    if (typeof GridHelper == "function") {
        const grid = new GridHelper();
        grid.init();
    }

    /**
     * CREDITS INIT
     */
    const credits = [
        "background-color: #000000",
        "color: white",
        "display: block",
        "line-height: 24px",
        "text-align: center",
        "border: 1px solid #ffffff",
        "font-weight: bold",
    ].join(";");
    console.info("by: %c Bornfight's blue collar ", credits);

    const lazyLoadInstance = new LazyLoad({
        elements_selector: ".js-lazy",
    });

    /**
     * COMPONENTS INIT
     */

    /**
     * MQ Controller
     * @type {MQ}
     */
    const mq = new MQ();
    mq.init();

    /**
     * Template component
     * @type {TemplateComponent}
     */
    const colorSwitch = new ColorSwitchController();
    colorSwitch.init();

    /**
     * Navigation
     * @type {NavigationController}
     */
    // const navigation = new NavigationController();
    // navigation.init();

    /**
     * VideoController Controller
     * @type {videoController}
     */
    const videoController = new VideoController();
    videoController.init();

    /**
     * CustomCursor Controller
     * @type {CustomCursor}
     */
    const customCursor = new CustomCursor();
    customCursor.init();

    /**
     * CustomCursor Controller
     * @type {CustomCursor}
     */
    const loader = new Loader();
    loader.init();

    // const onScrollAnimations = new OnScrollAnimations();
    // onScrollAnimations.init();

    const locomotiveScrollController = new LocomotiveScrollController();
    locomotiveScrollController.init();

    const headerTitle = new HeaderTitle();
    headerTitle.init();

    const cookieController = new CookieController();
    cookieController.init();

    const perspectiveParallax = new PerspectiveParallax();
    perspectiveParallax.init();

    const nextCaseLink = new NextCaseLink();
    nextCaseLink.init();

    const petPakAwwwards = new PetPakAwwwards();
    petPakAwwwards.init();

    /**
     * ImageTrail Controller
     * @type {imageTrail}
     */
    if (window.innerWidth > 1024) {
        const imageTrail = new ImageTrail();
        imageTrail.init();
    } else {
        const imageTrailSlider = new ImageTrailSlider();
        imageTrailSlider.init();
    }

    const services = document.querySelector(".js-services") !== null;
    if (services) {
        const servicesArray = ["web production", "digital branding", "content strategy"];
        let curServicesIndex = -1;
        const advanceNewsItem = function () {
            clearInterval(intervalID);
            ++curServicesIndex;
            if (curServicesIndex >= servicesArray.length) {
                curServicesIndex = 0;
            }
            document.querySelector(".js-services").innerHTML = servicesArray[curServicesIndex];
            intervalID = setInterval(advanceNewsItem, 800);
        };
        let intervalID = setInterval(advanceNewsItem, 800);
    }
});
