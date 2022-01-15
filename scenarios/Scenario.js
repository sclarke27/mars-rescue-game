const LedPanel = require("../utils/LedPanel");

class Scenario {
    constructor(panel, screenSize, fonts) {
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

    isRunning() {
        return this.running;
    }
}

module.exports = Scenario;
