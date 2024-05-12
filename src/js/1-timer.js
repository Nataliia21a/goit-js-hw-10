import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  dateTimePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};
let isActive = false;
refs.btnStart.disabled = true;
let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (new Date() > userSelectedDate) {
      iziToast.error({
        title: 'Error',
        message: '"Please choose a date in the future"',
      });
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

flatpickr(refs.dateTimePicker, options);

function onBtnStartClick() {
  // if (isActive) {
  //   return;
  // }
  // isActive = true;
  refs.btnStart.disabled = true;
  refs.dateTimePicker.disabled = true;
  const userDateMs = userSelectedDate.getTime();
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const ms = userDateMs - currentTime;
    let time = convertMs(ms);
    if (ms <= 0) {
      clearInterval(intervalId);
      time = convertMs(0);
      // isActive = false;
      refs.btnStart.disabled = false;
      refs.dateTimePicker.disabled = false;
    }
    updateClockface(time);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return {
    days: addLeadingZero(days),
    hours: addLeadingZero(hours),
    minutes: addLeadingZero(minutes),
    seconds: addLeadingZero(seconds),
  };
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}
function updateClockface({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSeconds.textContent = `${seconds}`;
}
refs.btnStart.addEventListener('click', onBtnStartClick);
