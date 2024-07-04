"use strict";

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
        const tableRow = document.createElement("tr");
        table.appendChild(tableRow);
        const tableHeader1 = document.createElement("th");
        const tableHeader2 = document.createElement("th");
        tableRow.appendChild(tableHeader1);
        tableRow.appendChild(tableHeader2);
        tableHeader1.textContent = "Date";
        tableHeader2.textContent = "Holiday name";
        const buttonSort = document.createElement("button");
        buttonSort.innerHTML = "sort";
        tableHeader1.appendChild(buttonSort);

        holidays.forEach((holiday) => {
            const tableRow = document.createElement("tr");
            table.appendChild(tableRow);
            const tableData1 = document.createElement("td");
            const tableData2 = document.createElement("td");
            tableRow.appendChild(tableData1);
            tableRow.appendChild(tableData2);
            tableData1.textContent = this.#datesHelper.format(
                new Date(holiday.date.iso)
            );
            tableData2.textContent = holiday.name;
        });
        this.#holidaysArray = holidays;
        buttonSort.addEventListener("click", this.#sortTable)

    };
    #sortTable = () => {
        let sortUp = this.#sortUp;
        this.#holidaysArray.sort(function(a, b) {
            let dateA = new Date(a.date.iso);
            let dateB = new Date(b.date.iso);
            if (sortUp) {
                return dateB > dateA ? 1 : -1;
            } else {
                return dateB < dateA ? 1 : -1;
            }
        })
        this.#createTable(this.#holidaysArray);
        this.#sortUp = !sortUp;
    }
    addNewTable = (holidays) => {
        this.#createTable(holidays);
        this.#sortUp = true;
    }
}
