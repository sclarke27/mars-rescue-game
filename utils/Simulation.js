const SpaceShip = require('../ships/SpaceShip');
const EnemyShip = require('../ships/EnemyShip');
const Star = require('../objects/Star');
const ShipSprites = require('../ships/Sprites');
const Projectile = require('../ships/Projectile');
const Human = require('../objects/Human');

class Simulation {
    constructor(panel) {
        this.enemies = [];
        this.players = [];
        this.stars = [];
        this.humans = [];
        this.projectiles = [];
        this.panel = panel;
        this.totalEnemies = 3;
        this.totalHumans = 10;
        this.score = 0;
        this.groundLevel = 58;
        this.isRunning = false;
        this.isPaused = false;
    }

    start() {

        this.isRunning = true;

        this.score = 0;

        for(let i = 0; i<this.enemies.length; i++) {
            this.enemies[i].destroy();        
        }

        for(let i = 0; i<this.humans.length; i++) {
            this.humans[i].destroy();        
        }

        for(let i = 0; i<this.projectiles.length; i++) {
            this.projectiles[i].destroy();        
        }

        this.createPlayer(20, 20, this.panel);


        // generate star field
        if(this.stars.length === 0) {
            for(let i = 0; i<30; i++) {
                const newX = Math.round(Math.random() * 128);
                const newY = Math.round(Math.random() * 64);
                this.createStar(newX, newY, this.panel);
            }
        }
    }

    stop() {
        for(let i = 0; i<this.enemies.length; i++) {
            this.enemies[i].deactivate();  
        }

        for(let i = 0; i<this.humans.length; i++) {
            this.humans[i].deactivate();    
        }

        for(let i = 0; i<this.players.length; i++) {
            this.players[i].deactivate();  
        }        

        for(let i = 0; i<this.projectiles.length; i++) {
            this.projectiles[i].deactivate();  
        }        

        this.tick(Date.now());

        this.enemies = [];
        this.humans = [];
        this.projectiles = [];
        this.players = [];

        this.isRunning = false

    }

    pause() {
        this.isPaused = !this.isPaused;
    }

    tick(time) {
        if(!this.isRunning || this.isPaused) {
            return;
        }
        // clean up dead objects
        if(this.projectiles.length > 0) {
            this.projectiles = this.projectiles.filter(projectile => projectile.isActive );
        }
        

        if(this.enemies.length < this.totalEnemies) {
            for(let i = 0; i<(this.totalEnemies-this.enemies.length); i++) {
                const newX = Math.round(Math.random() * 120);
                const newY = -10;
                this.createEnemy(newX,newY, this.panel);
                
            }            
        }

        if(this.humans.length < this.totalHumans) {
            for(let i = 0; i<(this.totalHumans-this.humans.length); i++) {
                const newX = Math.round(Math.random() * 120);
                const newY = this.groundLevel - 5;
                this.createHuman(newX,newY, this.panel);
            }            
        }

        // tick player sim
        for(let i = 0; i<this.players.length; i++) {
            if(!this.players[i].isActive && this.players[0].getLives() > 0) {
                this.players[i].create();
            }
            this.players[i].tick(time);           
        }

        // projectile tick
        for(let i = 0; i<this.projectiles.length; i++) {
            const projectile = this.projectiles[i];
            // check enemy collision
            for(let e = 0; e<this.enemies.length; e++) {
                const isColliding = this.enemies[e].isColliding(projectile);
                if(isColliding) {
                    this.enemies[e].destroy();
                    projectile.destroy();
                    this.score = this.score + 300;
                }
            }                    
            projectile.tick(time);    

        }

        // tick enemy sim
        for(let i = 0; i<this.enemies.length; i++) {
            const enemy = this.enemies[i];
            enemy.tick(time);
            // check player collision
            if(enemy.isActive && enemy.isAlive) {
                for(let p=0; p<this.players.length; p++) {
                    const currentPlayer = this.players[p];
                    if(currentPlayer.isAlive) {
                        const isColliding = enemy.isColliding(currentPlayer);
                        if(isColliding) {
                            enemy.destroy();
                            currentPlayer.destroy();
                            this.score = this.score - 1000;
                        }
                    }                
                }

                // find humans
                for(let h=0; h<this.humans.length; h++) {
                    const human = this.humans[h];
                    const humanPos = human.getPos();
                    const enemyPos = enemy.getPos();
                    const distanceY = humanPos.y - enemyPos.y;
                    const distanceX = humanPos.x - enemyPos.x;
                    
                    if(distanceX < 10 && distanceX > -10) {
                        if((enemy.getState() == 'free' || enemy.getState() == 'capturing') && (human.getState() == 'free' || human.getState() == 'capturing')) {
                            enemy.capturing(human);
                            human.capturing(enemy);
                            if(distanceY < 8) {
                                enemy.capture(human);
                                human.capture(enemy);
                            }
                        }
                        
                    }
                }
            } else {
                enemy.release();
            }
        }

        // tick humans
        for(let i = 0; i<this.humans.length; i++) {
            const human = this.humans[i];
            const humanPos = human.getPos();
            if(humanPos.y < (this.groundLevel - 15) && human.getState() == 'free') {
                human.setState('falling');
            }
            if(humanPos.y > 50 && human.getState() == 'falling') {
                human.setState('free');
            }
            human.tick(time);
        }        

        this.enemies = this.enemies.filter(enemy => enemy.isActive );
    }

