"use strict";

import { DatesHelper } from "./datesHelper.js"; 

export class IntervalResults {
    #datesHelper;
    constructor () {
        this.#datesHelper = new DatesHelper();
        this.#fillTable();
    }
    add = function(firstDate, secondDate, result) {

        const results = localStorage.getItem('results') !== null
        ? JSON.parse(localStorage.getItem('results')) : [];

        if (results.length >= 10) {
            results.shift();
        };

        const firstDateFormatted = this.#datesHelper.format(firstDate);
        const secondDateFormatted = this.#datesHelper.format(secondDate);
        const data = [];
        data.push(firstDateFormatted, secondDateFormatted, result);
        results.push(data);
        
        localStorage.setItem('results', JSON.stringify(results));
        this.#fillTable();
    }

    #fillTable = function() {
        const table = document.querySelector("#resultTable");

        let results = localStorage.getItem('results') !== null
        ? JSON.parse(localStorage.getItem('results')) : [];

        const tableRowRemove = document.querySelectorAll(".tableRow");
        tableRowRemove.forEach(el => el.remove());

        results.forEach((result) => {
            const tableRow = document.createElement("tr");
            tableRow.classList.add("tableRow");
            const tableData1 = document.createElement("td");
            const tableData2 = document.createElement("td");
            const tableData3 = document.createElement("td");
            table.appendChild(tableRow);
            tableRow.appendChild(tableData1);   
            tableRow.appendChild(tableData2);   
            tableRow.appendChild(tableData3);   
            tableData1.textContent = result[0];
            tableData2.textContent = result[1];
            tableData3.textContent = result[2];
        })
    }
}
