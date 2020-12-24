// ============================================================================
// Global Vairables
// =============================================================================

// jQuery element varaibles
var sunday = "#sunday";
var monday = "#monday";
var tuesday = "#tuesday";
var wednesday = "#wednesday";
var thursday = "#thursday";
var friday = "#friday";
var saturday = "#saturday";

var week = $("#week")
var save = $(".save")
var bored = $(".bored")
var textarea = $(".textSpace")
var quoteBtn = $("#quoteBtn")
var quoteText = $("#quoteText")

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
var weekViewed = 0; // TODO find current week of month and set on load

// load event list from local storage
function getEventsList() {
    eventsList = JSON.parse(localStorage.getItem("eventsList")) || [];
    // console.log("eventsList: ", eventsList);
}

// call on page load
getEventsList();

// fill month view with current month data from eventList
function fillMonth() {

    // TODO show month div
    // TODO hide week div
    // console.log("fillMonth() fires")
    // console.log("eventsList: ", eventsList)

    // put day number on each day of the month
    for(var i=0; i<getDaysInMonth(currentDate.getUTCMonth()+1, currentDate.getUTCFullYear()); i++){
        $("#monthDay" + (i+getFirstDayOfMonth())).text(i+1)
    }

    // loop through each event
    for (var i = 0; i < eventsList.length; i++) {

        var tempDate = new Date(eventsList[i].eventDate)


        // console.log("tempDate", tempDate, typeof tempDate)
        // console.log(`checking: ${(tempDate.getUTCMonth() + 1)} == ${monthViewed} && ${tempDate.getFullYear()} == ${yearViewed}`)
        // console.log(eventsList[i].eventDescription);

        // if event belongs in current month - display on month grid
        if (tempDate.getUTCMonth() + 1 === monthViewed && tempDate.getFullYear() == yearViewed) {
            // console.log("Event Found!", eventsList[i].eventDescription);
            // console.log(`finding #monthDay${getFirstDayOfMonth() + tempDate.getUTCDate()}`);
            // console.log(`getFirstDayOfMonth(): ${getFirstDayOfMonth()} getDate(): ${tempDate.getDate()}`);
            $("#monthDay" + (tempDate.getDate()+1)).append(eventsList[i].eventDescription);
        }
    }

}

// call on page load
fillMonth();

// fill week view with current week data from eventList
function fillWeek() {
    // TODO
}

// call on page load
fillWeek();

// fill day view with current day data from eventList
function fillDay(){
    // TODO
} 

// call on page load
fillDay();


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

    
    console.log("addEventButton() fires ", eventObj)

    eventsList.push(eventObj);

    localStorage.setItem("eventsList", JSON.stringify(eventsList));
    getEventsList();

    eventDate.val("");
    startTime.val("");
    endTime.val("");
    eventDescription.val("");

    fillMonth();
})

// event listner function for clicking quote
quoteBtn.on("click", function () {
    // console.log("pail")
    getQuoteApi(setQuote);
})

// a function for clicking save
save.on("click", function () {
    // console.log("jack")
    // take the data-day value
    var thisDay = $(this).attr("data-day");
    // take the input value
    var dayText = $(`#${thisDay}`).val()
    // console.log(dayText)
    // console.log(thisDay);
    // store them both to local storage
    localStorage.setItem(thisDay, dayText)
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
function getFirstDayOfMonth() {
    var year = currentDate.getFullYear();
    var day = new Date(year + "-" + monthViewed + "-01").getDay()+1;

    // console.log(`add ${day} days to first of month`);

    return day;
}

// returns number of days in selected month
function getDaysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
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