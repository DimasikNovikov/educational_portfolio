
// размер поля, в клетках
const WIDTH_FIELD = +prompt("Введите количество клеток в ширину(от 5 до 20):", 10);
const HEIGHT_FIELD = +prompt("Введите количество клеток в высоту(от 5 до 20):", 10);

// размер одной клетки, в px 
const SIZE_A_CELL = 30;

// Имя Игрока по умолчанию
const NAME_OF_GAMER = "Guest";

// Индексы, для читабельности кода
const ROW = 0;
const COLUMN = 1;



// =========================================== КЛАССЫ СУЩНОСТЕЙ ================================================

// ---------------------------------------- Игровая доска (Табло очков, Поле) ---------------------------------
class GameBoard {

    currentScore = 0;

    #gameBoardDOM = document.querySelector(".gameBoard");
    #widthField_in_cells;
    #heightField_in_cells;
    #widthField_in_pixels;
    #heightField_in_pixels;

    constructor(widthField = 10, heightField = 10, sizeACell = 30, gamerName = "Guest") {
        this.#widthField_in_cells = widthField;
        this.#heightField_in_cells = heightField;
        this.#widthField_in_pixels = widthField * sizeACell;
        this.#heightField_in_pixels = heightField * sizeACell;


        // Инициализация двумерного массива под ячейки
        this.cell = [];
        for (let i = 0; i < this.#heightField_in_cells; i++)
            this.cell[i] = [];

        // Задаём размер поля для .field
        const field = this.#gameBoardDOM.querySelector(".field");
        field.style.width = `${this.#widthField_in_pixels}px`;
        field.style.height = `${this.#heightField_in_pixels}px`;

        // Создание ячеек
        for (let i = 0; i < this.#heightField_in_cells; i++)
            for (let j = 0; j < this.#widthField_in_cells; j++) {
                this.cell[i][j] = document.createElement("div");
                this.cell[i][j].className = "cell";
                this.cell[i][j].style.width = `${sizeACell}px`;
                this.cell[i][j].style.height = `${sizeACell}px`;
                this.cell[i][j].setAttribute("data-name", `${i} ${j}`);
                field.append(this.cell[i][j]);

            }

        //Табло очков
        this.updateCurrentScore();
        if (!localStorage.getItem(gamerName))
            localStorage.setItem(gamerName, 0);

        this.#gameBoardDOM.querySelector(".score__bestScore span").textContent = localStorage.getItem(gamerName);

    }

    updateCurrentScore() {
        this.#gameBoardDOM.querySelector(".score__currentScore").textContent = this.currentScore;
    }

    get widthField_in_cells() {
        return this.#widthField_in_cells;
    }
    get heightField_in_cells() {
        return this.#heightField_in_cells;
    }

    get gameBoardDOM() {
        return this.#gameBoardDOM;
    }

};


// ------------------------------------------------------- Змейка ------------------------------------------------
class Snake {

    // Относительно какого поля создаётся змейка
    #gameBoard;

    #head = 0;
    #tail;

    // Возможные направления движения змейки
    #motionVector = {
        up: [-1, 0],
        down: [1, 0],
        right: [0, 1],
        left: [0, -1]
    };

    // Для изменения движения змейки
    #headMotionVector = "right";


    constructor(gameBoard) {

        this.#gameBoard = gameBoard;

        // Задаём начальные координаты змейки по центру поля
        const initialHead = [Math.floor(this.#gameBoard.heightField_in_cells / 2), Math.floor(this.#gameBoard.widthField_in_cells / 2)];
        const initialTail = [Math.floor(this.#gameBoard.heightField_in_cells / 2), Math.floor(this.#gameBoard.widthField_in_cells / 2) - 1];

        this.body = [initialHead, initialTail];
        this.#tail = this.body.length - 1;

        this.#gameBoard.cell[this.body[this.#head][ROW]][this.body[this.#head][COLUMN]].className = "snakeHead";
        this.#gameBoard.cell[this.body[this.#tail][ROW]][this.body[this.#tail][COLUMN]].className = "snakeBody";

    }


    motion() {
        this.#gameBoard.cell[this.body[this.#head][ROW]][this.body[this.#head][COLUMN]].className = "snakeBody";
        this.#gameBoard.cell[this.body[this.#tail][ROW]][this.body[this.#tail][COLUMN]].className = "cell";


        for (let i = this.#tail; i > this.#head; i--) {
            this.body[i][ROW] = this.body[i - 1][ROW];
            this.body[i][COLUMN] = this.body[i - 1][COLUMN];
        }

        // изменение направления движения змейки
        document.addEventListener("keydown", (event) => {
            if (event.keyCode >= 37 && event.keyCode <= 40) {
                if (this.#headMotionVector === "right" || this.#headMotionVector === "left") {
                    if (event.key === "ArrowUp") {
                        this.#headMotionVector = "up";
                        return;
                    } else if (event.key === "ArrowDown") {
                        this.#headMotionVector = "down";
                        return;
                    }
                } else if (this.#headMotionVector === "up" || this.#headMotionVector === "down") {
                    if (event.key === "ArrowLeft") {
                        this.#headMotionVector = "left";
                        return;
                    } else if (event.key === "ArrowRight") {
                        this.#headMotionVector = "right";
                        return;
                    }
                }
            }
        });

        this.body[this.#head][ROW] = this.body[this.#head][ROW] + this.#motionVector[this.#headMotionVector][ROW];
        this.body[this.#head][COLUMN] = this.body[this.#head][COLUMN] + this.#motionVector[this.#headMotionVector][COLUMN];

        this.#moveThroughWall();

        this.#gameBoard.cell[this.body[this.#head][ROW]][this.body[this.#head][COLUMN]].className = "snakeHead";

    }

    bonAppetit(apple) {

        let temp = [this.body[this.#head][ROW] + this.#motionVector[this.#headMotionVector][ROW], this.body[this.#head][COLUMN] + this.#motionVector[this.#headMotionVector][COLUMN]];

        apple = null;
        

        this.#gameBoard.cell[this.body[this.#head][ROW]][this.body[this.#head][COLUMN]].className = "snakeBody";
        this.body.unshift(temp);
        this.#moveThroughWall();
        this.#gameBoard.cell[this.body[this.#head][ROW]][this.body[this.#head][COLUMN]].className = "snakeHead";

        this.#tail = this.body.length - 1;

        this.#gameBoard.currentScore++;
        this.#gameBoard.updateCurrentScore();

    }

    // Прохождение змейки через стенку
    #moveThroughWall() {
        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i][COLUMN] === this.#gameBoard.widthField_in_cells)
                this.body[i][COLUMN] = 0;
            else if (this.body[i][ROW] === this.#gameBoard.heightField_in_cells)
                this.body[i][ROW] = 0;
            else if (this.body[i][COLUMN] === -1)
                this.body[i][COLUMN] = this.#gameBoard.widthField_in_cells - 1;
            else if (this.body[i][ROW] === -1)
                this.body[i][ROW] = this.#gameBoard.heightField_in_cells - 1;
        }
    }

}


// -------------------------------------------------- Цель (Яблоко) -----------------------------------------------
class Apple {

    // координаты яблока
    row;
    column;

    constructor(snake, gameBoard) {

        while (true) {
            this.row = Math.floor(Math.random() * gameBoard.heightField_in_cells);
            this.column = Math.floor(Math.random() * gameBoard.widthField_in_cells);
            let flag = false;

            for (let i = 0; i < snake.body.length; i++)
                if (this.row === snake.body[i][ROW] && this.column === snake.body[i][COLUMN]) {
                    flag = true;
                    break;
                }

            if (!flag)
                break;
        }

        gameBoard.cell[this.row][this.column].className = "apple";


    }

}


// ================================================= КЛАСС ИГРЫ ====================================================
class Game {

    #gameBoard;
    #snake;
    #timerID;

    constructor() {
        this.#gameBoard = new GameBoard(WIDTH_FIELD, HEIGHT_FIELD, SIZE_A_CELL, NAME_OF_GAMER);
        this.#snake = new Snake(this.#gameBoard);
        this.apple = new Apple(this.#snake, this.#gameBoard);

    }

    start() {

        this.#gameBoard.gameBoardDOM.addEventListener("click", () => {
            this.#timerID = setInterval(() => {
                this.#gameProcess();
            }, 500);

        }, { once: true });

        
    }

    #gameProcess() {
        this.#snake.motion();

        if (this.#snake.body[0][ROW] === this.apple.row && this.#snake.body[0][COLUMN] === this.apple.column) {
            this.#snake.bonAppetit(this.apple);
            this.apple = new Apple(this.#snake, this.#gameBoard);
        }

        for (let i = 1; i < this.#snake.body.length; i++)
            if (this.#snake.body[0][ROW] === this.#snake.body[i][ROW] && this.#snake.body[0][COLUMN] === this.#snake.body[i][COLUMN])
                this.#gameOver();
    }

    #gameOver() {
        clearInterval(this.#timerID);
        
        if (localStorage.getItem(NAME_OF_GAMER) < this.#gameBoard.currentScore)
            localStorage.setItem(NAME_OF_GAMER, this.#gameBoard.currentScore);

        const windowGameOver = this.#gameBoard.gameBoardDOM.querySelector(".windowGameOver");
        windowGameOver.style.display = "flex";

        windowGameOver.querySelector(".repeatGame").addEventListener("click", () => { location.reload() })

    }
}
// ====================================================================================================================

function check(width, height) {
    if((WIDTH_FIELD < 5 || WIDTH_FIELD > 20) || (HEIGHT_FIELD < 5 || HEIGHT_FIELD > 20)) {
        alert("Введены некорректные данные! Игра будет перезагружена!");
        location.reload();
    }

} 

check(WIDTH_FIELD, HEIGHT_FIELD);

function init() {
    const game = new Game();
    game.start();
}

window.addEventListener("DOMContentLoaded", init);