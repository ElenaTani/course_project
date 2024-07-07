import { DatesHelper } from "./datesHelper.js";

import { IntervalResults } from "./intervalResults.js";

export class Intervals {
    #dateInput1;
    #dateInput2;
    #week;
    #month;
    #selectDays;
    #selectIntervals;
    #output;
    #datesHelper;
    #calcResult;
    #intervalResults;
    constructor() {
        this.#dateInput1 = document.querySelector("#date1");
        this.#dateInput2 = document.querySelector("#date2");

        this.#week = document.querySelector(".week");
        this.#month = document.querySelector(".month");

        this.#datesHelper = new DatesHelper();

        this.#calcResult = document.querySelector("#calcResult");

        this.#selectDays = document.querySelector("#selectDays");
        this.#selectIntervals = document.querySelector("#selectIntervals");
        this.#output = document.querySelector("#output");
        this.#intervalResults = new IntervalResults();

        this.#dateInput1.addEventListener("change", this.#enableFinalDate);

        this.#week.addEventListener("click", this.#weekPreset);
        this.#month.addEventListener("click", this.#monthPreset);

        this.#calcResult.addEventListener("click", this.#calculate);
    }

    #enableFinalDate = () => {
        if (this.#dateInput1.value === "") {
            this.#dateInput2.setAttribute("disabled", "");
        } else {
            this.#dateInput2.removeAttribute("disabled");
        }
        this.#dateInput2.setAttribute("min", this.#dateInput1.value);
    };
    #weekPreset = () => {
        let date1;
        if (this.#dateInput1.value === "") {
            date1 = new Date();
            this.#dateInput1.value = this.#datesHelper.format(date1);
        } else {
            date1 = new Date(this.#dateInput1.value);
        }
        const date2 = this.#datesHelper.addWeek(date1);

        this.#dateInput2.value = this.#datesHelper.format(date2);
        this.#dateInput2.removeAttribute("disabled");
    };
    #monthPreset = () => {
        let date1;
        if (this.#dateInput1.value === "") {
            date1 = new Date();
            this.#dateInput1.value = this.#datesHelper.format(date1);
        } else {
            date1 = new Date(this.#dateInput1.value);
        }
        const date2 = this.#datesHelper.addMonth(date1);

        this.#dateInput2.value = this.#datesHelper.format(date2);
        this.#dateInput2.removeAttribute("disabled");
    };
    #calculate = () => {
        if (!this.#dateInput1.value || !this.#dateInput2.value) {
            return;
        }
        const firstDate = new Date(this.#dateInput1.value);
        const secondDate = new Date(this.#dateInput2.value);

        let numberOfDays;

        switch (this.#selectDays.value) {
            case "alldays":
                numberOfDays = this.#datesHelper.getAlldaysCount(
                    firstDate,
                    secondDate
                );
                break;
            case "weekdays":
                numberOfDays = this.#datesHelper.getWeekDayCount(
                    firstDate,
                    secondDate
                );
                break;
            default:
                numberOfDays = this.#datesHelper.getWeekEndCount(
                    firstDate,
                    secondDate
                );
        }

        let output;
        switch (this.#selectIntervals.value) {
            case "days":
                output = numberOfDays;
                break;
            case "hours":
                output = numberOfDays * 24;
                break;
            case "minutes":
                output = numberOfDays * 24 * 60;
                break;
            default:
                output = numberOfDays * 24 * 60 * 60;
        }
        this.#output.textContent = output;

        this.#intervalResults.addCalculationResult(
            firstDate,
            secondDate,
            output
        );
    };
}
