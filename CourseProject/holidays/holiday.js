"use strict";

import { CalendarAPI } from "./calendarAPI.js";

export class Holidays {
    #calendarAPI;
    #country;
    #year;
    constructor() {
        this.#calendarAPI = new CalendarAPI();
        this.#country = document.getElementById("country");
        this.#year = document.getElementById("year");

        this.#fillCountries();
        this.#fillYears();

        this.#country.addEventListener("change", this.#activateYear);
    }

    #fillCountries = async () => {
        const countries = await this.#calendarAPI.getCountries();

        for (let i = 0; i < countries.length; i++) {
            let option = document.createElement("OPTION");
            option.textContent =
                countries[i].country_name;
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
        this.#year.value = new Date().getFullYear();
    };

    #activateYear = () => {
        if (this.#country.value === "") {
            this.#year.setAttribute("disabled", "");
        } else {
            this.#year.removeAttribute("disabled");
        }
    }
}
