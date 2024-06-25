import { API_URL, API_KEY } from "./constants.js";

export class CalendarAPI {
    #apiKey;
    #apiUrl;
    constructor() {
        this.#apiKey = API_KEY;
        this.#apiUrl = API_URL;
    }
    getCountries = async () => {
        const response = await fetch(
            `${this.#apiUrl}/countries?api_key=${this.#apiKey}`
        );
        return (await response.json()).response.countries;
    };
}
