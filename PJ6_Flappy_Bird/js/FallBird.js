class FallBird {
    
    static fallSpeed = 0;
    static g = GRAVITY_CORFFICIENT;

    static fall(bird) {
        bird.angleFlyUp += 1;

        this.fallSpeed += this.g;
        bird.draw.y += this.fallSpeed;
        bird.draw.y2 += this.fallSpeed;
    }

}