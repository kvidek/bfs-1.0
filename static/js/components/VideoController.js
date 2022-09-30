import gsap from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * VideoController component
 */
export default class VideoController {
    constructor() {
        /**
         * VideoController component DOM selectors
         * @type {{video: string}}
         */
        this.DOM = {
            video: ".js-video",
        };

        this.videos = document.querySelectorAll(this.DOM.video);
    }

    /**
     * Init
     */
    init() {
        if (this.videos.length > 0) {
            this.videos.forEach((video) => {
                this.singleVideo(video);
            });
        }
    }

    /**
     *
     * @param {HTMLElement} video
     */
    singleVideo(video) {
        let screenCheck = window.matchMedia("(min-width: 1024px)");
        screenCheck.addEventListener("change", () => {
            this.whichSizeVideo(video, screenCheck.matches);
        });

        this.whichSizeVideo(video, screenCheck.matches);

        ScrollTrigger.create({
            trigger: video,
            start: "top 50%",
            end: "bottom 30%",
            // scroller: "#js-scroll",
            onEnter: () => {
                if (window.innerWidth < 1024) {
                    this.play(video);
                }
            },
            onEnterBack: () => {
                if (window.innerWidth < 1024) {
                    this.play(video);
                }
            },
            onLeave: () => {
                this.pause(video);
            },
            onLeaveBack: () => {
                this.pause(video);
            },
        });

        video.addEventListener("mouseenter", () => {
            this.play(video);
        });

        video.addEventListener("mouseleave", () => {
            this.pause(video);
        });
    }

    /**
     * @param {HTMLVideoElement} video
     * @param {boolean} desktop
     */
    whichSizeVideo(video, desktop) {
        const isPlaying = this.isVideoPlaying(video);
        if (desktop) {
            video.src = `${video.dataset.desktop}#t=0.1`;
            video.poster = video.dataset.desktopPoster;

            if (isPlaying) {
                this.play(video);
            }
        } else {
            video.src = `${video.dataset.mobile}#t=0.1`;
            video.poster = video.dataset.mobilePoster;

            if (isPlaying) {
                this.play(video);
            }
        }
    }

    /**
     * @param {HTMLVideoElement} video
     * @returns {boolean}
     */
    isVideoPlaying(video) {
        return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    }

    /**
     * @param {HTMLVideoElement} video
     */
    pause(video) {
        video.pause();
    }

    /**
     * @param {HTMLVideoElement} video
     */
    play(video) {
        video.play();
    }
}
