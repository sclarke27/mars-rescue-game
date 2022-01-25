const Scenario = require("./Scenario");

class StartScreen extends Scenario {
    constructor(scenarioData, panel, screenSize, fonts, scenarioManager) {
        super(scenarioData, panel, screenSize, fonts, scenarioManager);
        this.title = "Alien Invasion";
    }

    render() {
        super.render();
        this.panel.drawText(8, 12, `${this.title}`, this.fonts.scriptFont, 255, 50, 50);
        this.panel.drawText(9, 11, `${this.title}`, this.fonts.scriptFont, 255, 255, 255);
        this.panel.drawLine(7, 30, 120, 30, 255, 0, 0);
        this.panel.drawText(40, 32, `Press Start`, this.fonts.uiFont2, 255, 255, 255);
    }

    handleStartButton(isPressed) {
        if (isPressed) {
            this.scenarioManager.changeScenario("gameLoop");
        }
    }
}

module.exports = StartScreen;
