const BaseShip = require('./BaseShip');

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
        this.state = EnemyStates.free;
        
    }

    create() {
        super.create();
    }

    tick(time) {
        super.tick(time);
        if(this.posY >= 58 && this.isAlive) {
            this.destroy();
        }
    }

    setPos(x = 0, y = 0) {
        this.posX = x <= 128 ? x : 0;
        this.posY = y;
    }    

    capturing(object) {
        this.state = EnemyStates.capturing;
    }

    capture(object) {
        this.state = EnemyStates.captured;
    }

    release() {
        this.state = EnemyStates.free;
    }     

}

module.exports = {EnemyShip, EnemyStates};
