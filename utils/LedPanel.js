const LedMatrix = require("easybotics-rpi-rgb-led-matrix");
const Sprite = require("../sprites/Sprite");
const Sprites = require("../sprites/Sprites");

class LedPanel {
    constructor() {
        this.ledPixels = [];
        this.matrix = null;
        this.isDirty = false;
        this.tempPixel = null;
        this.config = {
            width: 64,
            height: 64,
            panelType: "rpi-rgb-led-matrix",
            chained: 1,
            parallel: 4,
            brightness: 100,
            hardwareMapping: "adafruit-hat-pwm",
            rgbSequence: "RGB",
            cmdLineArgs: ["--led-gpio-mapping=adafruit-hat-pwm", "--led-multiplexing=0", "--led-row-addr-type=4", "--led-slowdown-gpio=4", "--led-pwm-bits=8", "--led-pwm-lsb-nanoseconds=100", "--led-pwm-dither-bits=1"],
        };
        this.frameWidth = this.config.width * 2;
        this.start();
    }

    start() {
        this.matrix = new LedMatrix(this.config.width, this.config.height, this.config.chained, this.config.parallel, this.config.brightness, this.config.hardwareMapping, this.config.rgbSequence, this.config.cmdLineArgs);
    }

    clear() {
        if (this.matrix) {
            this.matrix.clear();
        }
    }

    render() {
        if (this.matrix) {
            this.matrix.update();
        }
    }

    drawText(x, y, text, font, r, g, b) {
        if (this.matrix) {
            this.matrix.drawText(x, y, text, font, r, g, b);
        }
    }

    drawLine(x0, y0, x1, y1, r, g, b) {
        if (this.matrix) {
            this.matrix.drawLine(x0, y0, x1, y1, r, g, b);
        }
    }

    fill(r, g, b) {
        if (this.matrix) {
            this.matrix.fill(r, g, b);
        }
    }

    setPixel(x, y, r, g, b) {
        if (this.matrix) {
            this.matrix.setPixel(x, y, r, g, b);
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
                        this.matrix.setPixel(startX + (frameWidth - x), startY + y, r, g, b);
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
                        this.matrix.setPixel(startX + x, startY + y, r, g, b);
                    }
                }
            }
        }
    }

    drawMountain(x = 0, ground = 0, height = 10, color = [0, 255, 0], borderColor = [150, 150, 0]) {
        // const mntSprite = new Sprite(Sprites.mountain1)
        // this.drawSprite(x, ground-height, mntSprite);
        for (let i = 0; i <= height; i++) {
            this.drawLine(x + i, ground - i, x + height * 2 - i, ground - i, ...color);
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

module.exports = LedPanel;
