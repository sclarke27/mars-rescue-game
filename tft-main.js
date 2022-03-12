const GameController = require("./utils/GameController");
const LedPanel = require("./utils/tftPanel/TFTPanel");
const Main = require("./main");

class LedMain extends Main {
    constructor() {
        super();
    }
    start() {
        this.panel = new LedPanel();
        this.renderInterval = 1000 / 30;
        this.screenSize = {
            width: 240,
            height: 240,
        };
        this.autoStart = true;
        // this.fonts = {
        //     uiFont: __dirname + "/fonts/" + "4x6.bdf",
        //     uiFont2: __dirname + "/fonts/" + "5x8.bdf",
        //     regularFont: __dirname + "/fonts/" + "UTRG__10.bdf",
        //     scriptFont: __dirname + "/fonts/" + "luBIS14.bdf",
        // };

        // this.gameController1 = new GameController();

        super.start();
    }
}

const app = new LedMain();
app.start();
