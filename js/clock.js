// querySelector는 element의 자식을 탐색한다.
const clockContainer = document.querySelector(".js-clock"),
    // clock class의 자식을 탐색하기 위해서는 아래와 같이 한다.
    clockTitle = clockContainer.querySelector("h1");

//setInterval(fn, 1000)   
// setInterval함수는 function argument와 시간(s)-실행할 시간 간격 argument를 갖는다.


function getTime() {
    const date = new Date();
    const minutes = paddingZero(date.getMinutes());
    const hours = paddingZero(date.getHours());
    const seconds = paddingZero(date.getSeconds());
    clockTitle.innerText = `${hours} : ${minutes} : ${seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

function paddingZero(num) {
    return (num < 10) ? `0${num}` : num;
}

init();