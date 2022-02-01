const ScenarioManager = require("./scenarios/ScenarioManager");

class Main {
    constructor() {
        this.panel = null;
        this.mainLoopTimeout = null;
        this.prevTime = null;
        this.frames = 0;
        this.fps = 0;
        this.renderInterval = 1000 / 30;
        this.lastRenderTick = null;
        this.gameController1 = null;
        this.autoStart = false;
        this.scenarioManager = null;
        this.startButtonPressed = false;
        this.screenSize = {
            width: 256,
            height: 64,
        };
        this.fonts = {};
        this.scenario = null;
        this.isBrowserBased = false;
    }

    start() {
        this.prevTime = Date.now();
        this.lastRenderTick = Date.now();

        this.scenarioManager = new ScenarioManager(this.panel, this.screenSize, this.fonts, this.isBrowserBased);
        if (this.autoStart) {
            this.scenarioManager.changeScenario("gameLoop");
        } else {
            this.scenarioManager.changeScenario("startScreen");
        }
        this.scenarioManager.start();

        this.tick();
    }

    tick() {
        const time = Date.now();
        // compute fps
        this.frames++;
        if (time > this.prevTime + 1000) {
            this.fps = ((this.frames * 1000) / (time - this.prevTime)).toFixed(2);
            this.prevTime = time;
            this.frames = 0;
        }

        // trigger read from game controller
        if (this.gameController1) {
            this.gameController1.read();

            if ((this.gameController1.data.buttons.startButton === true || this.gameController1.data.buttons.startButton === 1) && !this.startButtonPressed) {
                this.startButtonPressed = true;
                this.scenarioManager.handleStartButton(true);
            } else if ((this.gameController1.data.buttons.startButton === false || this.gameController1.data.buttons.startButton === 0) && this.startButtonPressed) {
                this.startButtonPressed = false;
                this.scenarioManager.handleStartButton(false);
            }

            this.scenarioManager.handleInput(this.gameController1);
        }

        this.scenarioManager.tick(time);

        if (time - this.lastRenderTick >= this.renderInterval) {
            // render screen
            this.render(time);

            this.lastRenderTick = time;
        }

        clearTimeout(this.mainLoopTimeout);
        if (this.isBrowserBased) {
            // do loop
            this.mainLoopTimeout = window.requestAnimationFrame(this.tick.bind(this));
        } else {
            // do loop
            this.mainLoopTimeout = setTimeout(this.tick.bind(this), 1);
        }
    }

    render() {
        // refresh panels
        this.panel.clear();

        // draw scenario screen
        this.scenarioManager.render();

        // update fps
        this.panel.drawText(1, 1, `${this.fps} FPS`, this.fonts.uiFont, 100, 100, 100);

        // draw play field to screen
        this.panel.render();
    }
}

module.exports = Main;
