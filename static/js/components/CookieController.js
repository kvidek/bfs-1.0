import gsap from "gsap";
/**
 * CookieController component
 */
export default class CookieController {
    constructor() {
        /**
         * CookieController component DOM selectors
         */
        this.DOM = {
            cookie: ".js-cookie",
            close: ".js-cookie-close",
        };

        this.cookie = document.querySelector(this.DOM.cookie);
        this.close = document.querySelector(this.DOM.close);
    }

    /**
     * Init
     */
    init() {
        if (!this.close || !this.cookie) {
            return;
        }

        if (this.getCookie("bfs-cookie-acceptance") === "true") {
            gsap.set(this.cookie, {
                autoAlpha: 0,
            });
        } else {
            document.body.classList.add('is-cookie-active');
        }

        this.close.addEventListener("click", () => {
            this.setCookie("bfs-cookie-acceptance", "true", 365);

            gsap.to(this.cookie, {
                autoAlpha: 0,
                y: "-50%",
                onComplete: () => {
                    document.body.classList.remove('is-cookie-active');
                }
            });
        });
    }

    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}
