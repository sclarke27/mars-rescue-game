const { EnemyShip, EnemyStates } = require("./EnemyShip");
const Sprites = require("../sprites/Sprites");
const Sprite = require("../sprites/Sprite");

class Bomber extends EnemyShip {
    constructor(x, y, panel, sprite, simulation) {
        super(x, y, panel, sprite, simulation);
        this.type = "bomber";
        this.sprite = new Sprite(Sprites.enemies.bomber.ship);
        this.explosionSprite = new Sprite(Sprites.enemies.bomber.explosion);
        this.deactivationTimeout = 500;
        this.bombTimeout = 500;
        this.bombTick = 400;
        this.score = 500;
    }

    tick(time) {
        super.tick(time);
        // this.createLaser(startX, startY, this.panel, Sprites.player.defaultShip.projectile, speedX, 0);
        if (this.bombTick >= this.bombTimeout) {
            this.dropBomb();
            this.bombTick = 0;
        } else {
            this.bombTick++;
        }
    }
    animate(time) {
        super.animate(time);
        // this.dropBomb();
    }

    dropBomb() {
        const currPos = this.getPos();
        const startX = currPos.x;
        const startY = currPos.y + 3;
        this.createBomb(startX, startY, this.panel, Sprites.enemies.bomber.projectile, 0, 0.1);
    }

    move() {
        this.setPos(this.posX + this.speedX, this.posY);
    }
}

module.exports = Bomber;
