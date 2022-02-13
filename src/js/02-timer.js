import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.4.min.css";

const btnStart = document.querySelector("[data-start]");
const input = document.querySelector("#datetime-picker");

const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

btnStart.disabled = true;
let endDate = null;
const timerId = null;

function checkDate(date) {
    btnStart.disabled = true;

    const now = new Date();
    if (date < now) {
        Notiflix.Report.failure("Please choose a date in the future");
        return;
    }
    btnStart.disabled = false;
    endDate = date.getTime();
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        checkDate(selectedDates[0]);
    },
};

flatpickr(input, options);

btnStart.addEventListener("click", () => {
    const timerId = setInterval(() => {
        const now = new Date().getTime();
        const time = endDate - now;
        if (time < 0) {
            clearInterval(timerId);
            return;
        }
        const res = convertMs(time);

        days.innerHTML = addLeadingZero(res.days);
        hours.innerHTML = addLeadingZero(res.hours);
        minutes.innerHTML = addLeadingZero(res.minutes);
        seconds.innerHTML = addLeadingZero(res.seconds);
        // console.log(res);
    }, 1000);
    Notiflix.Notify.success();
});

function addLeadingZero(num) {
    return String(num).padStart(2, "0");
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

    return { days, hours, minutes, seconds };
}