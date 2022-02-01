class Scenario {
    constructor(scenarioData, panel, screenSize, fonts, scenarioManager) {
        this.scenarioData = scenarioData;
        this.scenarioManager = scenarioManager;
        this.panel = panel;
        this.screenSize = screenSize;
        this.simulation = null;
        this.fonts = fonts;
        this.running = false;
        this.animationInterval = 1000 / 10;
        this.lastAnimTick = null;
        this.lastMovementTick = null;
    }

    start() {
        this.running = true;
        this.lastAnimTick = Date.now();
    }

    stop() {
        this.running = false;
    }

    animate(time) {
        if (this.backgroundSprite) {
            this.backgroundSprite.animate(time);
        }
    }

    tick(time) {
        // handle animation tick interval
        if (time - this.lastAnimTick >= this.animationInterval) {
            this.lastAnimTick = time;
            this.animate(time);
        }
    }

    render() {}

    handleInput(data) {}

    handleStartButton(isPressed) {}

    isRunning() {
        return this.running;
    }
}

module.exports = Scenario;
