const DELAY = 1000;
const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let intervalId = null;

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

disabledStopButton();

function onStartButtonClick() {
  setColor();

  intervalId = setInterval(() => {
    setColor();
  }, DELAY);

  refs.startButton.setAttribute('disabled', 'disabled');
  refs.stopButton.removeAttribute('disabled');
}

function onStopButtonClick() {
  clearInterval(intervalId);

  refs.startButton.removeAttribute('disabled');
  disabledStopButton();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function disabledStopButton() {
  refs.stopButton.setAttribute('disabled', 'disabled');
}

function setColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
