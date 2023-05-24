class Game {

    startGame = false;

    bird = new Bird();
    tube = [new Tube()];

    defaultKeyStorage = "Flappy_Bird_best_score";

    bestScore = 0;
    currentScore = 0;
    speedCoefficient = 0;

    constructor() {

        if (localStorage.getItem(this.defaultKeyStorage))
            this.bestScore = localStorage.getItem(this.defaultKeyStorage);
        else
            localStorage.setItem(this.defaultKeyStorage, this.bestScore);

    }

    motion(index) {
        this.tube[index].drawTopTube.x -= (SPEED_MOTION_TUBE + this.speedCoefficient);
        this.tube[index].drawBottomTube.x = this.tube[index].drawTopTube.x;

        this.tube[index].drawTopTube.x2 = this.tube[index].drawTopTube.x + this.tube[index].drawTopTube.width;
        this.tube[index].drawBottomTube.x2 = this.tube[index].drawBottomTube.x + this.tube[index].drawBottomTube.width;

        if (this.tube[index].drawTopTube.x2 < POINT_CREATE_NEW_TUBE_X && this.tube[index].flagNewTube === false) {

            this.tube[index].flagNewTube = true;
            this.tube.push(new Tube());

        }

        if (this.tube[index].drawTopTube.x2 < POINT_DESTROY_TUBE_X) {
            this.tube[index] = null;
            this.tube.shift();
        }

        this.#score(index);

        this.#deathBird(index);
    }

    #deathBird(index) {

        if ((this.bird.draw.y2 >= FIELD_DRAW_GROUND_Y) ||
            (((this.bird.draw.y >= this.tube[index].drawTopTube.y && this.bird.draw.y <= this.tube[index].drawTopTube.y2) ||
                (this.bird.draw.y2 >= this.tube[index].drawBottomTube.y && this.bird.draw.y2 <= this.tube[index].drawBottomTube.y2)) &&
                (this.bird.draw.x2 >= this.tube[index].drawTopTube.x && this.bird.draw.x2 <= this.tube[index].drawTopTube.x2))) {

            this.bird.alive = false;
            this.startGame = false;

            const dieSound = new Audio();
            dieSound.src = "./audio/hit.wav";
            dieSound.play();

            if (this.bestScore < this.currentScore)
                localStorage.setItem(this.defaultKeyStorage, this.currentScore);
        }

    }

    #score(index) {

        if ((this.bird.draw.x2 >= (this.tube[index].drawTopTube.x + this.tube[index].drawTopTube.width/2)) && 
        !this.tube[index].flagBirdFlewPast) {
            this.currentScore++;
            this.tube[index].flagBirdFlewPast = true;

            const dieSound = new Audio();
            dieSound.src = "./audio/point.wav";
            dieSound.play();

            // Если кол-во очков кратно 10, то скорость движения увеличивается
            if(this.currentScore % 10)
                this.speedCoefficient += 0.1;
        }
    }

    // flyUp() {
    //     this.bird.draw.y -= TUBE_OPENING_HEIGHT/2;
    //     this.bird.draw.y2 -= TUBE_OPENING_HEIGHT/2;

    // }




}