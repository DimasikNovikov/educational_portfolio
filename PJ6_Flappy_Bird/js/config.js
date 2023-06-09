// Путь к спрайтшиту
const IMAGE_URL = "./sprite.png";

// Поле
const FIELD_WIDTH = 275;
const FIELD_HEIGHT = 450;
const FIELD_BACKGROUND = "skyblue";

const FIELD_SOURCE_HOUSES_X = 0;
const FIELD_SOURCE_HOUSES_Y = 0;
const FIELD_SOURCE_HOUSES_WIDTH = 275;
const FIELD_SOURCE_HOUSES_HEIGHT = 227;

const FIELD_SOURCE_GROUND_X = 276;
const FIELD_SOURCE_GROUND_Y = 0;
const FIELD_SOURCE_GROUND_WIDTH = 224;
const FIELD_SOURCE_GROUND_HEIGHT = 112;

const FIELD_DRAW_HOUSES_X = 0;
const FIELD_DRAW_HOUSES_Y = 150;

const FIELD_DRAW_GROUND_X = 0;
const FIELD_DRAW_GROUND_Y = 340;

// Труба
const BOTTOM_TUBE = 0;
const TOP_TUBE = 1;

const TUBE_SOURCE_X = [502, 554];
const TUBE_SOURCE_Y = 0;
const TUBE_SOURCE_WIDTH = 53;
const TUBE_SOURCE_HEIGHT = 400;

const TUBE_OPENING_HEIGHT = FIELD_HEIGHT * 0.25;

const MAX_Y = (-350);
const MIN_Y = (-200);

const TUBE_DRAW_TOP_X = FIELD_WIDTH + 1;
const TUBE_DRAW_TOP_Y = (Math.random() * (MAX_Y - MIN_Y)) + MIN_Y;
const TUBE_DRAW_TOP_WIDTH = TUBE_SOURCE_WIDTH;
const TUBE_DRAW_TOP_HEIGHT = TUBE_SOURCE_HEIGHT;

const DISTANCE_BETWEEN_TUBES = TUBE_SOURCE_WIDTH * 3;
const POINT_CREATE_NEW_TUBE_X = FIELD_WIDTH - DISTANCE_BETWEEN_TUBES;
const POINT_DESTROY_TUBE_X = 0;

const SPEED_MOTION_TUBE = (DISTANCE_BETWEEN_TUBES + TUBE_SOURCE_WIDTH)/67;

// Птица
const BIRD_SOURCE_X = 276;
const BIRD_SOURCE_Y = [114, 140, 166];
const BIRD_SOURCE_WIDTH = 33;
const BIRD_SOURCE_HEIGHT = 25;

const BIRD_DRAW_X = 40;
const BIRD_DRAW_Y = 150;
const BIRD_DRAW_WIDTH = TUBE_SOURCE_WIDTH/2.0;
const BIRD_DRAW_HEIGHT = TUBE_OPENING_HEIGHT * 0.25;

const WINGS_SPEED_COEFFICIENT = 0.25;

const GRAVITY_CORFFICIENT = 0.05;  

// Стартовая заставка
const START_ICON_SOURSE_X = 29;
const START_ICON_SOURSE_Y = 282;
const START_ICON_SOURSE_WIDTH = 117;
const START_ICON_SOURSE_HEIGHT = 100;

const START_ICON_DRAW_X = 80;
const START_ICON_DRAW_Y = 50;

//Табло очков
const SCOREBOARD_SOURCE_X = 325;
const SCOREBOARD_SOURCE_Y = 282;
const SCOREBOARD_SOURCE_WIDTH = 65;
const SCOREBOARD_SOURCE_HEIGHT = 90;

const SCOREBOARD_DRAW_X = 200;
const SCOREBOARD_DRAW_Y = 357;

const SCOREBOARD_TEXT_FONT = "bold 20px Verdana";
const SCOREBOARD_TEXT_COLOR = "BLACK";

const CURRENT_SCORE_X = 233;
const CURRENT_SCORE_Y = 397;
const BEST_SCORE_X = 233;
const BEST_SCORE_Y = 439;

// Надпись Game Over
const GAME_OVER_SOURCE_X = 193;
const GAME_OVER_SOURCE_Y = 228;
const GAME_OVER_SOURCE_WIDTH = 190;
const GAME_OVER_SOURCE_HEIGHT = 50;

const GAME_OVER_DRAW_X = 50;
const GAME_OVER_DRAW_Y = 100;

// Кнопка Start
const BUTTON_START_SOURCE_X = 230;
const BUTTON_START_SOURCE_Y = 400;
const BUTTON_START_SOURCE_WIDTH = 100;
const BUTTON_START_SOURCE_HEIGHT = 50;

const BUTTON_START_DRAW_X = 90;
const BUTTON_START_DRAW_Y = 200;


