const Scenario = require("./Scenario");
const Sprite = require("../sprites/Sprite");
const Star = require("../objects/Star");

class StartScreen extends Scenario {
    constructor(scenarioData, panel, screenSize, fonts, scenarioManager) {
        super(scenarioData, panel, screenSize, fonts, scenarioManager);
        this.title = "Mars Invasion";
        this.textOffset = this.screenSize.width > 128 ? 64 : 0;
        this.animationInterval = 1000 / 20;
        this.stars = [];
    }

    start() {
        super.start();
        this.backgroundSprite = new Sprite(Sprites.marsRotatingTopSmall);

        // generate star field
        for (let i = 0; i < 60; i++) {
            const newX = Math.round(Math.random() * this.screenSize.width);
            const newY = Math.round(Math.random() * this.screenSize.height);
            this.createStar(newX, newY, this.panel);
        }
    }

    animate(time) {
        super.animate(time);
        // animate stars
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].animate(time);
        }
    }

    render() {
        super.render();

        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].render();
        }

        this.panel.drawSprite(this.screenSize.width - 84, 0, this.backgroundSprite);

        this.panel.drawText(8 + this.textOffset, 12, `${this.title}`, this.fonts.scriptFont, 255, 50, 50);
        this.panel.drawText(9 + this.textOffset, 11, `${this.title}`, this.fonts.scriptFont, 255, 255, 255);
        this.panel.drawLine(7 + this.textOffset, 30, 120 + this.textOffset, 30, 255, 0, 0);
        if (this.scenarioManager.isGamePadActive) {
            this.panel.drawText(40 + this.textOffset, 32, `Press Start`, this.fonts.uiFont2, 255, 255, 255);
        } else {
            if (this.scenarioManager.isBrowserBased) {
                this.panel.drawText(20 + this.textOffset, 34, `Press Enter to Start`, this.fonts.uiFont2, 255, 255, 255);
            } else {
                this.panel.drawText(10 + this.textOffset, 34, `Connect a Controller`, this.fonts.uiFont2, 255, 255, 255);
            }
        }
    }

    handleStartButton(isPressed) {
        if (isPressed) {
            this.scenarioManager.changeScenario("gameLoop");
        }
    }

    // star methods
    createStar(x, y, panel) {
        const newStar = new Star(x, y, panel);
        this.stars.push(newStar);
    }
}

module.exports = StartScreen;
