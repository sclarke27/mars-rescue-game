const {EnemyShip, EnemyStates} = require("./EnemyShip");
const Sprites = require('../sprites/Sprites');

class DropShip extends EnemyShip {
    constructor(x, y, panel, sprite) {
        super(x, y, panel, sprite);
        this.type = 'dropShip';
        this.humanToCapture = null;
        this.sprite = Sprites.enemies.dropShip.ship;
        this.explosionSprite = Sprites.enemies.dropShip.explosion;
        this.deactivationTimeout = 240;
    }

    tick(time) {
        super.tick(time);
        if(this.posY >= 58 && this.isAlive) {
            this.destroy();
        }
        if(this.humanToCapture !== null) {
            if(this.posY < 0 && this.state == EnemyStates.captured) {
                this.humanToCapture.destroy();
                this.destroy();
            }
        }
    }    

    move() {
        if(this.isAlive) {
            switch(this.state) {
                case EnemyStates.free:
                    this.setPos(this.posX, this.posY + this.speedY);
                    break;

                case EnemyStates.capturing:
                    this.setPos(this.posX, this.posY + this.speedY);
                    this.trackHuman();
                    break;
    
                case EnemyStates.captured:
                    this.setPos(this.posX, this.posY - this.speedY);
                    break;

            }
            
        }
    }

    trackHuman() {
        if(this.state == EnemyStates.capturing) {
            const humanPos = this.humanToCapture.getPos();
            if(this.posX < humanPos.x) {
                this.setPos(this.posX + this.speedX, this.posY);
            }
            if(this.posX > humanPos.x) {
                this.setPos(this.posX - this.speedX, this.posY);
            }
    
        }

    }

    destroy() {
        this.release();
        super.destroy();
    }

    capturing(human) {
        super.capturing(human);
        this.humanToCapture = human;
    }

    capture(human) {
        super.capture(human);
        this.humanToCapture = human;
    }

    release() {
        super.release();
        if(this.humanToCapture !== null) {
            this.humanToCapture.release();
            this.humanToCapture = null;
        }        
    }  
}

module.exports = DropShip;