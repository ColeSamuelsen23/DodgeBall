// Resizing canvas so it matches screen size if the user resizes their window

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//Event listener for only key inpute we get from user which is the "R" key for restart, only works when they are in gameover/win state

document.addEventListener("keydown", playerInput);

function playerInput(e) {
  if (e.key === "r" && (score.gameover === true || score.win === true)) {
    restart();
  }
}

//Function responsible for creating our circle objects and populating our circlearray

function levelUp() {
  let indx = score.level - 1;
  if (score.level > levelconfig.numberofballs.length) {
    displayCongratulations();
  }
  for (let i = 0; i < levelconfig.numberofballs[indx]; i++) {
    let spawnX = screen.width / 2;
    let spawnY = screen.height / 2;
    let randomdx = levelconfig.dx[indx] * (Math.random() - 0.5);
    let randomdy = levelconfig.dx[indx] * (Math.random() - 0.5);

    let newcircle = new Circle(
      spawnX,
      spawnY,
      randomdx,
      randomdy,
      levelconfig.radius[indx],
      getRandomColor(),
      levelconfig.swervefactor[indx],
      levelconfig.homing[indx]
    );
    circlearray.push(newcircle);
  }
}

function updateScoreBoard() {
  c.font = "24pt Segoe UI";
  c.fillStyle = "black";
  c.fillText(`Level: ${score.level}`, 50, 100);
  updateHighscore();
}
function updateHighscore() {
  if (score.level > score.highscore) {
    score.highscore = score.level;
  }
  c.font = "24pt Segoe UI";
  c.fillStyle = "black";
  c.fillText(`High Score: ${score.highscore}`, 50, 50);
}

function displayCongratulations() {
  score.win = true;
  score.highscore = levelconfig.numberofballs.length;
  congrats.style.display = "inline-block";
}

function restart() {
  circlearray = [];
  health = 100;
  score.gameover = false;
  score.win = false;
  score.collision = 0;
  score.level = 0;
  gameover.style.display = "none";
  congrats.style.display = "none";
  levelUp();
}

function setmouseCords(event) {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
}

function gameOver() {
  score.gameover = true;
  gameover.style.display = "inline-block";
  circlearray = [];
}

//Healthbar is just an html elements whos CSS width style we target based on how many collisions they have had

function updateHealthbar() {
  if (score.collision < health) {
    let percenthealth = 100 * (1 - score.collision / health);
    healthbar.style.width = `${percenthealth}vw`;
  } else {
    healthbar.style.width = "0vw";
    gameOver();
  }
}

function checkforEmptyCircleArr() {
  if (circlearray.length === 0 && score.gameover === false) {
    score.level += 1;
    levelUp();
  }
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
