class CanvasPanel {
    constructor() {
        this.ledPixels = [];
        this.matrix = null;
        this.isDirty = false;
        this.tempPixel = null;
        this.config = {
            width: 256,
            height: 64,
        };
        this.frameWidth = this.config.width * 2;
        this.showDebug = true;
        this.canvasElement = null;
        this.pixelImage = null;
        this.pixelImageData = null;
        this.start();
    }

    start() {
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = this.config.width;
        this.canvasElement.height = this.config.height;
        const targetDiv = document.createElement("div");
        targetDiv.id = "gameField";
        targetDiv.appendChild(this.canvasElement);
        document.body.appendChild(targetDiv);
        this.matrix = this.canvasElement.getContext("2d");

        this.pixelImage = this.matrix.createImageData(1, 1);
        this.pixelImageData = this.pixelImage.data;
        this.matrix.translate(0, -0.5);
        this.clear();
    }

    clear() {
        if (this.matrix) {
            this.matrix.clearRect(-1, -1, this.config.width + 1, this.config.height + 1);
        }
    }

    render() {
        if (this.matrix) {
            // this.matrix.update();
        }
    }

    drawText(x, y, text, font, r, g, b) {
        if (this.matrix) {
            this.matrix.fillStyle = `rgb(${r}, ${g}, ${b})`;
            this.matrix.font = font; //"8px arial";
            this.matrix.textBaseline = "top";
            this.matrix.fillText(text, x + window.textOffsetX, y + window.textOffsetY);
        }
    }

    drawLine(x0, y0, x1, y1, r, g, b) {
        if (this.matrix) {
            this.matrix.strokeStyle = `rgb(${r}, ${g}, ${b})`;
            this.matrix.fillStyle = `rgb(${r}, ${g}, ${b})`;
            this.matrix.beginPath();
            this.matrix.moveTo(Math.round(x0), Math.round(y0));
            this.matrix.lineTo(Math.round(x1), Math.round(y1));
            this.matrix.stroke();
            this.matrix.fill();
        }
    }

    drawCircle(x0, y0, radius, r, g, b) {
        if (this.matrix) {
            this.matrix.strokeStyle = `rgb(${r}, ${g}, ${b})`;
            this.matrix.beginPath();
            this.matrix.arc(Math.round(x0), Math.round(y0), radius, 0, Math.PI * 2, false);
            this.matrix.stroke();
        }
    }

    fill(r, g, b) {
        if (this.matrix) {
            // this.matrix.fill(r, g, b);
        }
    }

    setPixel(x, y, r, g, b) {
        if (this.matrix) {
            this.matrix.strokeStyle = `rgb(${r}, ${g}, ${b})`;
            this.matrix.beginPath();
            this.matrix.moveTo(Math.round(x), Math.round(y));
            this.matrix.lineTo(Math.round(x + 1), Math.round(y));
            this.matrix.stroke();
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

module.exports = CanvasPanel;
