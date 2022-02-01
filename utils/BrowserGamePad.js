const Utils = require("./Functions");

class BrowserGamePad {
    constructor() {
        this.gamepads = [];
        this.gamepad = null;
        this.gamePadIndex = -1;
        this.isPadActive = false;
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
            this.gamepads[e.gamepad.index] = navigator.getGamepads()[e.gamepad.index];
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", this.gamepads[e.gamepad.index].index, this.gamepads[e.gamepad.index].id, this.gamepads[e.gamepad.index].buttons.length, this.gamepads[e.gamepad.index].axes.length);
        });
        window.addEventListener("gamepaddisconnected", function (e) {
            this.gamepads[e.gamepad.index] = null;
            console.log("Gamepad disconnected from index %d: %s", e.gamepad.index, e.gamepad.id);
        });
        window.onkeydown = (evt) => {
            this.keyEvent(evt, true);
        };
        window.onkeyup = (evt) => {
            this.keyEvent(evt, false);
        };
    }

    keyEvent(evt, isKeyDown) {
        switch (evt.keyCode) {
            // enter
            case 13:
                this.data.buttons.startButton = isKeyDown;
                break;
            // space
            case 32:
                this.data.buttons.cross = isKeyDown ? 100 : 0;
                break;
            // w key
            case 87:
                this.data.analogs.left.y = isKeyDown ? -1 : 0;
                break;
            // a key
            case 65:
                this.data.analogs.left.x = isKeyDown ? -1 : 0;
                break;
            // s key
            case 83:
                this.data.analogs.left.y = isKeyDown ? 1 : 0;
                break;
            // d key
            case 68:
                this.data.analogs.left.x = isKeyDown ? 1 : 0;
                break;
            // left shift
            case 16:
                this.data.buttons.square = isKeyDown ? 100 : 0;
                break;
        }
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
        if (this.gamepads.length > 0) {
            this.isPadActive = true;
            for (let i = 0; i < this.gamepads.length; i++) {
                if (this.gamepads[i] !== null) {
                    this.gamepads[i] = navigator.getGamepads()[i];
                    this.receive(this.gamepads[i]);
                } else {
                    // gamepad disconnected after game play started
                    this.isPadActive = false;
                }
            }
        } else {
            this.isPadActive = false;
        }
    }
}

module.exports = BrowserGamePad;
