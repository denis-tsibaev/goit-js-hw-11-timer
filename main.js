class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.start();
    }

    useMarkup() {
        const selectorELement = document.querySelector(this.selector);

        const spanDays = selectorELement.querySelector('[data-value="days"]');
        const spanHours = selectorELement.querySelector('[data-value="hours"]');
        const spanMins = selectorELement.querySelector('[data-value="mins"]');
        const spanSecs = selectorELement.querySelector('[data-value="secs"]');

        return { spanDays, spanHours, spanMins, spanSecs };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(
            Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        const mins = this.pad(
            Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
        );
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }

    start() {
        const targetTime = this.targetDate.getTime();
        const markup = this.useMarkup();
        const headline = document.querySelector('.headline');
        headline.textContent = `до ${
            this.targetDate.getDate() +
            '-' +
            (this.targetDate.getMonth() + 1) +
            '-' +
            this.targetDate.getFullYear()
        } осталось`;

        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = targetTime - currentTime;
            const deadlineTime = this.getTimeComponents(deltaTime);
            this.updateClockface(markup, deadlineTime);

            console.log(deadlineTime);
        }, 1000);
    }

    updateClockface(
        { spanDays, spanHours, spanMins, spanSecs },
        { days, hours, mins, secs },
    ) {
        spanDays.textContent = `${days}`;
        spanHours.textContent = `${hours}`;
        spanMins.textContent = `${mins}`;
        spanSecs.textContent = `${secs}`;
    }
}

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('July 05, 2021'),
});
