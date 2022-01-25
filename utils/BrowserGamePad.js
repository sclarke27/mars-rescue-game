const Utils = require("./Functions");

class BrowserGamePad {
    constructor() {
        this.gamepad = null;
        this.data = {
            analogs: {
                left: {
                    x: 0,
                    y: 0,
                },
                right: {
                    x: 0,
                    y: 0,
                },
            },
            dPad: {
                up: 0,
                down: 0,
                right: 0,
                left: 0,
            },
            buttons: {
                selectButton: 0,
                startButton: 0,
                triangle: 0,
                circle: 0,
                square: 0,
                cross: 0,
            },
        };

        this.start();
    }

    start() {
        window.addEventListener("gamepadconnected", (e) => {
            this.gamepad = navigator.getGamepads()[e.gamepad.index];
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", this.gamepad.index, this.gamepad.id, this.gamepad.buttons.length, this.gamepad.axes.length);
        });
    }

    receive(data) {
        this.data = {
            analogs: {
                left: {
                    x: data.axes[0],
                    y: data.axes[1],
                },
                right: {
                    x: data.axes[2],
                    y: data.axes[3],
                },
            },
            dPad: {
                up: data.buttons[12].value * 100,
                down: data.buttons[13].value * 100,
                right: data.buttons[15].value * 100,
                left: data.buttons[14].value * 100,
            },
            buttons: {
                selectButton: data.buttons[8].value,
                startButton: data.buttons[9].value,
                homeButton: data.buttons[16].value,
                triangle: data.buttons[3].value * 100,
                circle: data.buttons[1].value * 100,
                square: data.buttons[2].value * 100,
                cross: data.buttons[0].value * 100,
            },
        };
    }

    read() {
        if (this.gamepad) {
            // console.info("this.gamepad", this.gamepad);
            this.gamepad = navigator.getGamepads()[this.gamepad.index];
            this.receive(this.gamepad);
        }
    }
}

module.exports = BrowserGamePad;
