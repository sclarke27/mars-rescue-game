const Sprite = require("../../sprites/Sprite");
const Sprites = require("../../sprites/Sprites");
const PythonWrapper = require("../pythonWrapper");

const i2c = require("i2c-bus");
const i2cBus = i2c.openSync(1);
const oled = require("oled-i2c-bus");
const font5x7 = require("oled-font-5x7");

class OledPanel {
    constructor() {
        this.ledPixels = [];
        this.matrix = null;
        this.isDirty = false;
        this.tempPixel = null;
        this.config = {
            width: 128,
            height: 64,
            address: 0x3c,
        };
        this.oledBonnet = {
            file: "./utils/oledPanel/oledPanelBridge.py",
            process: null,
        };
        this.frameWidth = this.config.width * 2;
        this.showDebug = true;
        this.start();
    }

    start() {
        this.matrix = new PythonWrapper(this.oledBonnet.file, this.showDebug);
        this.matrix.start();
        this.matrix.writeMessage(`{"key": "start"}`);
        // this.matrix = new oled(i2cBus, this.config);
        // this.matrix.clearDisplay();
        // this.matrix.turnOnDisplay();
    }

    clear() {
        if (this.matrix) {
            this.matrix.writeMessage(`{"key": "clear"}`);
            // this.matrix.clearDisplay();
        }
    }

    render() {
        if (this.matrix) {
            this.matrix.writeMessage(`{"key": "render"}`);
            // this.matrix.update();
        }
    }

    drawText(x, y, text, font, r, g, b) {
        if (this.matrix) {
            this.matrix.writeMessage(`{"key": "drawText", "x": ${x}, "y": ${y}, "text": "${text}"}`);

            // this.matrix.setCursor(x, y);
            // this.matrix.writeString(font5x7, 1, text, 1, false);
        }
    }

    drawLine(x0, y0, x1, y1, r, g, b) {
        if (this.matrix) {
            const isBlack = r === 0 && g === 0 && b === 0;

            this.matrix.writeMessage(`{"key": "drawLine", "x0": ${x0}, "y0": ${y0}, "x1": "${x1}", "y1": "${y1}", "color": "${isBlack ? 0 : 1}"}`);
            // this.matrix.drawLine(x0, y0, x1, y1, isBlack ? 0 : 1);
        }
    }

    drawCircle(x0, y0, radius, r, g, b) {
        if (this.matrix) {
            const isBlack = r === 0 && g === 0 && b === 0;
            this.matrix.writeMessage(`{"key": "drawCircle", "x": ${x0}, "y": ${y0}, "radius": "${radius}", "color": "${isBlack ? 0 : 1}"}`);
            // this.matrix.drawCircle(x0, y0, radius, r, g, b);
        }
    }

    fill(r, g, b) {
        if (this.matrix) {
            // this.matrix.fill(r, g, b);
        }
    }

    setPixel(x, y, r, g, b) {
        if (this.matrix) {
            const isBlack = r === 0 && g === 0 && b === 0;
            this.matrix.writeMessage(`{"key": "setPixel", "x": ${x}, "y": ${y}, "color": "${isBlack ? 0 : 1}"}`);
            // this.matrix.drawPixel([x, y, 1]);
        }
    }

    drawSprite(startX, startY, sprite, flipped = false) {
        const frameWidth = sprite.frameWidth;
        const frameHeight = sprite.frameHeight;
        const pallette = sprite.pallette;
        const frame = sprite.getNextFrame();

        for (let y = 0; y < frameHeight; y++) {
            const start = y * frameWidth;
            const end = start + frameWidth;
            const currentRow = frame.slice(start, end); //frame[y];
            // console.info(currentRow);
            if (flipped) {
                for (let x = frameWidth - 1; x >= 0; x--) {
                    const currentPixel = currentRow[x];
                    const currentColor = pallette[currentPixel].split(",");
                    const r = parseInt(currentColor[0]);
                    const g = parseInt(currentColor[1]);
                    const b = parseInt(currentColor[2]);
                    const isBlack = r === 0 && (g === 0) & (b === 0);
                    if (!isBlack) {
                        this.setPixel(startX + (frameWidth - x), startY + y, r, g, b);
                    }
                }
            } else {
                for (let x = 0; x < frameWidth; x++) {
                    const currentPixel = currentRow[x];
                    const currentColor = pallette[currentPixel].split(",");
                    const r = parseInt(currentColor[0]);
                    const g = parseInt(currentColor[1]);
                    const b = parseInt(currentColor[2]);
                    const isBlack = r === 0 && (g === 0) & (b === 0);
                    if (!isBlack) {
                        this.setPixel(startX + x, startY + y, r, g, b);
                    }
                }
            }
        }
    }

    drawMountain(x = 0, ground = 0, height = 10, color = [0, 255, 0], borderColor = [150, 150, 0]) {
        // const mntSprite = new Sprite(Sprites.mountain1)
        // this.drawSprite(x, ground-height, mntSprite);
        for (let i = 0; i <= height; i++) {
            // this.drawLine(x + i, ground - i, x + height * 2 - i, ground - i, ...color);
        }
        this.drawMountainLines(x, ground, height, borderColor);
    }

    drawMountainLines(x = 0, y = 0, height = 10, color = [0, 255, 0]) {
        let mntStartX = x;
        let mntStartY = y;
        let mntHeight = height;
        let mntWidth = mntHeight * 2;
        let mntColor = color;
        let mntTipX = mntStartX + mntWidth / 2;
        let mntTipY = mntStartY - mntHeight;

        let mntEndX = mntStartX + mntWidth;
        let mntEndY = mntStartY;

        if (this.matrix) {
            this.drawLine(mntStartX, mntStartY, mntTipX, mntTipY, ...mntColor);
            this.drawLine(mntTipX, mntTipY, mntEndX, mntEndY, ...mntColor);
        }
    }
}

module.exports = OledPanel;
