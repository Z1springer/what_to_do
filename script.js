
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

// create form variables

var eventDate = $("#inputDate");
var startTime = $("#inputStartTime");
var endTime = $("#inputEndTime");
var eventDescription = $("#textAreaEventDescription");

var currentDate = new Date();

var eventsList;
var yearViewed = currentDate.getFullYear();
var monthViewed = currentDate.getMonth() + 1;
// var weekViewed = "";


// call on page load
getEventsList();

$("#addEventBtn").click(function () {
    currentDate = new Date();
    var eventObj = {
        eventCreated: currentDate,
        eventDate: eventDate.val(),
        startTime: startTime.val(),
        endTime: endTime.val(),
        eventDescription: eventDescription.val()
    }

    eventsList.push(eventObj);

    localStorage.setItem("eventsList", JSON.stringify(eventsList));
    getEventsList();

    eventDate.val("");
    startTime.val("");
    endTime.val("");
    eventDescription.val("");
})

function getEventsList() {
    eventsList = JSON.parse(localStorage.getItem("eventsList")) || [];
    console.log("eventsList: ", eventsList);
}

function fillWeek() {

}


function fillMonth() {

    // TODO show month div
    // TODO hide week div

    for (var i = 0; i < eventsList.length; i++) {
        if(eventsList[i].eventDate.getMonth+1 === monthViewed && eventsList[i].eventDate.getFullYear() == yearViewed){  
            // TODO get actual day container ID 
            $("#DAYID" + getFirstDayOfMonth() + 1 + eventsList[i].eventDate.getDate()).text(JSON.stringify(eventsList[i]));
        }
    }
}

// returns day of week as an integer for first day of month
// sunday: 0 - saturday 6
// needed to position all days in month view
function getFirstDayOfMonth() {
    var year = currentDate.getFullYear();    
    var day = new Date(year + "-" + monthViewed + "-01").getDay();
    
    console.log(day);

    return day;
}

// a function for clicking quote
quoteBtn.on("click", function () {
    console.log("pail")
    getQuoteApi(setQuote);
})

function setQuote(textObj) {
    quoteText.text(textObj.text + " - " + textObj.author)

};

// a function for clicking save
save.on("click", function () {
    console.log("jack")
    // take the data-day value
    var thisDay = $(this).attr("data-day");
    // take the input value
    var dayText = $(`#${thisDay}`).val()
    console.log(dayText)
    console.log(thisDay);
    // store them both to local storage
    localStorage.setItem(thisDay, dayText)
})

// a function for clicking bored
bored.on("click", function () {
    console.log("jill")

})

// a function for clicking a textarea
textarea.on("click", function () {


})

$(`#sun`).val(localStorage.getItem("sun"))
$(`#mon`).val(localStorage.getItem("mon"))
$(`#tues`).val(localStorage.getItem("tues"))
$(`#wed`).val(localStorage.getItem("wed"))
$(`#thurs`).val(localStorage.getItem("thurs"))
$(`#fri`).val(localStorage.getItem("fri"))
$(`#sat`).val(localStorage.getItem("sat"))