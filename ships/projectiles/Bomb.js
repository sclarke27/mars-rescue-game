const Projectile = require("./Projectile");
const GameObject = require("../../objects/GameObject");
const Sprites = require("../../sprites/Sprites");
const Sprite = require("../../sprites/Sprite");

class Bomb extends Projectile {
    constructor(x, y, panel, sprite, speedX = 0, speedY = 0, simulation) {
        super(x, y, panel, sprite, speedX, speedY, simulation);
        this.type = "bomb";
        this.tickLife = 30000;
        this.deactivationTimeout = 400;
        this.sprite = new Sprite(Sprites.enemies.bomber.projectile);
        this.explosionSprite = new Sprite(Sprites.enemies.bomber.explosion);
    }

    tick(time) {
        super.tick(time);
        if (this.posY + this.sprite.frameHeight >= this.simulation.getGroundLevel() && this.isAlive) {
            this.destroy();
        }
    }

    move() {
        super.move();
        if (this.isAlive) {
            this.setPos(this.posX, this.posY + this.speedY);
        }
    }
}

module.exports = Bomb;
