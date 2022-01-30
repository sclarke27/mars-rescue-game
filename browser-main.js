const BrowserGamePad = require("./utils/BrowserGamePad");

const Main = require("./main");

class BrowserMain extends Main {
    constructor() {
        super();
    }
    start() {
        const CanvasPanel = require("./utils/CanvasPanel");
        this.panel = new CanvasPanel(this.screenSize);
        window.document.body.style.setProperty("--canvas-width", `${this.screenSize.width}px`);
        this.renderInterval = 1000 / 120;
        this.fonts = {
            uiFont: "7px Lato",
            uiFont2: "10px Comfortaa",
            // regularFont: "8px arial",
            scriptFont: "17px Roboto",
        };

        this.gameController1 = new BrowserGamePad();

        super.start();
    }
}

window.textOffsetX = 0.25;
window.textOffsetY = 0;
const app = new BrowserMain();
app.start();
