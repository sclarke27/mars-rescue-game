const GameController = require('./utils/GameController');
const LedPanel = require('./utils/LedPanel');
const Simulation = require('./utils/Simulation');

class Main {
    constructor() {
        this.panel = null;
        this.mainLoopTimeout = null;
        this.prevTime = null;
        this.frames = 0;
        this.fps = 0;
        this.font = null;
        this.testFont = null;
        this.animationInterval = 1000/15;
        this.movementInterval = 1000/120;
        this.lastAnimTick = null;
        this.lastMovementTick = null;

        this.groundY = 55;
        this.gameController1 = null;

        this.simulation = null;

    }


    start() {
        this.panel = new LedPanel();
        this.prevTime = Date.now();
        this.lastMovementTick = Date.now();
        this.lastAnimTick = Date.now();
        this.uiFont  =  __dirname + '/fonts/' + "4x6.bdf";
        this.uiFont2  =  __dirname + '/fonts/' + "5x8.bdf";
        this.regularFont  =  __dirname + '/fonts/' + "UTRG__10.bdf";
        this.scriptFont  =  __dirname + '/fonts/' + "luBIS14.bdf";

        this.simulation = new Simulation(this.panel);
        this.gameController1 = new GameController();

        // this.simulation.start();
        this.tick();
    }   
    
    tick() {
        const time = Date.now();
        
        // compute fps
        this.frames++;
        if(time > this.prevTime + 1000) {
            this.fps = (( this.frames * 1000 ) / ( time - this.prevTime )).toFixed(2);
            this.prevTime = time;
            this.frames = 0;
        }

        // trigger read from game controller
        this.gameController1.read();

        if(this.gameController1.data.buttons.startButton === true) {            
            if(!this.simulation.isRunning) {
                this.simulation.start();
            } else {
                this.simulation.pause();
            }
            
        }

        if(this.simulation.getPlayerLives(0) === 0 && this.simulation.isRunning) {
            this.simulation.stop();
        }

        // handle animation tick interval
        if(time - this.lastAnimTick >= this.animationInterval) {
            this.simulation.animate(time);
            this.lastAnimTick = time;            
        }

        // handle sim tick interval
        if(time - this.lastMovementTick >= this.movementInterval) {

            this.simulation.handleInput(this.gameController1.data);
            this.simulation.tick(time);
    
            this.lastMovementTick = time;
        }

        // render screen
        this.render(time);

        // do loop
        clearTimeout(this.mainLoopTimeout);
        this.mainLoopTimeout = setTimeout(this.tick.bind(this), 1);

    }

    render() {
        // refresh panels
        this.panel.clear();
        const player1Lives = this.simulation.getPlayerLives(0);
        if(this.simulation.isRunning) {
            // render stars
            this.simulation.renderBackground();
            this.panel.drawText(1, 1, `${this.fps} FPS`, this.uiFont, 100,100,100);

            // draw simple ground
            this.panel.drawLine(0, this.groundY, 128, this.groundY, 0, 255, 0);        
            this.panel.drawLine(0, this.groundY+1, 128, this.groundY+1, 0, 155, 0);        
            this.panel.drawLine(0, this.groundY+2, 128, this.groundY+2, 0, 55, 0);
            for(let i=0; i<=(64-(this.groundY+3)); i++) {
                this.panel.drawLine(0, this.groundY+3+i, 128, this.groundY+3+i, 0, 25, 0);
            }

            // draw mountains
            this.panel.drawMountain(10, this.groundY, 16, [100,100,0],[255,255,0]);
            this.panel.drawMountain(42, this.groundY-1, 6, [50,50,0],[150,150,0]);
            this.panel.drawMountain(72, this.groundY, 22, [100,100,0],[255,255,0]);

            // render sim objects
            this.simulation.render();

            // draw UI
            const score = this.simulation.getScore();
            
            this.panel.drawText(1, 58, `Lives: ${player1Lives}`, this.uiFont, 255,255,255);
            this.panel.drawText(40, 58, `Score: ${score}`, this.uiFont, 255,255,255);

        }
        if(this.simulation.isPaused) {
            this.panel.drawText(40, 32, `Paused`, this.uiFont2, 255,255,255);
        }
        if(player1Lives <= 0) {
            this.panel.drawText(18, 12, `Mars Rescue`, this.scriptFont, 255,50,50);
            this.panel.drawText(19, 11, `Mars Rescue`, this.scriptFont, 255,255,255);
            this.panel.drawLine(15, 30, 120, 30, 255, 0, 0);
            this.panel.drawText(40, 32, `Press Start`, this.uiFont2, 255,255,255);
        }

        // draw play field to screen
        this.panel.render();        

    }
}

const app = new Main();
app.start();