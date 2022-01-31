import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
    startButton:document.querySelector('button[data-start]')
};

refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const startTime = Date.now();

    if (selectedDate < startTime) {
      Notify.failure('Please choose a date in the future');
      refs.startButton.disabled = true;
      return;
    };

    refs.startButton.disabled = false;

    refs.startButton.addEventListener('click', startCountdown);

    function startCountdown() {
      refs.startButton.disabled = true;

      setInterval(() => {
        const currentTime = Date.now();

        if (selectedDate < currentTime) {
          return;
        };

        const timeDifference = selectedDate - currentTime;
        const countdown = convertMs(timeDifference);
        
        refs.days.textContent = addLeadingZero(countdown.days);
        refs.hours.textContent = addLeadingZero(countdown.hours);
        refs.minutes.textContent = addLeadingZero(countdown.minutes);
        refs.seconds.textContent = addLeadingZero(countdown.seconds);
      }, 1000);
    };
  },
};

flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
  if (value.toString().length < 2) {
    return value.toString().padStart(2, '0');
  };

  return value;
};

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
};