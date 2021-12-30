class GameObject {
    constructor(x, y, panel, sprite) {
        this.type = null;
        this.posX = x;
        this.posY = y;
        this.panel = panel;
        this.sprite = sprite;
        this.explosionSprite = null;
        this.isActive = false;
        this.facingForward = true;
        this.deactivationTimeout = 120;
        this.deactivationStart = null;
        this.drawBoundingBox = false;
        this.state = null;
        this.boundingBox = {
            x1: -1,
            y1: -1,
            x2: -1,
            y2: -1
        }
    }

    tick(time) {
        if(this.deactivationStart !== null) {
            if(time - this.deactivationStart >= this.deactivationTimeout) {
                this.deactivate();
            }
        }
        if(this.sprite !== null) {
            const frameWidth = this.sprite.frameWidth;
            const frameHeight = this.sprite.frameHeight;
            this.boundingBox = {
                x1: this.posX,
                y1: this.posY,
                x2: this.posX + frameWidth - 1,
                y2: this.posY + frameHeight - 1
            }          
        }

    }

    animate(time) {
        if(this.sprite && this.isActive && this.isAlive) {
            this.sprite.animate(time);
        }
        if(this.explosionSprite && this.isActive && !this.isAlive) {
            this.explosionSprite.animate(time);
        }
    }

    render() {
        if(this.drawBoundingBox) {
            this.panel.drawLine(this.boundingBox.x1, this.boundingBox.y1, this.boundingBox.x2, this.boundingBox.y1, 255,0,0);
            this.panel.drawLine(this.boundingBox.x2, this.boundingBox.y1, this.boundingBox.x2, this.boundingBox.y2, 255,0,0);
            this.panel.drawLine(this.boundingBox.x2, this.boundingBox.y2, this.boundingBox.x1, this.boundingBox.y2, 255,0,0);
            this.panel.drawLine(this.boundingBox.x1, this.boundingBox.y2, this.boundingBox.x1, this.boundingBox.y1, 255,0,0);
        }
        if(this.panel && this.sprite && this.isActive) {
            if(this.isAlive) {
                this.panel.drawSprite(this.posX, this.posY, this.sprite, !this.facingForward);
            } else {
                if(this.explosionSprite) {
                    this.panel.drawSprite(this.posX, this.posY, this.explosionSprite, false);
                }
            }
        }

    }

    activate() {
        if(this.active) return;

        this.deactivationStart = null;
        this.isActive = true;
        if(this.sprite !== null) {
            const frameWidth = this.sprite.frameWidth;
            const frameHeight = this.sprite.frameHeight;
            this.boundingBox = {
                x1: this.posX,
                y1: this.posY,
                x2: this.posX + frameWidth - 1,
                y2: this.posY + frameHeight - 1
            }          
        }        
    }

    deactivate() {
        if(!this.isActive) return;

        this.isActive = false;
        this.boundingBox = {
            x1: -1,
            y1: -1,
            x2: -1,
            y2: -1
        }        
    }

    create() {
        this.activate();
    }

    destroy() {
        if(this.deactivationStart === null) {
            this.deactivationStart = Date.now(); 
        } else {
            this.deactivate();
        }
    }

    getPos() {
        return {x: this.posX, y: this.posY}
    }

    setPos(x = 0, y = 0) {
        this.posX = x <= 128 ? x : 0;
        this.posX = (this.posX < 0) ? 128 : this.posX;
        this.posY = y;
        this.posY = (this.posY < 0) ? 0 : this.posY;
        if(this.sprite !== null) {
            const frameWidth = this.sprite.frameWidth;
            const frameHeight = this.sprite.frameHeight;
            this.boundingBox = {
                x1: this.posX,
                y1: this.posY,
                x2: this.posX + frameWidth - 1,
                y2: this.posY + frameHeight - 1
            }          
        }
        
    }

    getBoundingBox() {
        return this.boundingBox;
    }

    isColliding(object1) {
        const bounds1 = object1.getBoundingBox()
        const bounds2 = this.getBoundingBox()
        let isColliding = false;
        // check x
        if(bounds1.x1 >= bounds2.x1 && bounds1.x1 <= bounds2.x2 || bounds1.x2 >= bounds2.x1 && bounds1.x2 <= bounds2.x2) {
            //check y
            if(bounds1.y1 >= bounds2.y1 && bounds1.y1 <= bounds2.y2 || bounds1.y2 >= bounds2.y1 && bounds1.y2 <= bounds2.y2) {
                isColliding = true;
            }
        }

        return isColliding        
    }

    setState(newState) {
        this.state = newState;
    }

    getState() {
        return this.state;
    }

    getType() {
        return this.type;
    }
}

module.exports = GameObject;