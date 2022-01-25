const BaseShip = require("./BaseShip");
const Sprites = require("../sprites/Sprites");
const Sprite = require("../sprites/Sprite");

class SpaceShip extends BaseShip {
    constructor(x, y, panel, sprite, simulation) {
        super(x, y, panel, sprite, simulation);
        this.type = "playerShip";
        this.engineColor = [100, 100, 100];
        this.flameColor1 = [255, 255, 0];
        this.flameColor2 = [100, 100, 0];
        this.engineState = null;
        this.frameWidth = this.sprite.frameWidth;
        this.speedMultiplierX = 2;
        this.speedMultiplierY = 0.75;
        this.projectileSpeed = 2;
        this.lives = 3;
        this.explosionSprite = new Sprite(Sprites.player.defaultShip.explosion);
        this.shieldEnabled = false;
    }

    animate(time) {
        super.animate(time);
        this.engineState = this.engineState === "alt1" ? "alt2" : "alt1";
    }

    tick(time) {
        super.tick(time);
    }

    restart() {
        this.lives = 3;
        this.create();
    }

    getLives() {
        return this.lives;
    }

    create() {
        super.create();
        this.setPos(20, 20);
    }

    destroy() {
        super.destroy();
        this.lives = this.lives - 1;
    }

    setPos(x = 0, y = 0) {
        this.posX = x <= this.screenSize.width ? x : 0;
        this.posX = this.posX < 0 ? this.screenSize.width : this.posX;
        this.posY = y <= this.screenSize.height ? y : 0;
        this.posY = this.posY < 0 ? 0 : this.posY;
        if (this.posY + this.sprite.frameHeight >= this.simulation.getGroundLevel() && this.isAlive) {
            this.posY = this.simulation.getGroundLevel() - this.sprite.frameHeight;
        }
        this.updateBoundingBox();
    }

    handleSquareButton(buttonValue) {
        this.shieldEnabled = buttonValue > 50;
    }

    handleCrossButton(buttonValue) {
        if (buttonValue < 10) return;
        super.handleCrossButton(buttonValue);
        const currPos = this.getPos();
        const startX = !this.facingForward ? currPos.x : currPos.x + this.frameWidth - 2;
        const startY = currPos.y + 3;
        const speedX = this.facingForward ? this.projectileSpeed : this.projectileSpeed * -1;
        this.createLaser(startX, startY, this.panel, Sprites.player.defaultShip.projectile, speedX, 0);
    }

    drawShield() {
        const radius = this.sprite.frameWidth / 2;
        const x = this.posX + this.sprite.frameWidth / 2;
        const y = this.posY + this.sprite.frameHeight / 2;
        this.panel.drawCircle(x, y, radius, 0, 0, 55);
        this.panel.drawCircle(x, y, radius + 1, 50, 50, 255);
        this.panel.drawCircle(x, y, radius + 2, 150, 150, 255);
    }

    render() {
        super.render();
        if (this.panel && this.isActive) {
            if (this.shieldEnabled) {
                this.drawShield();
            }
            if (!this.facingForward) {
                if (this.engineState === "alt1") {
                    this.panel.setPixel(this.posX + this.frameWidth + 1, this.posY + 2, ...this.flameColor1);
                    this.panel.setPixel(this.posX + this.frameWidth + 1, this.posY + 3, ...this.flameColor2);
                    this.panel.setPixel(this.posX + this.frameWidth + 2, this.posY + 3, ...this.flameColor2);
                } else {
                    this.panel.setPixel(this.posX + this.frameWidth + 1, this.posY + 2, ...this.flameColor1);
                    this.panel.setPixel(this.posX + this.frameWidth + 1, this.posY + 3, ...this.flameColor2);
                    this.panel.setPixel(this.posX + this.frameWidth + 2, this.posY + 2, ...this.flameColor2);
                }
            } else {
                if (this.engineState === "alt1") {
                    this.panel.setPixel(this.posX - 1, this.posY + 2, ...this.flameColor1);
                    this.panel.setPixel(this.posX - 1, this.posY + 3, ...this.flameColor2);
                    this.panel.setPixel(this.posX - 2, this.posY + 3, ...this.flameColor2);
                } else {
                    this.panel.setPixel(this.posX - 1, this.posY + 2, ...this.flameColor1);
                    this.panel.setPixel(this.posX - 1, this.posY + 3, ...this.flameColor2);
                    this.panel.setPixel(this.posX - 2, this.posY + 2, ...this.flameColor2);
                }
            }
        }
    }
}

module.exports = SpaceShip;
