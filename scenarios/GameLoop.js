const Scenario = require("./Scenario");
const Simulation = require("../utils/Simulation");
const Sprite = require("../sprites/Sprite");

class GameLoop extends Scenario {
    constructor(panel, screenSize, fonts) {
        super(panel, screenSize, fonts);

        this.ground = 0;
        this.gameController1 = null;
        this.backgroundSprite = null;
        this.simulation = null;
        this.autoStart = true;
        this.startButtonPressed = false;
        this.animationInterval = 1000 / 10;
        this.movementInterval = 1000 / 120;
        this.lastAnimTick = null;
        this.lastMovementTick = null;
    }

    start() {
        super.start();
        this.lastMovementTick = Date.now();
        this.lastAnimTick = Date.now();
        this.simulation = new Simulation(this.panel, this.screenSize);
        this.backgroundSprite = new Sprite(Sprites.moonBackground);
        this.ground = this.simulation.getGroundLevel();

        this.simulation.start();
    }

    tick(time) {
        super.tick(time);

        // handle animation tick interval
        if (time - this.lastAnimTick >= this.animationInterval) {
            this.simulation.animate(time);
            this.lastAnimTick = time;
        }

        // handle sim tick interval
        if (time - this.lastMovementTick >= this.movementInterval) {
            // this.simulation.handleInput(this.gameController1.data);
            this.simulation.tick(time);

            this.lastMovementTick = time;
        }
    }

    render() {
        super.render();
        const player1Lives = this.simulation.getPlayerLives(0);
        if (this.simulation.isRunning) {
            // render stars

            this.panel.drawSprite(100, 10, this.backgroundSprite);

            this.simulation.renderBackground();
            // this.panel.drawText(1, 1, `${this.fps} FPS`, this.fonts.uiFont, 100, 100, 100);

            // draw simple ground
            this.panel.drawLine(0, this.ground, this.screenSize.width, this.ground, 0, 255, 0);
            this.panel.drawLine(0, this.ground + 1, this.screenSize.width, this.ground + 1, 0, 155, 0);
            this.panel.drawLine(0, this.ground + 2, this.screenSize.width, this.ground + 2, 0, 55, 0);

            // draw mountains
            this.panel.drawMountain(27, this.ground - 1, 6, [50, 50, 0], [150, 150, 0]);
            this.panel.drawMountain(10, this.ground, 10, [100, 100, 0], [255, 255, 0]);
            this.panel.drawMountain(142, this.ground, 22, [100, 100, 0], [255, 255, 0]);

            // render sim objects
            this.simulation.render();

            // draw UI
            const score = this.simulation.getScore();

            this.panel.drawText(1, 58, `Lives: ${player1Lives}`, this.fonts.uiFont, 255, 255, 255);
            this.panel.drawText(40, 58, `Score: ${score}`, this.fonts.uiFont, 255, 255, 255);
        }
        if (this.simulation.isPaused) {
            this.panel.drawText(40, 32, `Paused`, this.fonts.uiFont2, 255, 255, 255);
        }
        if (player1Lives <= 0) {
            this.panel.drawText(8, 12, `${this.title}`, this.fonts.scriptFont, 255, 50, 50);
            this.panel.drawText(9, 11, `${this.title}`, this.fonts.scriptFont, 255, 255, 255);
            this.panel.drawLine(7, 30, 120, 30, 255, 0, 0);
            this.panel.drawText(40, 32, `Press Start`, this.fonts.uiFont2, 255, 255, 255);
        }
    }

    handleInput(data) {
        super.handleInput(data);
        this.simulation.handleInput(data);
    }
}

module.exports = GameLoop;
