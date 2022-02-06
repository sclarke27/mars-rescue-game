const BaseShip = require("./BaseShip");
const Sprites = require("../sprites/Sprites");
const Sprite = require("../sprites/Sprite");

class SpaceShip extends BaseShip {
    constructor(x, y, panel, sprite, simulation) {
        super(x, y, panel, sprite, simulation);
        this.type = "playerShip";
        this.engineColor = [100, 100, 100];
        this.flameColor1 = [255, 255, 0];
        this.flameColor2 = [100, 100, 0];
        this.engineState = null;
        this.frameWidth = this.sprite.frameWidth;
        this.speedMultiplierX = 2;
        this.speedMultiplierY = 0.75;
        this.projectileSpeed = 2;
        this.lives = 3;
        this.explosionSprite = new Sprite(Sprites.player.defaultShip.explosion);
        this.shieldEnabled = false;
        this.autoPlay = true;
    }

    animate(time) {
        super.animate(time);
        this.engineState = this.engineState === "alt1" ? "alt2" : "alt1";
    }

    // tick(time) {
    //     super.tick(time);
    //     let lowestEnemy = null;
    //     if (this.autoPlay) {
    //         const enemyList = this.simulation.enemies;

    //         if (enemyList.length === 0) {
    //             this.handleLeftAnalog(0, 0);
    //             return;
    //         }

    //         for (let i = 0; i < enemyList.length; i++) {
    //             const enemy = enemyList[i];
    //             if (lowestEnemy === null || lowestEnemy.getPos().y < enemy.getPos().y) {
    //                 if (enemy.getPos().y > 5) {
    //                     lowestEnemy = enemy;
    //                 }
    //             }
    //         }

    //         if (lowestEnemy === null) {
    //             this.handleLeftAnalog(0, 0);
    //             return;
    //         }

    //         const xDist = this.posX - (lowestEnemy !== null ? lowestEnemy.getPos().x : 0);
    //         const yDist = this.posY - (lowestEnemy !== null ? lowestEnemy.getPos().y : 0);

    //         let speedX = 0;
    //         let speedY = 0;

    //         if (xDist < -20) {
    //             speedX = 1;
    //         } else if (xDist < 0 && xDist > -20) {
    //             speedX = -1;
    //         } else {
    //             speedX = 1;
    //         }

    //         if (xDist > 20) {
    //             speedX = -1;
    //         } else if (xDist < 20 && xDist >= 0) {
    //             speedX = 1;
    //         } else if (xDist === -20) {
    //             speedX = -1;
    //         }

    //         if (yDist < 0) {
    //             speedY = 1;
    //         } else if (yDist > 1) {
    //             speedY = -1;
    //         } else {
    //             speedY = 0;
    //             if (xDist <= 25 && xDist >= -25) {
    //                 this.handleCrossButton(100);
    //             }
    //         }

    //         for (let i = 0; i < enemyList.length; i++) {
    //             const enemy = enemyList[i];

    //             const xDist = this.posX - (enemy !== null ? enemy.getPos().x : 0);
    //             const yDist = this.posY - (enemy !== null ? enemy.getPos().y : 0);

    //             if (xDist >= -50 && xDist <= 50) {
    //                 if (yDist >= -50 && yDist <= 50) {
    //                     handleSquareButton(100);
    //                 }
    //                 // console.info({ xDist, yDist });
    //             }
    //         }

    //         this.handleLeftAnalog(speedX, speedY);
    //     }
    // }

    tick(time) {
        super.tick(time);

        if (this.autoPlay) {
            const enemyList = this.simulation.enemies;
            const nearestEnemy = {
                distance: -1,
                enemy: null,
            };
            let enableShields = false;
            let lowestEnemy = null;
            let capturingEnemy = null;
            let minXDist = 12;
            for (let i = 0; i < enemyList.length; i++) {
                const currentEnemy = enemyList[i];
                const currentDistance = this.findDistance(this.posX, this.posY, currentEnemy.getPos().x, currentEnemy.getPos().y);
                // console.info({ currentDistance });
                // if (currentEnemy.getPos().y >= 0) {
                if ((nearestEnemy.distance > currentDistance || nearestEnemy.distance === -1) && currentDistance !== NaN) {
                    nearestEnemy.distance = currentDistance;
                    nearestEnemy.enemy = currentEnemy;
                }
                if (lowestEnemy === null || lowestEnemy.getPos().y < currentEnemy.getPos().y) {
                    if (currentEnemy.getPos().y > 5) {
                        lowestEnemy = currentEnemy;
                    }
                }
                if (currentEnemy.getState() === "captured") {
                    capturingEnemy = currentEnemy;
                }
                // }
                const xDist = this.posX - currentEnemy.getPos().x;
                const yDist = this.posY - (currentEnemy !== null ? currentEnemy.getPos().y : 0);

                if (xDist >= minXDist * -1 && xDist <= minXDist) {
                    if (yDist >= minXDist * -1 && yDist <= minXDist) {
                        if (!enableShields && yDist >= -5 && yDist <= 5) {
                            this.handleCrossButton(100);
                        }
                        enableShields = true;
                    }
                }
            }
            this.handleSquareButton(enableShields ? 100 : 0);
            const enemy = capturingEnemy !== null ? capturingEnemy : nearestEnemy.enemy;
            if (enemy) {
                const xDist = this.posX - enemy.getPos().x;
                const yDist = this.posY - enemy.getPos().y;

                let speedX = 0;
                let speedY = 0;

                if (xDist <= minXDist * -1) {
                    speedX = 1;
                } else if (xDist > minXDist * -1 && xDist <= 0) {
                    speedX = -1;
                } else if (xDist > 0 && xDist < minXDist) {
                    speedX = 1;
                } else if (xDist >= minXDist) {
                    speedX = -1;
                }

                // if (xDist > 15) {
                //     speedX = -1;
                // } else if (xDist < 15 && xDist >= 0) {
                //     speedX = 1;
                // } else if (xDist === -15) {
                //     speedX = -1;
                // }

                if (yDist < 0) {
                    speedY = 1;
                } else if (yDist > 1) {
                    speedY = -1;
                } else {
                    speedY = 0;
                    if (xDist > -15 && xDist < 15) {
                        // this.handleCrossButton(100);
                    }
                }

                this.handleLeftAnalog(speedX, speedY);
                // console.info({ nearestEnemy, xDist, yDist });
            }
            // }
        }
    }

