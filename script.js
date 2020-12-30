// ============================================================================
// Global Vairables
// =============================================================================

// jQuery element varaibles
var dayViewEvent = $("#dayViewEvent");
var timeInterval = $("#timeInterval");
var week = $("#week")
var save = $(".save")
var bored = $(".bored")
var textarea = $(".textSpace")
var quoteBtn = $("#quoteBtn")
var quoteText = $("#quoteText")

var weekTitle = $("#weekTitle");
var monthTitle = $("#monthTitle");

// form variables
var eventDate = $("#inputDate");
var startTime = $("#inputStartTime");
var endTime = $("#inputEndTime");
var eventDescription = $("#textAreaEventDescription");



// today's exact date and time
var currentDate = new Date();

// user's master event list from localStorage
var eventsList;

// =====================================================================================
// Page setup
// =====================================================================================

// setup time picker elements
$(document).ready(function () {
    $('.timepicker').timepicker();
});

// current view settings
var yearViewed = currentDate.getUTCFullYear();
var monthViewed = currentDate.getUTCMonth() + 1;
var weekViewed = getWeekNumber();
var dayViewed = currentDate.getUTCDate();

// load event list from local storage
function getEventsList() {
    eventsList = JSON.parse(localStorage.getItem("eventsList")) || [];
    // console.log("eventsList: ", eventsList);
}

// call on page load
getEventsList();

// fill month view with current month data from eventList
function fillMonth() {

    // console.log("fillMonth() fires")

    monthTitle.text(`${getMonthName(monthViewed)} ${yearViewed}`);

    // put day number on each day of the month
    for (var i = 0; i < getDaysInMonth(currentDate.getUTCMonth() + 1, currentDate.getUTCFullYear()); i++) {
        $("#monthDay" + (i + getFirstDayOfMonth())).text(i + 1)
    }

    // loop through each event
    for (var i = 0; i < eventsList.length; i++) {

        var tempDate = new Date(eventsList[i].eventDate)

        // if event belongs in current month - display on month grid
        if (tempDate.getUTCMonth() + 1 === monthViewed && tempDate.getFullYear() == yearViewed) {

            $("#monthDay" + (tempDate.getDate() + 1)).append(monthViewElement(eventsList[i]));
        }
    }

}

// call on page load
fillMonth();

// fill week view with current week data from eventList
function fillWeek() {
    // console.log("fillWeek() fires")

    for (var i = 0; i < eventsList.length; i++) {
        var eventDate = new Date(eventsList[i].eventDate);

        if (eventDate.getUTCMonth() + 1 === monthViewed && eventDate.getUTCFullYear() === eventDate.getUTCFullYear() && getWeekNumber(eventDate) === weekViewed) {
            var weekDay = $("#weekDay" + (((getFirstDayOfMonth(eventDate) + eventDate.getUTCDate()) % 7) - 1));
            weekDay.append(weekViewElement(eventsList[i]));
        }
    }

    weekTitle.text(`${getMonthName(monthViewed)} ${yearViewed} Week ${weekViewed}`);
}

// call on page load
fillWeek();

// fill day view with current day data from eventList
function fillDay() {

    for (var i = 0; i < eventsList.length; i++) {

        var tempDate = new Date(eventsList[i].eventDate)
        console.log(`${tempDate.getUTCDate()} === ${dayViewed}`)
        console.log(tempDate.getUTCMonth() + 1 === monthViewed)
        console.log(tempDate.getUTCFullYear() === yearViewed)
        if (tempDate.getUTCDate() === dayViewed && tempDate.getUTCMonth() + 1 === monthViewed && tempDate.getUTCFullYear() === yearViewed) {
            dayViewEvent.append(dayViewElement(eventsList[i]));
        }
    }
}

// call on page load
fillDay();

function monthViewElement(eventObj) {
    console.log("attempting to add event to month", eventObj)

    var span = $("<span>");
    span.addClass("monthEvent");
    span.css("width", getPercentOfDay(getDuration(eventObj)) + "%")
    span.css("left", getPercentOfDay(convertHours(eventObj.startTime)) + "%")

    return span;
}

function weekViewElement(eventObj) {

    console.log("attempting to display event", eventObj)

    var event = $("<div>");
    event.addClass("event");

    event.css("height", getPercentOfDay(getDuration(eventObj)) + "%");
    event.css("top", getPercentOfDay(convertHours(eventObj.startTime)) + "%");

    event.text(eventObj.eventDescription.substring(0, 20))
    if (eventObj.eventDescription.length > 20) {
        event.append("...");
    }



    return event;
}

