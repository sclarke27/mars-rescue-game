const Sprites = require("../ships/Sprites");
const GameObject = require("./GameObject");

const HumanStates = {
    free: 'free',
    gettingCaptured: 'gettingCaptured',
    captured: 'captured',
    capturing: 'capturing',
    falling: 'falling'
};

class Human extends GameObject {
    constructor(x, y, panel, sprite = Sprites.human) {
        super(x, y, panel, sprite);
        this.type = 'human';
        this.speedX = 0.1;
        this.speedY = 1;
        this.facingForward = this.speedX < 0;
        this.isAlive = true;
        this.capturingShip = null;
        this.state = HumanStates.free;
    }

    tick(time) {
        switch(this.state) {
            case HumanStates.captured:
                const shipPos = this.capturingShip.getPos();
                this.setPos(shipPos.x + 1, shipPos.y + 4);
                break;
            case HumanStates.free:
                this.walk()
                break;
            case HumanStates.falling:
                this.setPos(this.posX, this.posY + 2);
                break;
    
        }
    }

    walk() {
        // console.info('walk human');
        if(Math.random() > 0.99) {
            this.speedX = this.speedX * -1;
        }
        this.setPos(this.posX + this.speedX, this.posY);
    }

    capture(capturingShip) {
        if(this.state != HumanStates.captured) {
            // console.info('human | capture');
            this.state = HumanStates.captured;
            this.capturingShip = capturingShip;
        }
    }

    capturing(capturingShip) {
        if(this.state != HumanStates.capturing) {
            // console.info('human | capturing');
            this.state = HumanStates.capturing;
            this.capturingShip = capturingShip;
        }
    }    

    release() {
        if(this.state = HumanStates.free) {
            // console.info('human | release');
            this.state = HumanStates.free;
            this.capturingShip = null;
        }
    }
}

module.exports = Human;