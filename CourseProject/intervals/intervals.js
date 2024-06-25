"use strict";

export class Intervals {
    #date1;
    #date2;
    constructor() {
        this.#date1 = document.querySelector("#date1");
        this.#date2 = document.querySelector("#date2");

        this.#date1.addEventListener("change", this.#conditionOfChoosingDate2)
    }

    #conditionOfChoosingDate2 = () => {
        console.log(this.#date1.value)
        if (this.#date1.value === "") {
            this.#date2.setAttribute("disabled", "");
        } else {
            this.#date2.removeAttribute("disabled");
        }
        this.#date2.setAttribute("min", this.#date1.value)
    }
}