function dayViewElement(eventObj) {

    console.log("attempting to display event", eventObj)

    var event = $("<div>");
    event.addClass("event");

    event.css("height", getPercentOfDay(getDuration(eventObj)) + "%");
    event.css("top", getPercentOfDay(convertHours(eventObj.startTime)) + "%");

    $("<h4>").text(eventObj.eventDescription).appendTo(event);

    $("<strong>").text("Start Time: ").appendTo(event);
    $("<span>").text(eventObj.startTime).appendTo(event);
    $("<br>").appendTo(event);
    $("<strong>").text("End Time: ").appendTo(event);
    $("<span>").text(eventObj.endTime).appendTo(event);
    $("<br>").appendTo(event);



    return event;
}

function setTimeScale() {
    for (var i = 0; i <= 24; i++) {
        var divider = $("<div>").addClass("timeDivider").css("top", ((i / 24) * 100) + "%");
        var label = $("<span>").addClass("dividerLabel").text(toTwelveHour(i)).appendTo(divider);
        timeInterval.append(divider);
    }
}

setTimeScale();

// =====================================================================================
// Page functions
// =====================================================================================

// event listener for adding event
$("#addEventBtn").click(function () {

    var oldDate = new Date(eventDate.val());
    var newDate = new Date(oldDate.getTime() + (60000 * oldDate.getTimezoneOffset()));

    // console.log("attempting to set new date")
    // console.log(oldDate.getTime(), 60000, oldDate.getTimezoneOffset());
    // console.log("newDate: ", newDate)

    currentDate = new Date();
    var eventObj = {
        eventCreated: currentDate,
        eventDate: newDate,
        startTime: startTime.val(),
        endTime: endTime.val(),
        eventDescription: eventDescription.val()
    }


    // console.log("addEventButton() fires ", eventObj)

    eventsList.push(eventObj);

    localStorage.setItem("eventsList", JSON.stringify(eventsList));
    getEventsList();

    eventDate.val("");
    startTime.val("");
    endTime.val("");
    eventDescription.val("");

    fillMonth();
    fillWeek();
    fillDay();
})

// event listner function for clicking quote
quoteBtn.on("click", function () {
    // console.log("pail")
    getQuoteApi(setQuote);
})

// a function for clicking bored
bored.on("click", function () {
    // console.log("jill")

})

// display quote on page
function setQuote(textObj) {
    quoteText.text(textObj.text + " - " + textObj.author)
};

// =====================================================================================
// Helper functions
// =====================================================================================

// returns day of week as an integer for first day of month
// sunday: 0 - saturday 6
// needed to position all days in month view
function getFirstDayOfMonth(date = currentDate) {
    var year = date.getFullYear();
    var day = new Date(year + "-" + monthViewed + "-01").getDay() + 1;

    // console.log(`add ${day} days to first of month`);

    return day;
}

// returns number of days in selected month
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function getMonthName(num) {
    console.log(num)
    switch (num) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September"
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
    }
    return "oops!";
}

// returns current week number 0-4
function getWeekNumber(date = currentDate) {
    date = new Date(date);
    var cellNumber = getFirstDayOfMonth() - 1 + date.getUTCDate();

    var weekNumber = Math.floor(cellNumber / 7);

    return weekNumber;
}

function getDuration(eventObj) {

    return convertHours(eventObj.endTime) - convertHours(eventObj.startTime)

}

function convertHours(str) {
    var intTime = 0;

    var time = str.replace(" ", ":");

    var timeArr = time.split(":");

    intTime += parseInt(timeArr[0]);

    intTime += parseInt(timeArr[1]) / 60;

    if (timeArr[2] === "PM") {
        intTime += 12;
    }

    return intTime;
}

function getPercentOfDay(num) {
    return (num / 24) * 100;
}

function toTwelveHour(num) {
    var result = "";
    if (num === 24 || num === 0) {
        result = "12:00 AM"
    } else if (num > 12) {
        num -= 12;
        result += num + ":00 PM";
    } else if (num === 12) {
        result = "12:00 PM"
    } else {
        result += num + ":00 AM";
    }
    return result;
}

// ===================================================================================
// Old functions
// ===================================================================================
// $(`#sun`).val(localStorage.getItem("sun"))
// $(`#mon`).val(localStorage.getItem("mon"))
// $(`#tues`).val(localStorage.getItem("tues"))
// $(`#wed`).val(localStorage.getItem("wed"))
// $(`#thurs`).val(localStorage.getItem("thurs"))
// $(`#fri`).val(localStorage.getItem("fri"))
// $(`#sat`).val(localStorage.getItem("sat"))

// a function for clicking a textarea
// textarea.on("click", function () {


// })

// // a function for clicking save
// save.on("click", function () {
//     // console.log("jack")
//     // take the data-day value
//     var thisDay = $(this).attr("data-day");
//     // take the input value
//     var dayText = $(`#${thisDay}`).val()
//     // console.log(dayText)
//     // console.log(thisDay);
//     // store them both to local storage
//     localStorage.setItem(thisDay, dayText)
// })

// var sunday = "#sunday";
// var monday = "#monday";
// var tuesday = "#tuesday";
// var wednesday = "#wednesday";
// var thursday = "#thursday";
// var friday = "#friday";
// var saturday = "#saturday";