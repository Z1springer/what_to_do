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

function weekViewElement(eventObj){

    var event = $("<div>");
    event.addClass();




}


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
    for(var i=0; i<getDaysInMonth(currentDate.getUTCMonth()+1, currentDate.getUTCFullYear()); i++){
        $("#monthDay" + (i+getFirstDayOfMonth())).text(i+1)
    }

    // loop through each event
    for (var i = 0; i < eventsList.length; i++) {

        var tempDate = new Date(eventsList[i].eventDate)

        if(eventsList[i].eventDescription == "Christmas Eve!"){
            console.log("==========================================");            
            
            console.log((tempDate.getUTCMonth() + 1) === monthViewed);
            console.log(tempDate.getFullYear() == yearViewed);

            console.log("==========================================");            
        }
        
        // if event belongs in current month - display on month grid
        if (tempDate.getUTCMonth() + 1 === monthViewed && tempDate.getFullYear() == yearViewed) {
            
            $("#monthDay" + (tempDate.getDate()+1)).append(eventsList[i].eventDescription);
        }
    }

}

// call on page load
fillMonth();

// fill week view with current week data from eventList
function fillWeek() {
    console.log("fillWeek() fires")
    
    for(var i=0; i<eventsList.length; i++){
        var eventDate = new Date(eventsList[i].eventDate);

        console.log("============================================================");
        console.log(`${eventDate.getUTCMonth()+1} === ${monthViewed}`);
        console.log(`${eventDate.getUTCFullYear()} === ${eventDate.getUTCFullYear()}`);
        console.log(`${getWeekNumber(eventDate)} === ${weekViewed}`);
        console.log("============================================================");

        if(eventDate.getUTCMonth()+1 === monthViewed && eventDate.getUTCFullYear() === eventDate.getUTCFullYear() && getWeekNumber(eventDate) === weekViewed){
            $("#weekDay" + (((getFirstDayOfMonth(eventDate) + eventDate.getUTCDate()) % 7)-1) ).append(eventsList[i].eventDescription)            
        }
    }
    
    weekTitle.text(`${getMonthName(monthViewed)} ${yearViewed} Week ${weekViewed}`);
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
    var day = new Date(year + "-" + monthViewed + "-01").getDay()+1;

    // console.log(`add ${day} days to first of month`);

    return day;
}

// returns number of days in selected month
function getDaysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function getMonthName(num){
    console.log(num)
    switch(num){
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
function getWeekNumber(date = currentDate){
    date = new Date(date);
    var cellNumber = getFirstDayOfMonth() - 1 + date.getUTCDate();
    console.log(`getFirstDayOfMonth() + date.getUTCDate()  : ${getFirstDayOfMonth()} + ${date.getUTCDate()}`);

    console.log("cellNumber: ", cellNumber);

    var weekNumber = Math.floor(cellNumber / 7);

    console.log("weekNumber: ", weekNumber);

    return weekNumber;
}

getWeekNumber();

function getDuration(eventObj){
    var startTime = eventObj.startTime.replace(" ", ":");
    var endTime = eventObj.endTime.replace(" ", ":");

    var startTimeArr = startTime.split(":");
    var endTimeArr = endTime.split(":");

    
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