    animate(time) {
        // animate stars
        for(let i = 0; i<this.stars.length; i++) {
            this.stars[i].animate(time);
        }

        // animate players
        for(let i = 0; i<this.players.length; i++) {
            this.players[i].animate(time);
        }

        // projectile animate
        for(let i = 0; i<this.projectiles.length; i++) {
            this.projectiles[i].animate(time);            
        }
        
        // animate enemies
        for(let i = 0; i<this.enemies.length; i++) {
            this.enemies[i].animate(time);
        }

        // animate humans
        for(let i = 0; i<this.humans.length; i++) {
            this.humans[i].animate(time);
        }        
    }

    renderBackground() {
        //render stars
        for(let i = 0; i<this.stars.length; i++) {
            this.stars[i].render();
        }

    }

    render() {

        // render players
        for(let i = 0; i<this.players.length; i++) {
            this.players[i].render();
        }

        // projectile render
        for(let i = 0; i<this.projectiles.length; i++) {
            this.projectiles[i].render();            
        }

        // render enemies
        for(let i = 0; i<this.enemies.length; i++) {
            this.enemies[i].render();
        }
        
        // render humans
        for(let i = 0; i<this.humans.length; i++) {
            this.humans[i].render();
        }        

    }

    handleInput(data) {
        if(this.players.length >= 1) {
            this.players[0].handleLeftAnalog(data.analogs.left.x, data.analogs.left.y);
            this.players[0].handleButtons(data.buttons);        
        }
    }

    // player methods
    createPlayer(x, y, panel) {
        const newPlayer = new SpaceShip(x, y, panel, ShipSprites.playerSprite, this);
        newPlayer.create();
        this.addPlayer(newPlayer)
        return newPlayer;
    }

    addPlayer(newPlayer) {
        this.players.push(newPlayer);
    }

    removePlayer(oldPlayer) {
        this.players = this.players.filter(player => player !== oldPlayer)
    }

    // enemy methods
    createEnemy(x, y, panel) {
        const newEnemy = new EnemyShip(x, y, panel, ShipSprites.enemySprite1);
        this.addEnemy(newEnemy);
        newEnemy.create();
        return newEnemy;
    }

    addEnemy(newEnemy) {
        this.enemies.push(newEnemy);
    }

    removeEnemy(oldEnemy) {
        this.enemies.filter(enemy => enemy !== oldEnemy);
    }

    // star methods
    createStar(x, y, panel) {
        const newStar = new Star(x, y, panel);
        this.stars.push(newStar);
    }

    // projectile methods
    createProjectile(x, y, panel, sprite, speedX, speedY) {
        const newProjectile = new Projectile(x, y, panel, sprite, speedX, speedY);
        newProjectile.create();
        this.projectiles.push(newProjectile);
    }

    getScore() {
        return this.score;
    }

    getPlayerLives(playerNumber) {
        if(this.players.length === 0) return 0;
        return this.players[playerNumber].getLives();
    }

    createHuman(x, y, panel, sprite, speedX, speedY) {
        const newHuman = new Human(x, y, panel, sprite, speedX, speedY);
        newHuman.create();
        this.humans.push(newHuman);
    }    
}

module.exports = Simulation;