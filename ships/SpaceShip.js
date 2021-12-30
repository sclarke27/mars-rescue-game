const BaseShip = require('./BaseShip');
const Sprites = require('../sprites/Sprites');

class SpaceShip extends BaseShip {
    constructor(x, y, panel, sprite, simulation) {
        super(x, y, panel, sprite, simulation);
        this.type = 'playerShip';
        this.engineColor = [100,100,100];
        this.flameColor1 = [255,255,0];
        this.flameColor2 = [100,100,0];
        this.engineState = null;
        this.frameWidth = this.sprite.frameWidth;
        this.speedMultiplierX = 3;
        this.speedMultiplierY = 1;
        this.projectileSpeed = 2;
        this.lives = 3;
        this.explosionSprite = Sprites.player.defaultShip.explosion;
    }

    animate(time) {
        super.animate(time);
        this.engineState = this.engineState === 'alt1' ? 'alt2' : 'alt1';
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
        this.setPos(20,20);
    }

    destroy() {
        super.destroy();
        this.lives = this.lives - 1;
    }

    handleCrossButton(buttonValue) {
        super.handleCrossButton(buttonValue);
        const currPos = this.getPos();
        const startX = (!this.facingForward ? currPos.x : currPos.x+this.frameWidth-2);
        const startY = currPos.y+3;
        const speedX = (this.facingForward ? this.projectileSpeed : this.projectileSpeed*-1);
        this.createProjectile(startX, startY, this.panel, Sprites.player.defaultShip.projectile, speedX, 0);
    }

    render() {
        super.render();
        if(this.panel && this.isActive) {
            
            
            if(!this.facingForward) {
                if(this.engineState === 'alt1') {
                    this.panel.setPixel(this.posX+this.frameWidth+1, this.posY+2, ...this.flameColor1);
                    this.panel.setPixel(this.posX+this.frameWidth+1, this.posY+3, ...this.flameColor2);            
                    this.panel.setPixel(this.posX+this.frameWidth+2, this.posY+3, ...this.flameColor2);            
                } else {
                    this.panel.setPixel(this.posX+this.frameWidth+1, this.posY+2, ...this.flameColor1);
                    this.panel.setPixel(this.posX+this.frameWidth+1, this.posY+3, ...this.flameColor2);            
                    this.panel.setPixel(this.posX+this.frameWidth+2, this.posY+2, ...this.flameColor2);            
                }

            } else {
                if(this.engineState === 'alt1') {
                    this.panel.setPixel(this.posX-1, this.posY+2, ...this.flameColor1);
                    this.panel.setPixel(this.posX-1, this.posY+3, ...this.flameColor2);            
                    this.panel.setPixel(this.posX-2, this.posY+3, ...this.flameColor2);            
                } else {
                    this.panel.setPixel(this.posX-1, this.posY+2, ...this.flameColor1);
                    this.panel.setPixel(this.posX-1, this.posY+3, ...this.flameColor2);            
                    this.panel.setPixel(this.posX-2, this.posY+2, ...this.flameColor2);            
                }
            }
        }
    }
}

module.exports = SpaceShip;