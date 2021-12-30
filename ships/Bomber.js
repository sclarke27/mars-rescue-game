const {EnemyShip, EnemyStates} = require("./EnemyShip");
const Sprites = require('../sprites/Sprites');

class Bomber extends EnemyShip {
    constructor(x, y, panel, sprite) {
        super(x, y, panel, sprite);
        this.type = 'bomber';
        this.sprite = Sprites.enemies.bomber.ship;
        this.explosionSprite = Sprites.enemies.bomber.explosion;
        this.deactivationTimeout = 500;
    }

    tick(time) {
        super.tick(time);
        // this.createProjectile(startX, startY, this.panel, Sprites.player.defaultShip.projectile, speedX, 0);
    }

    move() {
        this.setPos(this.posX + this.speedX, this.posY);
    }
}

module.exports = Bomber;