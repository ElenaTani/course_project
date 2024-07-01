"use strict";

export class DatesHelper {
    format = function(date) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        return yyyy + "-" + mm + "-" + dd;
    }

    addWeek = function(date) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 6);
        return newDate;
    }

    addMonth = function(date) {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + 1);
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
    }
    
    getAlldaysCount = function (startDate, endDate) {

        startDate.setHours(0,0,0,1);
        endDate.setHours(23,59,59,999);
        const oneDay = 24 * 60 * 60 * 1000;
        const countDays = Math.round((endDate - startDate) / oneDay);
        return countDays;
    }

    getweekDayCount = function (startDate, endDate) {
        let count = 0;
        const curDate = new Date(startDate.getTime());
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }

    getweekEndCount = function (startDate, endDate) {
        let count = 0;
        const curDate = new Date(startDate.getTime());
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if(dayOfWeek == 0 || dayOfWeek == 6) count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }
}
