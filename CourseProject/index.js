"use strict";

const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".data-tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(
            tab.dataset.tabTarget
        );
        tabContents.forEach(tabContent => {
            tabContent.classList.remove("active");
        })
        tabs.forEach(tab => {
            tab.classList.remove("active");
        })
        tab.classList.add("active")
        target.classList.add("active");
    })
})

const date1 = document.querySelector("#date1");
const date2 = document.querySelector("#date2");

date1.addEventListener("change", () => {
    console.log(date1.value)
    if (date1.value === "") {
        date2.disabled = true;
    } else {
        date2.disabled = false;
    }
    date2.setAttribute("min", date1.value)
})
