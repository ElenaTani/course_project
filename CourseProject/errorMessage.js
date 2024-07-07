export class ErrorMessage {
    #errorMessageContainer;
    constructor() {
        this.#errorMessageContainer = document.querySelector("#errorMessage");
    }
    showErrorMessage = (error) => {
        this.#errorMessageContainer.innerHTML = error;
        this.#errorMessageContainer.classList.add("active");

        setTimeout(() => {
            this.#errorMessageContainer.classList.remove("active");
        }, 3000);
    };
}
