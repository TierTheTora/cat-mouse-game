let scores = {
    speed: 1.5,
    mouseHit: 0
};

const defaultScores = {
    speed: 1.5,
    mouseHit: 0
};

let dialogSettings;

document.addEventListener("DOMContentLoaded", () => {
    dialogSettings = document.getElementById("settings");
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
    // Create a new div element
    const mouseElement = document.createElement("img");
  
    // Assign the 'mouse' class to the new element
    mouseElement.classList.add("mouse");
    mouseElement.src = "./assets/mouse.png";
  
    // Set styles to make the element positionable within the viewport
    mouseElement.style.position = "fixed"; // 'fixed' to prevent background shift
    mouseElement.style.zIndex = 10; // Optional: Ensure it stays above other elements
  
    // Temporarily add it to measure its size
    document.body.appendChild(mouseElement);
  
    // Get the dimensions of the mouse element
    const mouseWidth = mouseElement.offsetWidth;
    const mouseHeight = mouseElement.offsetHeight;
  
    // Get the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    // Calculate random position within the viewport boundaries
    const randomX = window.innerWidth + 270;
    const randomY = Math.random() * (viewportHeight - mouseHeight);
  
    // Set the position of the element
    mouseElement.style.left = `${randomX}px`;
    mouseElement.style.top = `${randomY}px`;

    //posX += window.innerWidth; 
    //mouseElement.style.left = `${posX}px`; 
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
        // mouseElement.remove();
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
  
// Call the function to spawn the mouse element
setInterval( () => {
    if (!document.hidden)
        spawnMouse();
}, 6000);  



function spawnMouseLeft() {
    // Create a new div element
    const mouseElement = document.createElement("img");
  
    // Assign the 'mouse' class to the new element
    mouseElement.classList.add("mouse");
    mouseElement.src = "./assets/mouse-l.png";
  
    // Set styles to make the element positionable within the viewport
    mouseElement.style.position = "fixed"; // 'fixed' to prevent background shift
    mouseElement.style.zIndex = 10; // Optional: Ensure it stays above other elements
  
    // Temporarily add it to measure its size
    document.body.appendChild(mouseElement);
  
    // Get the dimensions of the mouse element
    const mouseWidth = mouseElement.offsetWidth;
    const mouseHeight = mouseElement.offsetHeight;
  
    // Get the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
  
    // Calculate random position within the viewport boundaries
    const randomX = -270;
    const randomY = Math.random() * (viewportHeight - mouseHeight);
  
    // Set the position of the element
    mouseElement.style.left = `${randomX}px`;
    mouseElement.style.top = `${randomY}px`;

    
    //posX += window.innerWidth; 
    //mouseElement.style.left = `${posX}px`; 
    let i = randomX;
    const move = setInterval( () => {
        i+=scores.speed;
        mouseElement.style.left = `${i}px`;
        if (i >= window.innerWidth) {
            mouseElement.remove();
            clearInterval(move);
        }
    }, 1);

    mouseElement.addEventListener("click", () => {
        // mouseElement.remove();
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
  
// Call the function to spawn the mouse element
setInterval( () => {
    if (!document.hidden)
        spawnMouseLeft();
}, 6000);

async function FullScreen() {
    if (!document.fullscreenElement) {
        // Enter full-screen mode on the body
        if (document.body.requestFullscreen) {
            await document.body.requestFullscreen();
        } else if (document.body.webkitRequestFullscreen) { // Safari compatibility
            await document.body.webkitRequestFullscreen();
        }
    } else {
        // Exit full-screen mode
        if (document.exitFullscreen) {
            await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari compatibility
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