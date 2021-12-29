const BaseShip = require('./BaseShip');
const Sprites = require('./Sprites');

const EnemyStates = {
    free: 'free',
    capturing: 'capturing',
    captured: 'captured'
};

class EnemyShip extends BaseShip {
    constructor(x, y, panel, sprite) {
        super(x, y, panel, sprite);
        this.type = 'enemyShip';
        this.speedX = 0.05;
        this.speedY = 0.05;
        this.explosionSprite = Sprites.enemyExplosion;
        this.state = EnemyStates.free;
        this.humanToCapture = null;
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

    setPos(x = 0, y = 0) {
        this.posX = x <= 128 ? x : 0;
        this.posY = y;
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
        this.humanToCapture = human;
        this.state = EnemyStates.capturing;
    }

    capture(human) {
        this.humanToCapture = human;
        this.state = EnemyStates.captured;
    }

    release() {
        if(this.humanToCapture !== null) {
            this.humanToCapture.release();
            this.humanToCapture = null;
        }        
        this.state = EnemyStates.free;
    }

}

module.exports = EnemyShip;