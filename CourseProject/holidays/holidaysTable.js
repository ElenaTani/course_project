import { DatesHelper } from "../intervals/datesHelper.js";

export class HolidaysTable {
    #datesHelper;
    #holidaysArray;
    #sortUp;
    constructor() {
        this.#datesHelper = new DatesHelper();
    }

    #createTable = (holidays) => {
        const tableContainer = document.querySelector("#table-container");
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        tableContainer.appendChild(table);
        table.classList.add("table");
        table.classList.add("table-hover");
        table.appendChild(this.#generateTableHeader());
        table.appendChild(this.#generateTableBody(holidays));
        this.#holidaysArray = holidays;
    };
    #generateTableHeader = () => {
        const thead = document.createElement("thead");
        const tableRow = document.createElement("tr");
        thead.appendChild(tableRow);
        const tableHeader1 = document.createElement("th");
        const tableHeader2 = document.createElement("th");
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        tableHeader1.textContent = "Date";
        tableHeader2.textContent = "Holiday name";
        const buttonSort = document.createElement("button");
        buttonSort.innerHTML = "sort";
        buttonSort.classList.add("btn");
        buttonSort.classList.add("btn-outline-primary");
        tableHeader1.appendChild(buttonSort);
        buttonSort.addEventListener("click", this.#sortTable);
        return thead;
    };

    #generateTableBody = (holidays) => {
        const tbody = document.createElement("tbody");

        holidays.forEach((holiday) => {
            const tableRow = document.createElement("tr");
            tbody.appendChild(tableRow);
            const tableData1 = document.createElement("td");
            const tableData2 = document.createElement("td");
            tableRow.appendChild(tableData1);
            tableRow.appendChild(tableData2);
            tableData1.textContent = this.#datesHelper.format(
                new Date(holiday.date.iso)
            );
            tableData2.textContent = holiday.name;
        });
        return tbody;
    };
    #sortTable = () => {
        let sortUp = this.#sortUp;
        this.#holidaysArray.sort(function (a, b) {
            let dateA = new Date(a.date.iso);
            let dateB = new Date(b.date.iso);
            if (sortUp) {
                return dateB > dateA ? 1 : -1;
            } else {
                return dateB < dateA ? 1 : -1;
            }
        });
        this.#createTable(this.#holidaysArray);
        this.#sortUp = !sortUp;
    };
    addNewTable = (holidays) => {
        this.#createTable(holidays);
        this.#sortUp = true;
    };
}
