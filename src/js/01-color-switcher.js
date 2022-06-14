function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const DELAY_TIME = 1000;

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalTimeId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  intervalTimeId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, DELAY_TIME);

  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function onStopBtnClick() {
  clearInterval(intervalTimeId);

  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}
