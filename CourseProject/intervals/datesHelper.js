"use strict";

export class DatesHelper {
    format = function (date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        return year + "-" + month + "-" + day;
    };

    addWeek = function (date) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 6);
        return newDate;
    };

    addMonth = function (date) {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + 1);
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
    };

    getAlldaysCount = function (startDate, endDate) {
        startDate.setHours(0, 0, 0, 1);
        endDate.setHours(23, 59, 59, 999);
        const oneDay = 24 * 60 * 60 * 1000;
        const countDays = Math.round((endDate - startDate) / oneDay);
        return countDays;
    };

    getWeekDayCount = function (startDate, endDate) {
        let count = 0;
        const curDate = new Date(startDate.getTime());
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                count++;
            }
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    };

    getWeekEndCount = function (startDate, endDate) {
        let count = 0;
        const curDate = new Date(startDate.getTime());
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if (dayOfWeek == 0 || dayOfWeek == 6) {
                count++;
            }
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    };
}
