import { CalendarAPI } from "./calendarAPI.js";
import { HolidaysTable } from "./holidaysTable.js";
import {
    START_YEAR,
    END_YEAR,
    COUNTRIES_LOADING_ERROR,
    HOLIDAYS_LOADING_ERROR,
} from "../constants.js";
import { ErrorMessage } from "../errorMessage.js";

export class Holidays {
    #calendarAPI;
    #holidaysTable;
    #country;
    #year;
    #getHolidays;
    #errorMessage;
    #countriesNotLoaded;
    constructor() {
        this.#calendarAPI = new CalendarAPI();
        this.#holidaysTable = new HolidaysTable();
        this.#errorMessage = new ErrorMessage();
        this.#country = document.getElementById("country");
        this.#year = document.getElementById("year");
        this.#getHolidays = document.querySelector("#getHolidays");

        this.#fillYears();
        this.#countriesNotLoaded = true;

        this.#country.addEventListener("change", this.#activateYear);
        this.#getHolidays.addEventListener("click", this.#showHolidays);
    }

    fillCountries = async () => {
        if (!this.#countriesNotLoaded) {
            return;
        }
        try {
            const countries = await this.#calendarAPI.getCountries();

            this.#country.removeAttribute("disabled");

            for (let i = 0; i < countries.length; i++) {
                let option = document.createElement("OPTION");
                option.textContent = countries[i].country_name;
                option.value = countries[i]["iso-3166"];
                this.#country.appendChild(option);
            }
            this.#countriesNotLoaded = false;
        } catch (error) {
            this.#errorMessage.showErrorMessage(COUNTRIES_LOADING_ERROR);
        }
    };

    #fillYears = () => {
        for (let i = START_YEAR; i <= END_YEAR; i++) {
            const option = document.createElement("OPTION");
            option.textContent = i;
            option.value = i;
            this.#year.appendChild(option);
        }
        this.#year.value = new Date().getFullYear();
    };

    #activateYear = () => {
        if (this.#country.value === "") {
            this.#year.setAttribute("disabled", "");
        } else {
            this.#year.removeAttribute("disabled");
        }
    };
    #showHolidays = async () => {
        try {
            const holidays = await this.#calendarAPI.getHolidays(
                this.#country.value,
                this.#year.value
            );
            this.#holidaysTable.addNewTable(holidays);
        } catch (error) {
            this.#errorMessage.showErrorMessage(HOLIDAYS_LOADING_ERROR);
        }
    };
}
