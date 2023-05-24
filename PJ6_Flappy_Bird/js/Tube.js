
class Tube {

    flagNewTube = false;
    flagBirdFlewPast = false;
    
    drawTopTube = {
        x: TUBE_DRAW_TOP_X,
        y: (Math.random() * (MAX_Y - MIN_Y)) + MIN_Y,
        width: TUBE_SOURCE_WIDTH,
        height: TUBE_DRAW_TOP_HEIGHT,
    };

    drawBottomTube = {
        width: TUBE_SOURCE_WIDTH,
        height: TUBE_SOURCE_HEIGHT
    };

    constructor() {

        this.drawTopTube.x2 = this.drawTopTube.x + this.drawTopTube.width;
        this.drawTopTube.y2 = this.drawTopTube.y + this.drawTopTube.height;

        this.drawBottomTube.x = this.drawTopTube.x;
        this.drawBottomTube.y = this.drawTopTube.y2 + TUBE_OPENING_HEIGHT;
        this.drawBottomTube.x2 = this.drawBottomTube.x + this.drawBottomTube.width;
        this.drawBottomTube.y2 = this.drawBottomTube.y + this.drawBottomTube.height;

    }

}