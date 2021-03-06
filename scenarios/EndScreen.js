const Scenario = require("./Scenario");

class EndScreen extends Scenario {
    constructor(scenarioData, panel, screenSize, fonts, scenarioManager) {
        super(scenarioData, panel, screenSize, fonts, scenarioManager);
        this.title = "Game Over";
        this.secondsToDisplay = 5;
        this.screenStartTime = null;
    }

    start() {
        super.start();
        this.screenStartTime = Date.now();
    }

    render() {
        super.render();
        this.panel.drawText(8, 12, `${this.title}`, this.fonts.scriptFont, 255, 50, 50);
        this.panel.drawText(9, 11, `${this.title}`, this.fonts.scriptFont, 255, 255, 255);
        this.panel.drawLine(7, 30, 120, 30, 255, 0, 0);
        this.panel.drawText(40, 32, `Score ${this.scenarioData.score}`, this.fonts.uiFont2, 255, 255, 255);
        this.panel.drawText(40, 42, `Press Start`, this.fonts.uiFont2, 255, 255, 255);
    }

    tick(time) {
        super.tick(time);

        // handle animation tick interval
        if (time - this.screenStartTime >= this.secondsToDisplay * 1000) {
            // this.simulation.animate(time);
            this.scenarioManager.changeScenario("startScreen");
        }
    }

    handleStartButton(isPressed) {
        if (isPressed) {
            this.scenarioManager.changeScenario("gameLoop");
        }
    }
}

module.exports = EndScreen;
