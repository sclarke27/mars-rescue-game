const EndScreen = require("./EndScreen");
const BaseLevel = require("./BaseLevel");
const StartScreen = require("./StartScreen");

class ScenarioManager {
    constructor(panel, screenSize, fonts, isBrowserBased) {
        this.isBrowserBased = isBrowserBased;
        this.panel = panel;
        this.screenSize = screenSize;
        this.fonts = fonts;

        this.currentScenario = null;
    }

    start() {
        if (this.currentScenario !== null && !this.currentScenario.isRunning()) {
            this.currentScenario.start();
        }
    }

    stop() {
        if (this.currentScenario !== null && this.currentScenario.isRunning()) {
            this.currentScenario.stop();
        }
    }

    changeScenario(newScenario, scenarioData) {
        if (this.currentScenario !== null) {
            this.currentScenario.stop();
        }
        let scenarioClass = null;
        switch (newScenario) {
            case "startScreen":
                scenarioClass = StartScreen;
                break;
            case "endScreen":
                scenarioClass = EndScreen;
                break;

            case "gameLoop":
                scenarioClass = BaseLevel;
                break;
        }
        if (this.scenarioClass !== null) {
            this.currentScenario = new scenarioClass(scenarioData, this.panel, this.screenSize, this.fonts, this);
        }
        if (this.currentScenario !== null) {
            this.currentScenario.start();
        }
    }

    render() {
        if (this.currentScenario !== null) {
            this.currentScenario.render();
        }
    }

    tick(time) {
        if (this.currentScenario !== null && this.currentScenario.isRunning()) {
            this.currentScenario.tick(time);
        }
    }

    handleInput(data) {
        if (this.currentScenario !== null) {
            this.currentScenario.handleInput(data);
        }
    }

    handleStartButton(isPressed) {
        if (this.currentScenario !== null) {
            this.currentScenario.handleStartButton(isPressed);
        }
    }
}

module.exports = ScenarioManager;
