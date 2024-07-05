
import { CalendarAPI } from "./calendarAPI.js";
import { HolidaysTable } from "./holidaysTable.js";

export class Holidays {
    #calendarAPI;
    #holidaysTable;
    #country;
    #year;
    #getHolidays;
    
    constructor() {
        this.#calendarAPI = new CalendarAPI();
        this.#holidaysTable = new HolidaysTable();
        this.#country = document.getElementById("country");
        this.#year = document.getElementById("year");
        this.#getHolidays = document.querySelector("#getHolidays");
        
        this.#fillYears();

        this.#country.addEventListener("change", this.#activateYear);
        this.#getHolidays.addEventListener("click", this.#showHolidays);
    }

    fillCountries = async () => {
        const countries = await this.#calendarAPI.getCountries();

        for (let i = 0; i < countries.length; i++) {
            let option = document.createElement("OPTION");
            option.textContent = countries[i].country_name;
            option.value = countries[i]["iso-3166"];
            this.#country.appendChild(option);
        }
    };

    #fillYears = () => {
        for (let i = 2001; i <= 2049; i++) {
            const option = document.createElement("OPTION");
            option.textContent = i;
            option.value = i;
            this.#year.appendChild(option);
        }
        this.#year.value = (new Date()).getFullYear();
    };

    #activateYear = () => {
        if (this.#country.value === "") {
            this.#year.setAttribute("disabled", "");
        } else {
            this.#year.removeAttribute("disabled");
        }
    };
    #showHolidays = async () => {
        const holidays = await this.#calendarAPI.getHolidays(
            this.#country.value,
            this.#year.value
        );
        this.#holidaysTable.addNewTable(holidays);
    };
}
