const GameController = require("./utils/GameController");
const LedPanel = require("./utils/LedPanel");
const Main = require("./main");

class LedMain extends Main {
    constructor() {
        super();
    }
    start() {
        this.panel = new LedPanel();

        this.fonts = {
            uiFont: __dirname + "/fonts/" + "4x6.bdf",
            uiFont2: __dirname + "/fonts/" + "5x8.bdf",
            regularFont: __dirname + "/fonts/" + "UTRG__10.bdf",
            scriptFont: __dirname + "/fonts/" + "luBIS14.bdf",
        };

        this.gameController1 = new GameController();

        super.start();
    }
}

const app = new LedMain();
app.start();
