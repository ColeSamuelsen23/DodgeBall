///Select our canvas, set the inner width and height to the window size

let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

//Creates a pointer Object that will store coordinated of the mouse.

let pointer = { x: 0, y: 0 };

//Sets the canvas width and height to their display width/height.

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "#fffff0";

/// Html page elements in a variable

let healthbar = document.getElementById("healthbar");
let gameover = document.getElementById("gameover");
let congrats = document.getElementById("congrats");

let score = {
  collision: 0,
  level: 0,
  gameover: false,
  highscore: 0,
  win: false,
};

///
///   DEFINE LEVELS WE WOULD LIKE TO PLAY
///   IN THIS GAME THERE ARE 10 LEVELS SO EACH ARRAY WILL HAVE TO HAVE 10 ELEMENTS
///

const levelconfig = {
  numberofballs: [1, 30, 3, 4, 300],
  dx: [30, 4, 50, 10, 1.5],
  dy: [30, 4, 50, 10, 1.5],
  radius: [300, 100, 60, 100, 30],
  swervefactor: [0.1, 0, 0, 0.1, 0],
  speed: [1.5, 0.2, 0.1, 0.1, 0.02],
  homing: [true, false, false, true, false],
};

let health = 100;
let colors = ["#ffb7c5", "#ce1127", "#cc474b", "#ffc0cb"];
let dragcoefficient = 0.99;
let ballattraction = 3000;

///
///
///
///

///Defining our Circle Array and Filling It Up

var circlearray = [];

function animate(event) {
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  requestAnimationFrame(animate);

  if (!score.gameover && !score.win) {
    for (let circle of circlearray) {
      c.beginPath();
      circle.update();
    }

    updateHealthbar();
    updateScoreBoard();
    checkforEmptyCircleArr();
  }
}

animate();
