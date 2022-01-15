const Sprite = require("../sprites/Sprite");

class GameObject {
    constructor(x, y, panel, sprite, simulation) {
        this.type = null;
        this.posX = x;
        this.posY = y;
        this.panel = panel;
        this.sprite = sprite ? new Sprite(sprite) : null;
        this.explosionSprite = null;
        this.isActive = false;
        this.facingForward = true;
        this.deactivationTimeout = 120;
        this.deactivationStart = null;
        this.drawBoundingBox = false;
        this.state = null;
        this.isAlive = true;
        this.simulation = simulation;
        this.screenSize = null;
        this.boundingBox = {
            x1: -1,
            y1: -1,
            x2: -1,
            y2: -1,
        };
        this.centerPoint = {
            x: -1,
            y: -1,
        };
    }

    tick(time) {
        if (this.deactivationStart !== null) {
            if (time - this.deactivationStart >= this.deactivationTimeout) {
                this.deactivate();
            }
        }
        this.updateBoundingBox();
        this.checkCollisions();
    }

    animate(time) {
        if (this.sprite && this.isActive && this.isAlive) {
            this.sprite.animate(time);
        }
        if (this.explosionSprite && this.isActive && !this.isAlive) {
            this.explosionSprite.animate(time);
        }
    }

    render() {
        if (this.drawBoundingBox) {
            this.panel.drawLine(this.boundingBox.x1, this.boundingBox.y1, this.boundingBox.x2, this.boundingBox.y1, 255, 0, 0);
            this.panel.drawLine(this.boundingBox.x2, this.boundingBox.y1, this.boundingBox.x2, this.boundingBox.y2, 255, 0, 0);
            this.panel.drawLine(this.boundingBox.x2, this.boundingBox.y2, this.boundingBox.x1, this.boundingBox.y2, 255, 0, 0);
            this.panel.drawLine(this.boundingBox.x1, this.boundingBox.y2, this.boundingBox.x1, this.boundingBox.y1, 255, 0, 0);
        }
        if (this.panel && this.sprite && this.isActive) {
            if (this.isAlive) {
                this.panel.drawSprite(this.posX, this.posY, this.sprite, !this.facingForward);
            } else {
                if (this.explosionSprite) {
                    this.panel.drawSprite(this.posX, this.posY, this.explosionSprite, false);
                }
            }
        }
    }

    activate() {
        if (this.active) return;

        this.deactivationStart = null;
        this.isActive = true;
        this.isAlive = true;
        this.screenSize = this.simulation.getScreenSize();
        this.updateBoundingBox();
    }

    deactivate() {
        if (!this.isActive) return;

        this.isActive = false;
        this.boundingBox = {
            x1: -1,
            y1: -1,
            x2: -1,
            y2: -1,
        };
        this.centerPoint = {
            x: -1,
            y: -1,
        };
    }

    create() {
        this.activate();
    }

    destroy() {
        this.isAlive = false;
        if (this.deactivationStart === null) {
            this.deactivationStart = Date.now();
        } else {
            this.deactivate();
        }
    }

    getPos() {
        return { x: this.posX, y: this.posY };
    }

    setPos(x = 0, y = 0) {
        this.posX = x <= this.screenSize.width ? x : 0;
        this.posX = this.posX < 0 ? this.screenSize.width : this.posX;
        this.posY = y <= this.screenSize.height ? y : 0;
        this.posY = this.posY < 0 ? this.screenSize.height : this.posY;
        this.updateBoundingBox();
    }

    getBoundingBox() {
        return this.boundingBox;
    }

    resetBoundingBox() {
        this.boundingBox = {
            x1: -1,
            y1: -1,
            x2: -1,
            y2: -1,
        };
        this.centerPoint = {
            x: -1,
            y: -1,
        };
    }

    updateBoundingBox() {
        if (this.sprite !== null && this.isActive) {
            const frameWidth = this.sprite.frameWidth;
            const frameHeight = this.sprite.frameHeight;
            this.boundingBox = {
                x1: this.posX,
                y1: this.posY,
                x2: this.posX + frameWidth - 1,
                y2: this.posY + frameHeight - 1,
            };
            this.centerPoint = {
                x: Math.floor((this.posX + frameWidth - 1) / 2),
                y: Math.floor((this.posY + frameHeight - 1) / 2),
            };
        } else {
            this.resetBoundingBox();
        }
    }

    isColliding(object1) {
        if (!this.isAlive) return false;
        const bounds1 = object1.getBoundingBox();
        const bounds2 = this.getBoundingBox();
        let isColliding = false;
        // check x
        if ((bounds1.x1 >= bounds2.x1 && bounds1.x1 <= bounds2.x2) || (bounds1.x2 >= bounds2.x1 && bounds1.x2 <= bounds2.x2)) {
            //check y
            if ((bounds1.y1 >= bounds2.y1 && bounds1.y1 <= bounds2.y2) || (bounds1.y2 >= bounds2.y1 && bounds1.y2 <= bounds2.y2)) {
                isColliding = true;
                // console.info("collision", this.type, object1.type);
            }
        }

        return isColliding;
    }

    checkCollisions() {
        let nearbyObjectsX = [];
        const start = this.centerPoint.x - Math.ceil(this.sprite.frameWidth / 2);
        const end = this.centerPoint.x + Math.ceil(this.sprite.frameWidth / 2);
        for (let i = start; i < end; i++) {
            // console.info(this.simulation.objectPositions.x[i]);
            if (this.simulation.objectPositions.x[i]) {
                const nearby = this.simulation.objectPositions.x[i].filter((object) => object.type !== this.type && this.isActive && object.isActive);
                nearbyObjectsX = nearbyObjectsX.concat(nearby);
            }
        }
        const colliding = nearbyObjectsX.filter((object) => this.isColliding(object) && this.isActive && object.isActive);
        if (colliding.length > 0) {
            this.handleCollisions(colliding);
        }
    }

    handleCollisions(collisions) {}

    setState(newState) {
        this.state = newState;
    }

    getState() {
        return this.state;
    }

    getCenterPoint() {
        return this.centerPoint;
    }

    getType() {
        return this.type;
    }

    move() {}
}

module.exports = GameObject;
