class Star {
    constructor(x, y, panel) {
        this.type = 'star';
        this.posX = x;
        this.posY = y;
        this.panel = panel;
        this.color = [55,55,55];
        this.colors = [
            [55, 55, 55],
            [25, 25, 25],
            [35, 35, 55],
            [75, 75, 75]
        ];

        this.animate();
    }

    animate() {
        const newColorIndex = Math.floor(Math.random()*this.colors.length);
        this.color = this.colors[newColorIndex];

    }

    render() {
        this.panel.setPixel(this.posX, this.posY, ...this.color);
    }
}

module.exports = Star;