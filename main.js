class CountdownTimer {
    constructor({ selector, targetDate, onTick }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.onTick = onTick;
    }

    start() {
        const targetDate = new Date('08:00 Jul 05 2021');
        const headline = document.querySelector('.headline');
        headline.textContent = `до ${targetDate} осталось`;

        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = targetDate - currentTime;
            const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);
            const time = this.getTimeComponents(deltaTime);

            this.onTick(time, refs);

            console.log(`${days}:${hours}:${mins}:${secs}`);
        }, 1000);
    }

	getTimeComponents(time) {
		const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
		const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
		const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
		const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
	
		return { days, hours, mins, secs };
	}

	pad(value) {
		return String(value).padStart(2, '0');
	}
	
}

const timer = new CountdownTimer({
    onTick: updateClockface,
});

timer.start();

const refs = {
    spanDays: document.querySelector('[data-value="days"]'),
    spanHours: document.querySelector('[data-value="hours"]'),
    spanMins: document.querySelector('[data-value="mins"]'),
    spanSecs: document.querySelector('[data-value="secs"]'),

	selector: document.querySelector('#timer-1'),
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
