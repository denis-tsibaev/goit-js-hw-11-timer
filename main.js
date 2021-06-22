// new CountdownTimer({
// 	selector: '#timer-1',
// 	targetDate: new Date('Jul 22, 2021'),
//   });

function pad(value) {
    return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = pad(
        Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
}

const timer = {
    start() {
        const targetDate = new Date('08:00 Jul 05 2021');
		const headline = document.querySelector('.headline');
		headline.textContent=`до ${targetDate} осталось`;

        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = targetDate - currentTime;
            const { days, hours, mins, secs } = getTimeComponents(deltaTime);
            const time = getTimeComponents(deltaTime);

            updateClockface(refs, time);

            console.log(`${days}:${hours}:${mins}:${secs}`);
        }, 1000);
    },
};

timer.start();

const refs = {
    spanDays: document.querySelector('[data-value="days"]'),
    spanHours: document.querySelector('[data-value="hours"]'),
    spanMins: document.querySelector('[data-value="mins"]'),
    spanSecs: document.querySelector('[data-value="secs"]'),	
};

function updateClockface(
    { spanDays, spanHours, spanMins, spanSecs },
    { days, hours, mins, secs },
) {
    spanDays.textContent = `${days}`;
    spanHours.textContent = `${hours}`;
    spanMins.textContent = `${mins}`;
    spanSecs.textContent = `${secs}`;
}
