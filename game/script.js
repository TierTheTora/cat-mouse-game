let scores = {
    speed: 1.5,
    mouseHit: 0
};

const defaultScores = {
    speed: 1.5,
    mouseHit: 0
};

let dialogSettings;
let dialogReset;

document.addEventListener("DOMContentLoaded", () => {
    dialogSettings = document.getElementById("settings");
    dialogReset = document.getElementById("resetConfirm");
});

const scoreLbl = document.getElementById("score");
const settingsBtn = document.getElementById("gear");
const fullScreenBtn = document.getElementById("fullscreen");

document.addEventListener("DOMContentLoaded", () => {
    scoreLbl.innerText = `Score: ${scores.mouseHit}`;
});

function SaveVariables(){
    localStorage.setItem("scores", JSON.stringify(scores));
    LoadVariables();
};

function LoadVariables(){
    var temp = JSON.parse(localStorage.getItem("scores"));
    if (temp != null) {
        if (!temp.hasOwnProperty("speed")) {
            temp.speed = scores.speed;
        }
        if (!temp.hasOwnProperty("mouseHit")) {
            temp.mouseHit = scores.mouseHit;
        }
        scores = temp;
    }
};

LoadVariables();
spawnMouse();
spawnMouseLeft();

function spawnMouse() {
    const mouseElement = document.createElement("img");
  
    mouseElement.classList.add("mouse");
    mouseElement.src = "./assets/mouse.png";
  
    mouseElement.style.position = "fixed";
    mouseElement.style.zIndex = 10;
  
    document.body.appendChild(mouseElement);
  
    const mouseHeight = mouseElement.offsetHeight;
  
    const viewportHeight = window.innerHeight;
  
    const randomX = window.innerWidth + 270;
    const randomY = Math.random() * (viewportHeight - mouseHeight);
  
    mouseElement.style.left = `${randomX}px`;
    mouseElement.style.top = `${randomY}px`;

    let i = randomX;
    const move = setInterval( () => {
        i-=scores.speed;
        mouseElement.style.left = `${i}px`;
        if (i <= -270) {
            mouseElement.remove();
            clearInterval(move);
        }
    }, 1);

    mouseElement.addEventListener("click", () => {
        scores.mouseHit++;
        SaveVariables();
        scoreLbl.innerText = `Score: ${scores.mouseHit}`;
        mouseElement.classList.remove("mouse");
        mouseElement.classList.add("remove")
        const remove = setInterval( () => {
            mouseElement.remove()
            clearInterval(remove);
        }, 2000);
        clearInterval(move);
    });
    

};
  
setInterval( () => {
    if (!document.hidden)
        spawnMouse();
}, 6000);  

function spawnMouseLeft() {
    const mouseElement = document.createElement("img");
  
    mouseElement.classList.add("mouse");
    mouseElement.src = "./assets/mouse-l.png";
  
    mouseElement.style.position = "fixed";
    mouseElement.style.zIndex = 10;
  
    document.body.appendChild(mouseElement);
  
    const mouseHeight = mouseElement.offsetHeight;
  
    const viewportHeight = window.innerHeight;
  
    const randomX = -270;
    const randomY = Math.random() * (viewportHeight - mouseHeight);
  
    mouseElement.style.left = `${randomX}px`;
    mouseElement.style.top = `${randomY}px`;

    let i = randomX;
    const move = setInterval( () => {
        var num = 0;
        num = parseFloat(scores.speed);        
        i+=num;
        mouseElement.style.left = `${i}px`;
        if (i >= window.innerWidth) {
            mouseElement.remove();
            clearInterval(move);
        }
    }, 1);

    mouseElement.addEventListener("click", () => {
        scores.mouseHit++;
        SaveVariables();
        scoreLbl.innerText = `Score: ${scores.mouseHit}`;
        mouseElement.classList.remove("mouse");
        mouseElement.classList.add("remove")
        const remove = setInterval( () => {
            mouseElement.remove()
            clearInterval(remove);
        }, 2000);
        clearInterval(move);
    });

};
  
setInterval( () => {
    if (!document.hidden)
        spawnMouseLeft();
}, 6000);

async function FullScreen() {
    if (!document.fullscreenElement) {
        if (document.body.requestFullscreen) {
            await document.body.requestFullscreen();
        } else if (document.body.webkitRequestFullscreen) { 
            await document.body.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            await document.webkitExitFullscreen();
        }
    }
};

const inputId = document.getElementById("input");

inputId.addEventListener("keyup", (e) => {
    if (e.keyCode === 13){
        if (inputId.value <= 30){
            scores.speed = inputId.value;
            SaveVariables();
        }
        else {
            scores.speed = 1.5;
            SaveVariables();
        }
    }
});

function resetGame() {
    scores = defaultScores;
    SaveVariables();
    scoreLbl.innerText = `Score: ${scores.mouseHit}`;
};

function closeSettings() {
   dialogSettings.close();
};

function openSettings() {
    dialogSettings.showModal();
};

function resetClose() {
    dialogReset.close();
}