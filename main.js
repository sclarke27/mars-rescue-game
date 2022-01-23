const GameController = require("./utils/GameController");
const LedPanel = require("./utils/LedPanel");
const OledPanel = require("./utils/oledPanel/OledPanel");
const Simulation = require("./utils/Simulation");
const Sprite = require("./sprites/Sprite");
const GameLoop = require("./scenarios/GameLoop");

class Main {
    constructor() {
        this.panel = null;
        this.mainLoopTimeout = null;
        this.prevTime = null;
        this.frames = 0;
        this.fps = 0;
        this.renderInterval = 1000 / 29;
        this.lastRenderTick = null;
        this.title = "Alien Invasion";
        this.gameController1 = null;
        this.autoStart = true;
        // this.startButtonPressed = false;
        this.screenSize = {
            width: 128,
            height: 64,
        };
        this.fonts = {};
        this.scenario = null;
        this.useOled = false;
    }

    start() {
        this.panel = this.useOled ? new OledPanel() : new LedPanel();
        this.prevTime = Date.now();
        this.lastRenderTick = Date.now();

        this.fonts = {
            uiFont: __dirname + "/fonts/" + "4x6.bdf",
            uiFont2: __dirname + "/fonts/" + "5x8.bdf",
            regularFont: __dirname + "/fonts/" + "UTRG__10.bdf",
            scriptFont: __dirname + "/fonts/" + "luBIS14.bdf",
        };

        // this.simulation = new Simulation(this.panel, this.screenSize);
        this.gameController1 = new GameController();

        // this.backgroundSprite = new Sprite(Sprites.moonBackground);

        // this.ground = this.simulation.getGroundLevel();
        this.scenario = new GameLoop(this.panel, this.screenSize, this.fonts);
        // this.simulation.start();
        this.tick();
    }

    tick() {
        const time = Date.now();

        if (this.autoStart && !this.scenario.isRunning()) {
            this.scenario.start();
        }

        // compute fps
        this.frames++;
        if (time > this.prevTime + 1000) {
            this.fps = ((this.frames * 1000) / (time - this.prevTime)).toFixed(2);
            this.prevTime = time;
            this.frames = 0;
        }

        // trigger read from game controller
        this.gameController1.read();

        // if (this.gameController1.data.buttons.startButton === true && !this.startButtonPressed) {
        //     if (!this.simulation.isRunning) {
        //         this.simulation.start();
        //     } else {
        //         this.simulation.pause();
        //     }
        //     this.startButtonPressed = true;
        // } else if (this.gameController1.data.buttons.startButton === false && this.startButtonPressed) {
        //     this.startButtonPressed = false;
        // }

        // this.simulation.handleInput(this.gameController1.data);
        this.scenario.handleInput(this.gameController1.data);

        this.scenario.tick(time);

        if (time - this.lastRenderTick >= this.renderInterval) {
            // render screen
            this.render(time);

            this.lastRenderTick = time;
        }

        // do loop
        clearTimeout(this.mainLoopTimeout);
        this.mainLoopTimeout = setTimeout(this.tick.bind(this), 1);
    }

    render() {
        // refresh panels
        this.panel.clear();

        // draw scenario screen
        this.scenario.render();

        // update fps
        this.panel.drawText(1, 1, `${this.fps} FPS`, this.fonts.uiFont, 100, 100, 100);

        // draw play field to screen
        this.panel.render();
    }
}

const app = new Main();
app.start();
