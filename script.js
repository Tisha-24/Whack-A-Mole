const cursor = document.querySelector(".cursor");
const holes = [...document.querySelectorAll(".hole")];
const scoreelem = document.querySelector(".score span");
const startBtn = document.querySelector("#start");
const gameOverMsg = document.querySelector(".game-over");

const sound = new Audio("/audios/smash.mp3");
const bombSound = new Audio("/audios/weh.mp3");

let score = 0;
let timer;

function run() {
  if (!gameOverMsg.style.display || gameOverMsg.style.display === "none") {
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];

    const img = document.createElement("img");
    img.classList.add("mole");
    const isMole = Math.random() < 0.8;
    img.src = isMole ? "/images/molebigger.png" : "/images/bomb.png";

    img.addEventListener("click", () => {
      if (isMole) {
        score += 10;
        sound.play();
        scoreelem.textContent = score;
        img.src = "/images/deadmolepng.png";
      } else {
        bombSound.play();
        gameOver();
        score = 0;
        scoreelem.textContent = score;
        stopGame();
      }
      clearTimeout(timer);
      setTimeout(() => {
        hole.removeChild(img);
        run();
      }, 500);
    });

    hole.appendChild(img);

    timer = setTimeout(() => {
      hole.removeChild(img);
      run();
    }, 1500);
  }
}

startBtn.addEventListener("click", startGame);

function startGame() {
  score = 0;
  scoreelem.textContent = score;
  gameOverMsg.style.display = "none";
  run();
}

function gameOver() {
  gameOverMsg.style.display = "block";
}

function stopGame() {
  clearTimeout(timer);
}

window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});
