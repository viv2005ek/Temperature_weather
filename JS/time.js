function dateAndTime() {
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    year = year % 100;

    let month = currentDate.getMonth() + 1;
    monthName = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    }

    let date = currentDate.getDate();
    let hours = currentDate.getHours();
    let timing;
    if (hours > 12) {
        hours -= 12;
        timing = "PM"
    } else {
        timing = "AM"
    }
    let minutes = currentDate.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[currentDate.getDay()];

    let dateTimeInHtml = document.querySelector(".content .leftContent .placeAndFontAwesome .placeDateTime p");

    dateTimeInHtml.innerHTML = `${hours}:${minutes} ${timing} - ${day}, ${date} ${monthName[month]} '${year}`;
}

dateAndTime();

setInterval(dateAndTime, 30000);