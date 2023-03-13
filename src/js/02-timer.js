import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DELAY = 1000;
const refs = {
  inputEl: document.querySelector('input[type="text"]'),
  startButton: document.querySelector('[data-start]'),
  dayEl: document.querySelector('[data-days]'),
  hourEl: document.querySelector('[data-hours]'),
  minEl: document.querySelector('[data-minutes]'),
  secEl: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const deltaTime = selectedDates[0] - Date.now();

    if (deltaTime < 0) {
      Notify.failure('Please choose a date in the future');
      disabledStartButton();
    } else {
      refs.startButton.removeAttribute('disabled');

      refs.startButton.addEventListener('click', () => {
        if (isActive) {
          return;
        }
        disabledStartButton();
        isActive = true;
        setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = selectedDates[0] - currentTime;

          updateClockFace(convertMs(deltaTime));
        }, DELAY);
      });
    }
  },
};

let isActive = false;

disabledStartButton();

flatpickr(refs.inputEl, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function disabledStartButton() {
  refs.startButton.setAttribute('disabled', 'disabled');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.dayEl.textContent = days;
  refs.hourEl.textContent = hours;
  refs.minEl.textContent = minutes;
  refs.secEl.textContent = seconds;
}
