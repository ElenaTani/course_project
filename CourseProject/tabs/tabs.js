"use strict";

export class Tabs {
    #tabButtons;
    #tabContents;
    #buttonsContainer;
    constructor() {
        this.#tabButtons = document.querySelectorAll(".tab");
        this.#tabContents = document.querySelectorAll(".data-tab-content");
        this.#buttonsContainer = document.querySelector(".tabs");

        this.#buttonsContainer.addEventListener("click", this.#handleButtonClick);
    }
    #handleButtonClick = (event) => {
        const button = event.target;

        if (button.tagName !== "BUTTON") {
            return;
        }

        const tab = document.querySelector(button.dataset.tabTarget);

        this.#tabContents.forEach((tabContent) => {
            tabContent.classList.remove("active");
        });
        this.#tabButtons.forEach((tab) => {
            tab.classList.remove("active");
        });
        button.classList.add("active");
        tab.classList.add("active");
    }
}
