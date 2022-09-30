export default class CustomCursor {
    constructor() {
        this.DOM = {
            cursorWrapper: ".js-cursor-wrapper",
            cursor: ".js-cursor",
            line: ".js-cursor-line",
        };

        this.cursorWrapper = document.querySelector(this.DOM.cursorWrapper);
    }
    init() {
        if (this.cursorWrapper == null) {
            return;
        }

        const cursor = this.cursorWrapper.querySelector(this.DOM.cursor);
        this.line = this.cursorWrapper.querySelector(this.DOM.line);

        this.x = 0;
        this.y = 0;
        this.dist = (x1, y1, x2, y2) => Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2));
        this.points = [];
        this.MIN_DIST = 1;
        this.MAX_POINTS = 120;
        this.svgns = "http://www.w3.org/2000/svg";
        let { width, height } = cursor.getBoundingClientRect();

        cursor.setAttribute("viewBox", `0 0 ${width} ${height}`);

        window.addEventListener("resize", () => {
            const r = cursor.getBoundingClientRect();
            width = r.width;
            height = r.height;
            cursor.setAttribute("viewBox", `0 0 ${width} ${height}`);
        });

        document.addEventListener("mousemove", ({ clientX, clientY }) => {
            this.x = clientX;
            this.y = clientY;
        });
        requestAnimationFrame(() => this.frame());
    }

    frame() {
        requestAnimationFrame(() => this.frame());
        if (!this.x || !this.y) return;

        if (!this.points.length) return this.points.push([this.x, this.y]);

        const [px, py] = this.points[this.points.length - 1];
        const d = this.dist(this.x, this.y, px, py);

        if (d < this.MIN_DIST) return;

        this.points.push([this.x, this.y]);

        const pathString = this.points.reduce((acc, [x, y]) => {
            return acc + ` ${x},${y}`;
        }, "");

        this.line.setAttribute("points", pathString);

        if (this.points.length > this.MAX_POINTS) this.points.shift();
    }
}
