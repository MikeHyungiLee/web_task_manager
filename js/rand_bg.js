const bg_img = document.querySelector(".js-bg-img");

const TOTAL_IMG_NUMBER = 10;

function paintImage(imgNum) {
    bg_img.src = `../../imgs/bg-img/${imgNum + 1}.jpg`;
}

function getRandomNumber() {
    const num = Math.floor(Math.random() * TOTAL_IMG_NUMBER);
    return num;
}

function init() {
    const randomNumber = getRandomNumber();
    paintImage(randomNumber);
}

init();