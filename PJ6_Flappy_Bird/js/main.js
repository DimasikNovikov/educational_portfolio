function main() {
    let game = new Game();
    let drawGame = new DrawCanvas(game);

    function start() {
        game.startGame = true;
        drawGame.canvas.removeEventListener('click', start);
        // drawGame.canvas.addEventListener('click', game.flyUp);

        // Движение птицы вверх
        // Почему то, когда создавал функцию в class Bird или Game, то не работает, хотя код такой же
        drawGame.canvas.addEventListener('click', () => {
            FallBird.fallSpeed = 0;
            game.bird.angleFlyUp = (-25);
            game.bird.draw.y -= TUBE_OPENING_HEIGHT / 2;
            game.bird.draw.y2 -= TUBE_OPENING_HEIGHT / 2;

            const dieSound = new Audio();
            dieSound.src = "./audio/flap.wav";
            if (game.startGame && game.bird.alive)
                dieSound.play();

            // Конец игры. При клики игра повторяется
            if (!game.startGame && !game.bird.alive)
                // Нужно 2 клика
                drawGame.canvas.addEventListener('click', () => {

                    drawGame.canvas.remove();
                    drawGame = null;
                    game = null;
                    main()
                });
        });

    }

    drawGame.canvas.addEventListener('click', start);

};

window.addEventListener("DOMContentLoaded", main);