import { API_URL, API_KEY } from "./constants.js";

export class CalendarAPI {
    #apiKey;
    #apiUrl;
    constructor() {
        this.#apiKey = API_KEY;
        this.#apiUrl = API_URL;
    }
    getCountries = async () => {
        try {
            const response = await fetch(
                `${this.#apiUrl}/countries?api_key=${this.#apiKey}`
            );
            return (await response.json()).response.countries;
        } catch (error) {
            alert("Please wait a few minutes before you try again");
            throw error;
        }
    };

    getHolidays = async (countryValue, yearValue) => {
        try {
            const response = await fetch(
                `${this.#apiUrl}/holidays?&api_key=${this.#apiKey}&country=${
                    countryValue
                }&year=${yearValue}`
            );
            const holidays = (await response.json()).response.holidays;
            if (holidays === undefined) {
                throw new Error("No data");
            }
            return holidays;
        } catch (error) {
            alert("Please wait a few minutes before you try again");
            throw error;
        }
    };
}
