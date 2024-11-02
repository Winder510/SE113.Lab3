function isValidDate(year, month, day) {
    if (month < 1 || month > 12) {
        return false;
    }

    if (day < 1) {
        return false;
    }

    const maxDay = DaysInMonth(year, month);

    if (day > maxDay) {
        return false;
    }

    return true;
}

isValidDate(32, 3, 2009);

function DaysInMonth(year, month) {
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        return 31;
    }

    if ([4, 6, 9, 11].includes(month)) {
        return 30;
    }

    if (month === 2) {
        if ((year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0)) {
            return 29;
        } else {
            return 28;
        }
    }

    return 0;
}
module.exports = {
    isValidDate,
    DaysInMonth
};