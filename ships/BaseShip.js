const GameObject = require('../objects/GameObject');
const Utils = require('../utils/Functions');

class BaseShip extends GameObject {
    constructor(x, y, panel, sprite, simulation) {
        super(x, y, panel, sprite, simulation);
        this.speedX = 0;
        this.speedY = 0;
        this.speedMultiplierX = 1;
        this.speedMultiplierY = 1;
        this.isCrossDown = false;
        
        this.isPressed = {
            triangle: false,
            circle: false,
            square: false,
            cross: false
        }
    }
    
    handleLeftAnalog(x, y) {
        let analogX = Utils.normalize(x, 0, 255).toPrecision(1)
        analogX = (analogX - 0.5).toPrecision(1) * this.speedMultiplierX;

        let analogY = Utils.normalize(y, 0, 255).toPrecision(1)
        analogY = (analogY - 0.5).toPrecision(1) * this.speedMultiplierY;

        this.setSpeed(analogX, analogY);
    }

    handleButtons(buttons) {
        const buttonKeys = Object.keys(buttons);

        for(let i = 0; i<buttonKeys.length; i++) {
            const button = buttonKeys[i];
            const buttonValue = buttons[button];
            if(buttonValue > 10) {
                if(!this.isPressed[button]) {
                    switch(button) {
                        case "triangle":
                            this.handleTriangleButton(buttonValue);
                            break;
                        case "circle":
                            this.handleCircleButton(buttonValue);
                            break;
                        case "square":
                            this.handleSquareButton(buttonValue);
                            break;        
                        case "cross":
                            this.handleCrossButton(buttonValue);
                            break;
    
                    }
                    this.isPressed[button] = true;
                }
            } else {
                this.isPressed[button] = false;
            }
    
        }        
    }

    handleTriangleButton(buttonValue) {
        // console.info('triangle', buttonValue);
    }

    handleCircleButton(buttonValue) {
        // console.info('circle', buttonValue);
    }

    handleSquareButton(buttonValue) {
        // console.info('square', buttonValue);
    }

    handleCrossButton(buttonValue) {
        // console.info('cross', buttonValue);
    }

    move() {
        if(this.isAlive) {
            this.setPos(this.posX + this.speedX, this.posY + this.speedY);        
        }
    }

    setSpeed(speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
    }

    createLaser(x, y, panel, sprite, speedX = 0, speedY =0 ) {
        this.simulation.createLaser(x, y, panel, sprite, speedX, speedY);
    }

    createBomb(x, y, panel, sprite, speedX = 0, speedY =0 ) {
        this.simulation.createBomb(x, y, panel, sprite, speedX, speedY);
    }    

    animate(time) {
        super.animate(time);
    }

    tick(time) {
        super.tick(time);
        if(this.speedX !== 0) {
            this.facingForward = (this.speedX > 0);
        }
        if(this.isActive) {
            this.move();
        }

    }

    render() {
        super.render();

    }

    create() {
        super.create();
    }

    destroy() {
        super.destroy();
    }

}

module.exports = BaseShip;