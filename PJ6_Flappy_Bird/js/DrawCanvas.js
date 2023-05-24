class DrawCanvas {

    requestId;

    constructor(game) {

        let wingSpeed = 0;

        this.canvas = document.createElement('canvas');
        this.canvas.width = FIELD_WIDTH;
        this.canvas.height = FIELD_HEIGHT;
        document.body.prepend(this.canvas);

        const ctx = this.canvas.getContext("2d");

        const img = new Image();
        img.src = IMAGE_URL;

        img.onload = rendering;

        function rendering() {

            // Задний фон
            ctx.fillStyle = FIELD_BACKGROUND;
            ctx.fillRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);

            // Облака и дома
            ctx.drawImage(img,
                FIELD_SOURCE_HOUSES_X,
                FIELD_SOURCE_HOUSES_Y,
                FIELD_SOURCE_HOUSES_WIDTH,
                FIELD_SOURCE_HOUSES_HEIGHT,

                FIELD_DRAW_HOUSES_X,
                FIELD_DRAW_HOUSES_Y,
                FIELD_SOURCE_HOUSES_WIDTH,
                FIELD_SOURCE_HOUSES_HEIGHT);


            // Труба
            if (game.startGame && game.bird.alive) {
                for (let i = 0; i < game.tube.length; i++) {

                    ctx.drawImage(img,
                        TUBE_SOURCE_X[TOP_TUBE],
                        TUBE_SOURCE_Y,
                        TUBE_SOURCE_WIDTH,
                        TUBE_SOURCE_HEIGHT,

                        game.tube[i].drawTopTube.x,
                        game.tube[i].drawTopTube.y,
                        game.tube[i].drawTopTube.width,
                        game.tube[i].drawTopTube.height);

                    ctx.drawImage(img,
                        TUBE_SOURCE_X[BOTTOM_TUBE],
                        TUBE_SOURCE_Y,
                        TUBE_SOURCE_WIDTH,
                        TUBE_SOURCE_HEIGHT,

                        game.tube[i].drawBottomTube.x,
                        game.tube[i].drawBottomTube.y,
                        game.tube[i].drawBottomTube.width,
                        game.tube[i].drawBottomTube.height);

                    game.motion(i);

                }

                // Птичка
                if (wingSpeed >= 6)
                    wingSpeed = 0;

                ctx.save();

                let centerBird_x = game.bird.draw.x + BIRD_DRAW_WIDTH/2;
                let centerBird_y = game.bird.draw.y + BIRD_DRAW_HEIGHT/2;
                ctx.translate(centerBird_x, centerBird_y);

                let angle = game.bird.angleFlyUp * Math.PI/180;
                ctx.rotate(angle);
                

                ctx.drawImage(img,
                    BIRD_SOURCE_X,
                    BIRD_SOURCE_Y[Math.floor(wingSpeed / 2)],
                    BIRD_SOURCE_WIDTH,
                    BIRD_SOURCE_HEIGHT,

                    game.bird.draw.x - centerBird_x,
                    game.bird.draw.y - centerBird_y,
                    BIRD_DRAW_WIDTH,
                    BIRD_DRAW_HEIGHT);

                ctx.restore();

                FallBird.fall(game.bird);

            }

            // Земля
            ctx.drawImage(img,
                FIELD_SOURCE_GROUND_X,
                FIELD_SOURCE_GROUND_Y,
                FIELD_SOURCE_GROUND_WIDTH,
                FIELD_SOURCE_GROUND_HEIGHT,

                FIELD_DRAW_GROUND_X,
                FIELD_DRAW_GROUND_Y,
                FIELD_WIDTH,
                FIELD_SOURCE_GROUND_HEIGHT + 2);

            // Табло очков
            {
                ctx.drawImage(img,
                    SCOREBOARD_SOURCE_X,
                    SCOREBOARD_SOURCE_Y,
                    SCOREBOARD_SOURCE_WIDTH,
                    SCOREBOARD_SOURCE_HEIGHT,

                    SCOREBOARD_DRAW_X,
                    SCOREBOARD_DRAW_Y,
                    SCOREBOARD_SOURCE_WIDTH,
                    SCOREBOARD_SOURCE_HEIGHT);


                ctx.lineWidth = 2;
                ctx.strokeRect(SCOREBOARD_DRAW_X,
                    SCOREBOARD_DRAW_Y,
                    SCOREBOARD_SOURCE_WIDTH,
                    SCOREBOARD_SOURCE_HEIGHT);

                ctx.fillStyle = SCOREBOARD_TEXT_COLOR;
                ctx.font = SCOREBOARD_TEXT_FONT;
                ctx.textAlign = "center";
                ctx.fillText(`${game.currentScore}`, CURRENT_SCORE_X, CURRENT_SCORE_Y);
                ctx.fillText(`${game.bestScore}`, BEST_SCORE_X, BEST_SCORE_Y);
            }

            // Старт игры
            if (!game.startGame && game.bird.alive) {

                ctx.drawImage(img,
                    START_ICON_SOURSE_X,
                    START_ICON_SOURSE_Y,
                    START_ICON_SOURSE_WIDTH,
                    START_ICON_SOURSE_HEIGHT,

                    START_ICON_DRAW_X,
                    START_ICON_DRAW_Y,
                    START_ICON_SOURSE_WIDTH,
                    START_ICON_SOURSE_HEIGHT);
            }

            // Конец игры
            if (!game.startGame && !game.bird.alive) {

                ctx.drawImage(img,
                    GAME_OVER_SOURCE_X,
                    GAME_OVER_SOURCE_Y,
                    GAME_OVER_SOURCE_WIDTH,
                    GAME_OVER_SOURCE_HEIGHT,

                    GAME_OVER_DRAW_X,
                    GAME_OVER_DRAW_Y,
                    GAME_OVER_SOURCE_WIDTH,
                    GAME_OVER_SOURCE_HEIGHT);

                ctx.drawImage(img,
                    BUTTON_START_SOURCE_X,
                    BUTTON_START_SOURCE_Y,
                    BUTTON_START_SOURCE_WIDTH,
                    BUTTON_START_SOURCE_HEIGHT,

                    BUTTON_START_DRAW_X,
                    BUTTON_START_DRAW_Y,
                    BUTTON_START_SOURCE_WIDTH,
                    BUTTON_START_SOURCE_HEIGHT);



            }

            requestAnimationFrame(rendering);

            wingSpeed += WINGS_SPEED_COEFFICIENT;
        }
    }




}