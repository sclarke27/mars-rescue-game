class Scenario {
    constructor(scenarioData, panel, screenSize, fonts, scenarioManager) {
        this.scenarioData = scenarioData;
        this.scenarioManager = scenarioManager;
        this.panel = panel;
        this.screenSize = screenSize;
        this.fonts = fonts;
        this.running = false;
    }

    start() {
        this.running = true;
    }

    stop() {
        this.running = false;
    }

    tick(time) {}

    render() {}

    handleInput(data) {}

    handleStartButton(isPressed) {}

    isRunning() {
        return this.running;
    }
}

module.exports = Scenario;
