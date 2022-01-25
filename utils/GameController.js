const HID = require("node-hid");
const Utils = require("./Functions");

class GameController {
    constructor() {
        this.hid = null;
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
        try {
            this.hid = new HID.HID(1356, 616);
        } catch (err) {
            this.hid = null;
            console.error(err);
        }
    }

    receive(err, data) {
        this.data = {
            analogs: {
                left: {
                    x: data[6],
                    y: data[7],
                },
                right: {
                    x: data[9],
                    y: data[8],
                },
            },
            dPad: {
                up: data[14],
                down: data[16],
                right: data[15],
                left: data[17],
            },
            buttons: {
                selectButton: data[2] === 1,
                startButton: data[2] === 8,
                homeButton: data[4],
                triangle: data[22],
                circle: data[23],
                square: data[25],
                cross: data[24],
            },
        };
    }

    read() {
        if (this.hid) {
            this.hid.read(this.receive.bind(this));
        }
    }
}

module.exports = GameController;
