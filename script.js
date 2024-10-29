const mouseClick = new Audio("./game/assets/mouse.wav");
const playBtn = document.getElementById("play");
const bodyDiv = document.getElementById("body");

playBtn.addEventListener("click", () => mouseClick.play());

function changeGame() {
    playBtn.id = "animate-spin";
    bodyDiv.id = "animate-fade";
    setInterval(() => {window.location.href = "./game/"}, 1000);
};