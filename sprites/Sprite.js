class Sprite {
    constructor(sprite) {
        this.pallette = sprite.pallette;
        this.frames = sprite.frames;
        this.frameCount = this.frames.length;
        this.frameWidth = sprite.frameWidth;
        this.frameHeight = sprite.frameHeight;
        this.currentFrame = 0;
    }

    animate(time) {
        this.currentFrame++;
        if(this.currentFrame >= this.frameCount) {
            this.currentFrame = 0;
        }
    }

    getFrame(frameNumber) {
        let frame = [];
        if(this.frames[frameNumber]) {
            frame= this.frames[frameNumber];
        }
        return frame;
    }

    getFrameSize() {
        return {
            width: this.frameWidth, 
            height: this.frameHeight
        }
    }

    getNextFrame() {
        return this.getFrame(this.currentFrame);
    }
}

module.exports = Sprite;