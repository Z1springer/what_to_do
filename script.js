// ============================================================================
// Global Vairables
// =============================================================================

// jQuery element varaibles
var timeInterval = $("#timeInterval");
var day = $("#dayView");
var dayViewEvent = $("#dayViewEvent");
var front = $("#frontPage")
var month = $("#monthView")
var save = $(".save")
var bored = $(".bored")
var textarea = $(".textSpace")
var quoteBtn = $("#quoteBtn")
var quoteText = $("#quoteText")
var quoteAuthor = $("#quoteAuthor")

// buttons
var dayButton = $(".goDay")
var frontButton = $(".goWeek")
var monthButton = $(".goMonth")

var weekTitle = $("#weekTitle");
var monthTitle = $("#monthTitle");

// form variables
var eventDate = $("#inputDate");
var startTime = $("#inputStartTime");
var endTime = $("#inputEndTime");
var eventDescription = $("#textAreaEventDescription");

// event color codes
var color0 = "linear-gradient(to bottom right, hsl(350deg, 100%, 87.6%) 65%, hsl(350deg, 100%, 94.4%)";
var color1 = "linear-gradient(to bottom right, hsl(28deg, 100%, 86.3%) 65%, hsl(28deg, 100%, 94.3%))";
var color2 = "linear-gradient(to bottom right, hsl(60deg, 80%, 90.2%) 65%, hsl(60deg, 80%, 96.2%)";
var color3 = "linear-gradient(to bottom right, hsl(120deg, 92.5%, 79%) 65%, hsl(120deg, 92.5%, 87%)";
var color4 = "linear-gradient(to bottom right, hsl(180deg, 64.9%, 81%) 65%, hsl(180deg, 64.9%, 89%)";
var color5 = "linear-gradient(to bottom right, hsl(214deg, 41.1%, 78%) 65%, hsl(214deg, 41.1%, 89%)";

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
    $('.datepicker').datepicker();
});

// current view settings
var yearViewed = currentDate.getFullYear();
var monthViewed = currentDate.getMonth() + 1;
var weekViewed = getWeekNumber();
var dayViewed = currentDate.getDate();

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
    for (var i = 0; i < getDaysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear()); i++) {
        $("#monthDay" + (i + getFirstDayOfMonth())).text(i + 1)
    }

    // loop through each event
    for (var i = 0; i < eventsList.length; i++) {

        var tempDate = new Date(eventsList[i].eventDate)

        // if event belongs in current month - display on month grid
        if (tempDate.getMonth() + 1 === monthViewed && tempDate.getFullYear() == yearViewed) {

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

        if (eventDate.getMonth() + 1 === monthViewed && eventDate.getFullYear() === eventDate.getFullYear() && getWeekNumber(eventDate) === weekViewed) {
            var weekDay = $("#weekDay" + (((getFirstDayOfMonth(eventDate) + eventDate.getDate()) % 7) - 1));
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
        if (tempDate.getDate() === dayViewed && tempDate.getMonth() + 1 === monthViewed && tempDate.getFullYear() === yearViewed) {
            dayViewEvent.append(dayViewElement(eventsList[i]));
            console.log("Attempting to add event to day view")
        }
    }
}

// call on page load
fillDay();

function monthViewElement(eventObj) {
    // console.log("attempting to add event to month", eventObj)

    var span = $("<span>");
    span.addClass("monthEvent");
    span.css("width", getPercentOfDay(getDuration(eventObj)) + "%")
    span.css("left", getPercentOfDay(convertHours(eventObj.startTime)) + "%")
    span.css("background-image", getColor(eventObj.category));

    return span;
}

function weekViewElement(eventObj) {

    console.log("attempting to display event", eventObj)

    var event = $("<div>");
    event.addClass("event");


    event.css("height", (getPercentOfDay(getDuration(eventObj)) - 0.5) + "%");
    event.css("top", getPercentOfDay(convertHours(eventObj.startTime)) + "%");
    event.css("background-image", getColor(eventObj.category));

    var textBox = $("<div>");
    textBox.addClass("eventTextBox");
    textBox.css("padding", "0 5px")
    textBox.text(eventObj.eventDescription.substring(0, 20))
    if (eventObj.eventDescription.length > 20) {
        textBox.append("...");
    }

    textBox.append(" - " + eventObj.category);

    event.append(textBox);

    return event;
}

function dayViewElement(eventObj) {

    console.log("attempting to display event", eventObj)

    var event = $("<div>");
    event.addClass("event");

    event.css("height", getPercentOfDay(getDuration(eventObj)) + "%");
    event.css("top", getPercentOfDay(convertHours(eventObj.startTime)) + "%");
    event.css("background-image", getColor(eventObj.category));

    var textBox = $("<div>");
    textBox.addClass("eventTextBox");

    $("<h4>").text(eventObj.eventDescription).appendTo(textBox);

    $("<strong>").text("Start Time: ").appendTo(textBox);
    $("<span>").text(eventObj.startTime).appendTo(textBox);
    $("<br>").appendTo(textBox);
    $("<strong>").text("End Time: ").appendTo(textBox);
    $("<span>").text(eventObj.endTime).appendTo(textBox);
    $("<br>").appendTo(textBox);

    textBox.appendTo(event);

    return event;
}

function setTimeScale() {
    for (var i = 0; i <= 24; i++) {
        var divider = $("<div>").addClass("timeDivider").css("top", ((i / 24) * 100) + "%");
        $("<span>").addClass("dividerLabel").text(toTwelveHour(i)).appendTo(divider);
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

    var selectedCategory = $("input:radio[name='group1']:checked").val();

    currentDate = new Date();
    var eventObj = {
        eventCreated: currentDate,
        eventDate: newDate,
        startTime: startTime.val(),
        endTime: endTime.val(),
        eventDescription: eventDescription.val(),
        category: selectedCategory
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
    quoteText.text(textObj.text)
    quoteAuthor.text(" - " + textObj.author)
};

dayButton.on("click", function () {
    console.log("day")
    day.attr("style", "display: block;")
    front.attr("style", "display: none;")
    month.attr("style", "display: none;")
})
monthButton.on("click", function () {
    console.log("month")
    day.attr("style", "display: none;")
    front.attr("style", "display: none;")
    month.attr("style", "display: block;")
})
frontButton.on("click", function () {
    console.log("front")
    day.attr("style", "display: none;")
    front.attr("style", "display: block;")
    month.attr("style", "display: none;")
})
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
    var cellNumber = getFirstDayOfMonth() - 1 + date.getDate();

    var weekNumber = Math.floor(cellNumber / 7);

    return weekNumber;
}

function getDuration(eventObj) {

    return convertHours(eventObj.endTime) - convertHours(eventObj.startTime)

}

function convertHours(str) {

    console.log(`convertHours(${str}) fires`);

    var intTime = 0;

    var time = str.replace(" ", ":");

    var timeArr = time.split(":");

    intTime += parseInt(timeArr[0]);
    intTime += parseInt(timeArr[1]) / 60;

    if (timeArr[2] === "PM" && timeArr[0] != 12) {
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

function getColor(str) {
    switch (str) {
        case "work":
            return color0;
        case "school":
            return color1;
        case "personal":
            return color2;
        case "spiritual":
            return color3;
        case "family":
            return color4;
        case "chores":
            return color5;
    }
    return color0;
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