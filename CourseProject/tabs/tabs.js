import { Holidays } from "../holidays/holiday.js";

export class Tabs {
    #tabButtons;
    #tabContents;
    #buttonIntervals;
    #buttonHolidays;
    #tabIntervals;
    #tabHolidays;
    #holidays;

    constructor() {
        this.#tabButtons = document.querySelectorAll(".tab");
        this.#tabContents = document.querySelectorAll(".data-tab-content");

        this.#buttonIntervals = document.querySelector("#interval");
        this.#buttonHolidays = document.querySelector("#holidays");

        this.#tabIntervals = document.querySelector("#interval-tab");
        this.#tabHolidays = document.querySelector("#holidays-tab");

        this.#activateIntervalsTab();

        this.#buttonIntervals.addEventListener(
            "click",
            this.#activateIntervalsTab
        );
        this.#buttonHolidays.addEventListener(
            "click",
            this.#activateHolidaysTab
        );

        this.#holidays = new Holidays();
    }
    #deactivateTabs = () => {
        this.#tabContents.forEach((tabContent) => {
            tabContent.classList.remove("active");
        });

        this.#tabButtons.forEach((tab) => {
            tab.classList.remove("active");
        });
    };
    #activateIntervalsTab = () => {
        this.#deactivateTabs();

        this.#buttonIntervals.classList.add("active");
        this.#tabIntervals.classList.add("active");
    };
    #activateHolidaysTab = () => {
        this.#deactivateTabs();

        this.#buttonHolidays.classList.add("active");
        this.#tabHolidays.classList.add("active");

        this.#holidays.fillCountries();
    };
}
