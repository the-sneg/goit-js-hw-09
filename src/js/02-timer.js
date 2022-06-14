import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dataPickerBtn: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),

  allLabels: document.querySelectorAll('.label'),
  allValues: document.querySelectorAll('.value'),
  timerWrap: document.querySelector('.timer'),
};

const DATA_DELAY = 1000;
let dateDifference = null;
let timerId = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24Hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    let dateNow = new Date();
    dateDifference = selectedDates[0] - dateNow;

    if (selectedDates[0] < dateNow) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future.');
    } else {
      refs.startBtn.disabled = false;
      Notiflix.Notify.success('Great! Now click on Start button.');
    }
  },
};

flatpickr(refs.dataPickerBtn, options);

refs.startBtn.addEventListener('click', timeLeft);

function timeLeft() {
  timerId = setInterval(() => {
    let dateDifferenceInMs = convertMs(dateDifference);
    refs.startBtn.disabled = true;
    dateTimerTextContent(dateDifferenceInMs);

    dateDifference = dateDifference - 1000;

    if (dateDifference <= 0) {
      clearInterval(timerId);
    }
  }, DATA_DELAY);
}

function dateTimerTextContent({ seconds, minutes, hours, days }) {
  refs.seconds.textContent = pad(seconds);
  refs.minutes.textContent = pad(minutes);
  refs.hours.textContent = pad(hours);
  refs.days.textContent = pad(days);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.dataPickerBtn.style.marginBottom = '50px';
refs.timerWrap.style.display = 'flex';

refs.allValues.forEach(el => (el.style.fontSize = '35px'));
refs.allValues.forEach(el => (el.style.fontWeight = '700'));
refs.allValues.forEach(el => (el.style.marginRight = '5px'));

refs.allLabels.forEach(el => (el.style.fontSize = '15px'));
refs.allLabels.forEach(el => (el.style.marginRight = '25px'));
