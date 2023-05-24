class Bird {

    alive = true;
    angleFlyUp = 0;
    
    draw = {
        x: BIRD_DRAW_X,
        y: BIRD_DRAW_Y
    };

    constructor() {
        this.draw.x2 = this.draw.x + BIRD_DRAW_WIDTH;
        this.draw.y2 = this.draw.y + BIRD_DRAW_HEIGHT;
    };

    // flyUp() {
    //     this.draw.y -= TUBE_OPENING_HEIGHT/2;
    //     this.draw.y2 -= TUBE_OPENING_HEIGHT/2;

    // };

    
}