    findDistance(x1, y1, x2, y2) {
        let distance = 1;
        const xPow = Math.pow(x2 - x1, 2);
        const yPow = Math.pow(y2 - y1, 2);
        distance = Math.sqrt(xPow + yPow);
        return distance;
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
        this.setPos(20, 20);
    }

    destroy() {
        if (!this.shieldEnabled) {
            super.destroy();
            this.lives = this.lives - 1;
        }
    }

    setPos(x = 0, y = 0) {
        this.posX = x <= this.screenSize.width ? x : 0;
        this.posX = this.posX < 0 ? this.screenSize.width : this.posX;
        this.posY = y <= this.screenSize.height ? y : 0;
        this.posY = this.posY < 0 ? 0 : this.posY;
        if (this.posY + this.sprite.frameHeight >= this.simulation.getGroundLevel() && this.isAlive) {
            this.posY = this.simulation.getGroundLevel() - this.sprite.frameHeight;
        }
        this.updateBoundingBox();
    }

    handleSquareButton(buttonValue) {
        this.shieldEnabled = buttonValue > 50;
    }

    handleCrossButton(buttonValue) {
        if (buttonValue < 10) return;
        super.handleCrossButton(buttonValue);
        const currPos = this.getPos();
        const startX = !this.facingForward ? currPos.x : currPos.x + this.frameWidth - 2;
        const startY = currPos.y + 3;
        const speedX = this.facingForward ? this.projectileSpeed : this.projectileSpeed * -1;
        this.createLaser(startX, startY, this.panel, Sprites.player.defaultShip.projectile, speedX, 0);
    }

    drawShield() {
        const radius = this.sprite.frameWidth / 2;
        const x = this.posX + this.sprite.frameWidth / 2;
        const y = this.posY + this.sprite.frameHeight / 2;
        this.panel.drawCircle(x, y, radius, 0, 0, 55);
        this.panel.drawCircle(x, y, radius + 1, 50, 50, 255);
        this.panel.drawCircle(x, y, radius + 2, 150, 150, 255);
    }

    render() {
        super.render();
        if (this.panel && this.isActive) {
            if (this.shieldEnabled) {
                this.drawShield();
            }
            if (!this.facingForward) {
                if (this.engineState === "alt1") {
                    this.panel.setPixel(this.posX + this.frameWidth + 1, this.posY + 2, ...this.flameColor1);
                    this.panel.setPixel(this.posX + this.frameWidth + 1, this.posY + 3, ...this.flameColor2);
                    this.panel.setPixel(this.posX + this.frameWidth + 2, this.posY + 3, ...this.flameColor2);
                } else {
                    this.panel.setPixel(this.posX + this.frameWidth + 1, this.posY + 2, ...this.flameColor1);
                    this.panel.setPixel(this.posX + this.frameWidth + 1, this.posY + 3, ...this.flameColor2);
                    this.panel.setPixel(this.posX + this.frameWidth + 2, this.posY + 2, ...this.flameColor2);
                }
            } else {
                if (this.engineState === "alt1") {
                    this.panel.setPixel(this.posX - 1, this.posY + 2, ...this.flameColor1);
                    this.panel.setPixel(this.posX - 1, this.posY + 3, ...this.flameColor2);
                    this.panel.setPixel(this.posX - 2, this.posY + 3, ...this.flameColor2);
                } else {
                    this.panel.setPixel(this.posX - 1, this.posY + 2, ...this.flameColor1);
                    this.panel.setPixel(this.posX - 1, this.posY + 3, ...this.flameColor2);
                    this.panel.setPixel(this.posX - 2, this.posY + 2, ...this.flameColor2);
                }
            }
        }
    }
}

module.exports = SpaceShip;
