// ============================================================================
// Global Vairables
// =============================================================================

// jQuery element varaibles
var timeInterval = $("#timeInterval");
var day = $("#dayView");
var month = $("#monthView");
var week = $("#weekView")
var dayViewEvent = $("#dayViewEvent");
var quoteText = $("#quoteText");
var quoteAuthor = $("#quoteAuthor");
var weekTitle = $("#weekTitle");
var monthTitle = $("#monthTitle");

// buttons
var quoteBtn = $("#quoteBtn");
var addButton = $("#addEventBtn");
var editButton = $("#editBtn");
var deleteButton = $("#deleteEventBtn");
var randomActivityButton = $("#randomActivityBtn")
var showMonthButton = $(".showMonthButton");
var showWeekButton = $(".showWeekButton");
var showDayButton = $(".showDayButton");
var nextDayButton = $("#nextDayButton");
var prevDayButton = $("#previousDayButton");
var nextWeekButton = $("#nextWeekButton");
var prevWeekButton = $("#previousWeekButton");
var nextMonthButton = $("#nextMonthButton");
var prevMonthButton = $("#previousMonthButton");

// form variables
var eventDate = $("#inputDate");
var startTime = $("#inputStartTime");
var endTime = $("#inputEndTime");
var eventDescription = $("#textAreaEventDescription");

// validation variables
var dateMsg = $("#dateMsg");
var startMsg = $("#startMsg");
var endMsg = $("#endMsg");
var descriptionMsg = $("#descriptionMsg");
var validTimeMsg = $("#validTimeMsg");
var categoryMsg = $("#categoryMsg");

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

// setup materialize elements
$(document).ready(function () {
    $('.timepicker').timepicker();
    $('.datepicker').datepicker();
    $('.modal').modal();
    $('.tooltipped').tooltip();
    $('.sidenav').sidenav();
    editButton.hide();
    deleteButton.hide();
});

// current date settings
var yearViewed = currentDate.getFullYear();
var monthViewed = currentDate.getMonth() + 1;
var dayViewed = currentDate.getDate();
var weekViewed = getWeekNumber();

// load event list from local storage
function getEventsList() {
    eventsList = JSON.parse(localStorage.getItem("eventsList")) || [];
    // console.log("getEventsList() fires. eventsList: ", eventsList);
}

// call on page load
getEventsList();
getQuoteApi(setQuote);
fillMonth();
fillWeek();
fillDay();
setTimeScale();
getWeekNumber();

// fill month view with current month data from eventList
function fillMonth() {

    // console.log("fillMonth() fires")

    // empty old month view elements
    $(".monthDay").empty();

    // set month title
    monthTitle.text(`${getMonthName(monthViewed)} ${yearViewed}`);

    // label days and add link to day view
    for (var i = 0; i < getDaysInMonth(monthViewed, yearViewed); i++) {
        $("#monthDay" + (i + getFirstDayOfMonth())).append(dayMonthElement(new Date(yearViewed, monthViewed - 1, i + 1)))
    }

    // loop through each event
    for (var i = 0; i < eventsList.length; i++) {

        // cast property as date
        var tempDate = new Date(eventsList[i].eventDate)

        // if event belongs in current month - display on month grid
        if (tempDate.getMonth() + 1 === monthViewed && tempDate.getFullYear() == yearViewed) {
            $("#monthDay" + (getFirstDayOfMonth() + tempDate.getDate() - 1)).append(monthViewElement(eventsList[i]));
        }
    }

    // hide month view rows if not needed
    var firstDayOfMonth = getFirstDayOfMonth(new Date(yearViewed, monthViewed, 0));
    var daysInMonth = getDaysInMonth(monthViewed, yearViewed)
    var cellsNeeded = firstDayOfMonth + daysInMonth;

    if (cellsNeeded <= 35) {
        $("#week5").hide();
        if (cellsNeeded <= 26) {
            $("#week4").hide();
        } else {
            $("#week4").show();
        }
    } else {
        $("#week5").show();
    }

    // initialize new event tooltips
    $('.tooltipped').tooltip();
}

// fill week view with current week data from eventList
function fillWeek() {
    // console.log("fillWeek() fires")

    // remove old week view elements
    $(".weekDayData").empty();

    // get date to show containing week
    var dateViewed = new Date(yearViewed, monthViewed - 1, dayViewed);

    // fill week day headings
    for (var i = 0; i < 7; i++) {

        // show each day's date
        $("#weekDate" + i).text(formatDate(addDays(getFirstDayOfWeek(dateViewed), i)));

        // add data attribute for link to day view
        $(".weekDay" + i).attr("data-date", addDays(getFirstDayOfWeek(dateViewed), i));
    }

    // loop through each event
    for (var i = 0; i < eventsList.length; i++) {

        // cast property as date
        var eventDate = new Date(eventsList[i].eventDate);

        // if day falls between 1st day of week and 7th, add to week view
        if (eventDate >= getFirstDayOfWeek(dateViewed) && eventDate < addDays(getFirstDayOfWeek(dateViewed), 7)) {

            var weekDay = $("#weekDay" + getDateDifferenceDays(eventDate, getFirstDayOfWeek(dateViewed)));

            // element containing info
            weekDay.append(weekViewElement(eventsList[i]));
            // custom shadow element
            weekDay.append(addWeekShadow(eventsList[i]));
        }
    }

    // set week title
    getWeekNumber();

    weekTitle.text(`${getMonthName(monthViewed)} ${yearViewed} Week ${weekViewed + 1}`);

    // initialize new event tooltips
    $('.tooltipped').tooltip();
}

// fill day view with current day data from eventList
function fillDay() {
    // console.log(`fillDay() fires. `);

    // clear old day view elements
    dayViewEvent.empty();

    // set day title
    $("#dayTitle").text(getDayName(new Date(yearViewed, monthViewed - 1, dayViewed).getDay()) + " " + monthViewed + "/" + dayViewed + "/" + yearViewed)

    // loop through each event
    for (var i = 0; i < eventsList.length; i++) {

        // cast property as date
        var tempDate = new Date(eventsList[i].eventDate);

        // if event matches day viewed add to day view
        if (tempDate.getDate() === dayViewed && tempDate.getMonth() + 1 === monthViewed && tempDate.getFullYear() === yearViewed) {

            // element containing data
            dayViewEvent.append(dayViewElement(eventsList[i]));
            // custom shadow element
            dayViewEvent.append(addMonthShadow(eventsList[i]));
        }
    }

    // initialize tooltips for new elements
    $('.tooltipped').tooltip();
}

// create reusable element for month view item
function monthViewElement(eventObj) {
    // console.log("attempting to add event to month", eventObj)

    // wrap element with link to day view
    var viewLink = $("<a>");
    viewLink.attr("data-id", eventObj.eventCreated);
    viewLink.addClass("viewLink");

    // data element
    var span = $("<span>");
    span.addClass("monthEvent tooltipped");

    // position according to start time and position
    span.css("width", getPercentOfDay(getDuration(eventObj)) + "%")
    span.css("left", getPercentOfDay(convertHours(eventObj.startTime)) + "%")

    span.css("background-image", getColor(eventObj.category));

    // add materialize tooltip
    span.attr("data-tooltip", `${eventObj.eventDescription} Start Time: ${eventObj.startTime} End Time: ${eventObj.endTime}`)

    viewLink.append(span);

    return viewLink;
}

// create reusable element for week view item
function weekViewElement(eventObj) {
    // console.log("attempting to display event", eventObj)

    // wrap element with link to day view
    var viewLink = $("<a>");
    viewLink.attr("data-id", eventObj.eventCreated);
    viewLink.addClass("viewLink");

    // data element
    var event = $("<div>");
    event.addClass("event tooltipped");

    // position according to start time and duration
    event.css("height", (getPercentOfDay(getDuration(eventObj)) - 0.5) + "%");
    event.css("top", getPercentOfDay(convertHours(eventObj.startTime)) + "%");

    event.css("background-image", getColor(eventObj.category));

    // add materialize tooltip
    event.attr("data-tooltip", `${eventObj.eventDescription} Start Time: ${eventObj.startTime} End Time: ${eventObj.endTime}`)

    // place inside overflow:hidden element
    var textBox = $("<div>");
    textBox.addClass("eventTextBox");
    textBox.css("padding", "0 5px")

    // hide long descriptions behind ...
    textBox.text(eventObj.eventDescription.substring(0, 20))
    if (eventObj.eventDescription.length > 20) {
        textBox.append("...");
    }

    textBox.append(" - " + eventObj.category);
    event.append(textBox);
    viewLink.append(event);

    return viewLink;
}

// create reusable element for day view
function dayViewElement(eventObj) {
    // console.log("attempting to display event", eventObj)

    // wrap element in link to day view
    var viewLink = $("<a>");
    viewLink.attr("data-id", eventObj.eventCreated);
    viewLink.addClass("viewLink");

    // data element
    var event = $("<div>");
    event.addClass("event tooltipped");

    // position by start time and duration
    event.css("height", getPercentOfDay(getDuration(eventObj)) + "%");
    event.css("top", getPercentOfDay(convertHours(eventObj.startTime)) + "%");

    event.css("background-image", getColor(eventObj.category));

    // add materialize tooltip
    event.attr("data-tooltip", `${eventObj.eventDescription} Start Time: ${eventObj.startTime} End Time: ${eventObj.endTime}`)

    // place description inside overflow:hidden container
    var textBox = $("<div>");
    textBox.addClass("eventTextBox");

    // event data
    $("<h4>").text(eventObj.eventDescription).appendTo(textBox);
    $("<strong>").text("Start Time: ").appendTo(textBox);
    $("<span>").text(eventObj.startTime).appendTo(textBox);
    $("<br>").appendTo(textBox);
    $("<strong>").text("End Time: ").appendTo(textBox);
    $("<span>").text(eventObj.endTime).appendTo(textBox);
    $("<br>").appendTo(textBox);

    textBox.appendTo(event);
    event.appendTo(viewLink);

    return viewLink;
}

// add time marks to day view
function setTimeScale() {
    // split container into 25 evenly spaced marks representing hours
    for (var i = 0; i <= 24; i++) {
        var divider = $("<div>").addClass("timeDivider").css("top", ((i / 24) * 100) + "%");
        $("<span>").addClass("dividerLabel").text(toTwelveHour(i)).appendTo(divider);
        timeInterval.append(divider);
    }
}

// custom shadow shaped element for week view
function addWeekShadow(eventObj) {
    var shadow = $("<div>");
    shadow.addClass("eventShadow");
    shadow.css("height", (getPercentOfDay(getDuration(eventObj)) - 3) + "%");
    shadow.css("top", (getPercentOfDay(convertHours(eventObj.startTime)) + 2) + "%");
    shadow.css("left", (shiftShadow(getPercentOfDay(getDuration(eventObj) * 3.0), 6)) + "%");

    return shadow;
}

// custom shadow shaped element for month view
function addMonthShadow(eventObj) {
    var shadow = $("<div>");
    shadow.addClass("eventShadow");
    shadow.css("height", (getPercentOfDay(getDuration(eventObj)) - 3) + "%");
    shadow.css("top", (getPercentOfDay(convertHours(eventObj.startTime)) + 2) + "%");
    shadow.css("left", shiftShadow(getPercentOfDay(getDuration(eventObj)) * 1.2, 6) + "%");

    return shadow;
}

// reusable month view element to link to day view
function dayMonthElement(date) {
    var tempDate = new Date(date);

    var button = $("<a>");
    button.addClass("btn-floating btn-large waves-effect waves-light dayLink");

    // attach data-date property for link
    button.attr("data-date", date);

    // set text to day of month
    button.text(tempDate.getDate());

    return button;
}

// =====================================================================================
// Page functions
// =====================================================================================

// event listener for adding event
addButton.click(function () {
    // console.log("addEventButton() fires ", eventObj)

    // store radio input selected value 
    var selectedCategory = $("input:radio[name='group1']:checked").val();

    // only process form if valid
    if (validate()) {

        // cast date from input as date and add timezone information
        var oldDate = new Date(eventDate.val());
        var newDate = new Date(oldDate.getTime() + (60000 * oldDate.getTimezoneOffset()));

        // get instant created for use as id
        currentDate = new Date();

        // create event object
        var eventObj = {
            eventCreated: currentDate,
            eventDate: newDate,
            startTime: startTime.val(),
            endTime: endTime.val(),
            eventDescription: eventDescription.val(),
            category: selectedCategory
        }

        console.log(eventObj);
        // add event to global variable
        eventsList.push(eventObj);

        // store eventsList in localStorage
        localStorage.setItem("eventsList", JSON.stringify(eventsList));

        // clear add event form
        clearForm();

        // refill all views==============================================
        fillAllViews();

        // close modal
        $('#eventFormModal').modal("close");
    }

})

// event listner function for clicking quote
quoteBtn.on("click", function () {
    // console.log("pail")
    getQuoteApi(setQuote);
})

// display quote on page
function setQuote(textObj) {
    quoteText.text(textObj.text)
    quoteAuthor.text(" - " + textObj.author)
};

// show clicked event in event form
$(document).on("click", ".viewLink", function () {
    // console.log(`.viewLink click(${$(this).data("id")}) fires!`)

    // get id of clicked event
    var id = $(this).data("id");

    // get event object by id
    var event = getEvent(id);

    // cast property as date
    var tempDate = new Date(event.eventDate);

    // set form fields
    eventDate.val(formatDateForInput(tempDate));
    startTime.val(event.startTime)
    endTime.val(event.endTime)
    eventDescription.val(event.eventDescription)
    $("input[value='" + event.category + "']").prop("checked", true);

    // set data-id of edit and delete buttons
    editButton.data("id", id)
    deleteButton.data("id", id)

    // hide add button / show edit/delete buttons
    addButton.hide();
    editButton.show();
    deleteButton.show();

    // open event form modal
    $('#eventFormModal').modal("open");
})

// event listener for edit button
editButton.click(function () {
    // console.log(`editButton.click() fires.`);

    // get id of element to edit
    var id = $(this).data("id");

    // get value of selected category radio input 
    var selectedCategory = $("input:radio[name='group1']:checked").val();

    // only process form if is valid
    if (validate()) {

        // get date from form, cast as date, and set timezone
        var oldDate = new Date(eventDate.val());
        var newDate = new Date(oldDate.getTime() + (60000 * oldDate.getTimezoneOffset()));

        // create event object
        var newEvent = {
            eventCreated: id,
            eventDate: newDate,
            startTime: startTime.val(),
            endTime: endTime.val(),
            eventDescription: eventDescription.val(),
            category: selectedCategory
        }

        // get index of element in eventsList========================================================================
        var indexFound = -1;
        for (var i = 0; i < eventsList.length; i++) {
            if (eventsList[i].eventCreated == id) {
                indexFound = i
                break;
            }
        }

        var index = getEventsListIndex(id);
        // if event is in eventsList array
        if (index > -1) {
            // replace old element with new one
            eventsList.splice(index, 1, newEvent);
        }

        // save new eventsList into local storage
        localStorage.setItem("eventsList", JSON.stringify(eventsList));

        // clear event form
        clearForm()

        // refill all views
        fillAllViews()

        // close modal
        $('#eventFormModal').modal("close");

        // show/hide event buttons
        addButton.show();
        editButton.hide();
        deleteButton.hide();
    }
})

// event listener for delete event button
deleteButton.click(function () {
    // console.log(`deleteButton.click() fires.`)

    // get id of event
    var id = $(this).data("id");

    var index = getEventsListIndex(id);
    // if event is in eventsList array
    if (index > -1) {
        // remove element from array
        eventsList.splice(index, 1);
    }

    // update localStorage
    localStorage.setItem("eventsList", JSON.stringify(eventsList));

    // clear form
    clearForm();
    
    // fill all views
    fillAllViews();

    // close modal form
    $('#eventFormModal').modal("close");

    // show/hide buttons
    addButton.show();
    editButton.hide();
    deleteButton.hide();
})

// hide date required validation message if fixed
eventDate.change(function () {
    if (eventDate.val() != "") {
        dateMsg.hide();
    }
})

// hide start time required validation message if fixed
// hide invalid time error if fixed
startTime.change(function () {
    if (startTime.val() != "") {
        startMsg.hide();
        if (endTime.val() != "") {
            if (convertHours(startTime.val()) < convertHours(endTime.val())) {
                validTimeMsg.hide();
            }
        }
    }

})

// hide end time required validation message if fixed
// hide invalid time error if fixed
endTime.change(function () {
    if (endTime.val() != "") {
        endMsg.hide();
        if (startTime.val() != "") {
            if (convertHours(startTime.val()) < convertHours(endTime.val())) {
                validTimeMsg.hide();
            }
        }
    }
})

// hide date required validation message if fixed
eventDescription.change(function () {
    if (eventDescription.val() != "") {
        descriptionMsg.hide();
    }
})

// event listner for get random event
randomActivityButton.click(function () {
    // console.log(`randomActivityEventButton.click() fires.`);

    var selectedRandomType = $("input:radio[name='group2']:checked").val();
    getRandomBoredEventApi(fillActivity, selectedRandomType);
})

// fill event form with random activity object
function fillActivity(response) {
    // console.log(`fillActivity(${response}) fires.`);

    // format object to string
    var result = `${response.activity}. - Participants: ${response.participants}. - Type: ${response.type}.`;
    if (response.link != "") {
        result += ` - Learn more at: ${response.link}`
    }
    eventDescription.val(result);

    // resize materialize textarea to fit data
    M.textareaAutoResize(eventDescription);
}

// mimick page link show day view
showDayButton.click(function () {
    hideViews();
    day.show();
})

// mimick page link show week view
showWeekButton.click(function () {
    hideViews();
    week.show();
})

// mimick page link show month view
showMonthButton.click(function () {
    hideViews();
    month.show();
})

// hide views to then show desired view
function hideViews() {
    day.hide();
    week.hide();
    month.hide();
}

// navigate to next day in day view
nextDayButton.click(function () {
    addDay();
    fillDay();
})

// navigate to previous day in day view
prevDayButton.click(function () {
    subtractDay();
    fillDay();
})

// navigate to next week in week view
prevWeekButton.click(function () {
    subtractWeek();
    getWeekNumber();
    fillWeek();
})

// navigate to previous week in week view
nextWeekButton.click(function () {
    addWeek();
    getWeekNumber();
    fillWeek();
})

// navigate to next month in month view
nextMonthButton.click(function () {
    console.log(`next month button fires`);
    addMonth();
    fillMonth();
})

// navigate to previous month in month view
prevMonthButton.click(function () {
    subtractMonth();
    fillMonth();
})

// event listener to navigate to specific day in day view
$(document).on("click", ".dayLink", function () {
    // console.log(`.dayLink.click() fires`);
    
    // cast data-date as date
    var date = new Date($(this).data("date"));
    
    // set global date variables
    dayViewed = date.getDate();
    monthViewed = date.getMonth() + 1;
    yearViewed = date.getFullYear();

    // refill views
    fillAllViews()
    
    // hide month and day views
    hideViews();

    // show correct view
    day.show();
})

// event listener for add event modal link
$(".modal-trigger").click(function () {
    // console.log('.modal-trigger.click() fires.')

    // show/hide appropriate buttons
    addButton.show();
    editButton.hide();
    deleteButton.hide();

    // clear event form
    clearForm();
})

// =====================================================================================
// Helper functions
// =====================================================================================

// get index in eventsList of event by id
function getEventsListIndex(id) {
    var indexFound = -1;
    for (var i = 0; i < eventsList.length; i++) {
        if (eventsList[i].eventCreated == id) {
            indexFound = i
            break;
        }
    }
    return indexFound;
}

// fill all views
function fillAllViews() {

    fillMonth();
    fillWeek();
    fillDay();
}

// clear all form elements
function clearForm() {
    eventDate.val("");
    startTime.val("");
    endTime.val("");
    eventDescription.val("");

}

// returns day of week as an integer for first day of month
// sunday: 0 - saturday 6
// needed to position all days in month view
function getFirstDayOfMonth() {
    // console.log(`getFirstDayOfMonth() fires.`)
    
    var day = new Date(yearViewed, monthViewed - 1, 1).getDay();

    return day;
}

// returns day of year as an integer for first day of month
// sunday: 0 - saturday 6
function getFirstDayOfYear() {
    // console.log(`getFirstDayOfYear() fires.`);

    var day = new Date(yearViewed, 0, 1).getDay() + 1;

    return day;
}

// returns number of days in selected month
function getDaysInMonth(month, year) {
    // console.log(`getDaysInMonth(${month},${year}) fires date: ${new Date(year, month, 0)} returning: ${new Date(year, month, 0).getDate()}`)
    return new Date(year, month, 0).getDate();
}

// returns name of day of week
function getDayName(num) {
    switch (num) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday"
        case 5:
            return "Friday";
        case 6:
            return "Saturday"
    }
    return "Oops!";
}

// returns name of month
function getMonthName(num) {
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

// returns current week number 0-5
function getWeekNumber() {
    // console.log(`date: ${date} yearViewed: ${yearViewed}, monthViewed: ${monthViewed}, dayViewed: ${dayViewed} weekNunber: ${weekNumber}`);

    var date = new Date(yearViewed, monthViewed-1, dayViewed);
    var cellNumber = getFirstDayOfMonth() + date.getDate() - 1;

    weekNumber = Math.floor(cellNumber / 7);    

    weekViewed = weekNumber;

    return weekNumber;
}

// returns time difference between end and start
function getDuration(eventObj) {

    return convertHours(eventObj.endTime) - convertHours(eventObj.startTime)

}

// converts time string format (8:30 AM) to int (8.5)
function convertHours(str) {
    // console.log(`convertHours(${str}) fires`);

    var intTime = 0;

    var time = str.replace(" ", ":");

    var timeArr = time.split(":");

    if (timeArr[2] == "AM") {
        if (timeArr[0] == 12) {
            intTime = 0;
        } else {
            intTime = parseInt(timeArr[0])
        }
    } else {
        if (timeArr[0] == 12) {
            intTime = 12
        } else {
            intTime = 12 + parseInt(timeArr[0])
        }
    }

    intTime += parseInt(timeArr[1]) / 60;

    return intTime;
}

// returns a duration as a percent of day
function getPercentOfDay(num) {
    return (num / 24) * 100;
}

// converts an integer (8.5) to a time format string(8:30)
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

// maps a category to a color
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

// setter function for dayViewed - won't allow day number larger than days in month
// also designed to accept optional argument 7 to add week
function addDay(num = 1) {
    // console.log(`addDay() fires new - dayViewed: ${dayViewed}, monthViewed: ${monthViewed}, yearViewed: ${yearViewed}`)

    var tempDate = new Date(yearViewed, monthViewed, 0);

    var maxDay = tempDate.getDate();

    dayViewed += num;

    if (dayViewed > maxDay) {
        dayViewed = dayViewed - maxDay;
        addMonth();
    }
    
}

// setter function for dayViewed - won't allow day number smaller than 1 
// also designed to accept optional argument 7 to subtract week
function subtractDay(num = 1) {
    // console.log(`subtractDay() fires new - dayViewed: ${dayViewed}, monthViewed: ${monthViewed}, yearViewed: ${yearViewed}`)

    dayViewed -= num;
    if (dayViewed <= 0) {
        subtractMonth()
        var maxDay = new Date(yearViewed, monthViewed, 0).getDate();
        dayViewed = maxDay + dayViewed;
    }
    
}

// setter function for weekViewed
function addWeek() {
    addDay(7);
    getWeekNumber(new Date(yearViewed, monthViewed - 1, dayViewed));    
}

// setter function for weekViewed
function subtractWeek() {
    subtractDay(7)
    getWeekNumber(new Date(yearViewed, monthViewed - 1, dayViewed));    
}

// setter function for monthViewed
function addMonth() {
    monthViewed++;
    if (monthViewed > 12) {
        monthViewed = 1
        yearViewed++;
    }
}

// setter function for monthViewed
function subtractMonth() {
    monthViewed--;
    if (monthViewed < 1) {
        monthViewed = 12;
        yearViewed--;
    }
}

// returns days since first day of year
function getDayOfYear(date = currentDate) {
    // console.log(`getDayOfYear(${date}) fires: returning: ${day}`);

    var firstDayOfYear = new Date(date.getFullYear(), 0, 0);

    getDateDifferenceDays(date, firstDayOfYear);
    
    return day;
}

// returns difference in days between two dates
function getDateDifferenceDays(date1, date2) {
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var diff = date1 - date2
    var days = Math.floor(diff / millisecondsPerDay)

    return days;
}

// returns date of first day of week selected by date
function getFirstDayOfWeek(date = currentDate) {
    // console.log(`getFirstDayOfWeek(${date}) fires`)   

    var tempDate = new Date(date);

    tempDate = addDays(tempDate, -1 * tempDate.getDay())

    return tempDate;
}

// returns date sum of given date and days since
function addDays(date, days) {
    var tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + days);

    return tempDate;
}

// formats date to short date string (1/1/2020)
function formatDate(date) {
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}

// formats date for html date input (yyyy-mm-dd)
function formatDateForInput(date) {
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + month + "-" + day;
}

// returns event from eventsList by id or empty object if not found
function getEvent(id) {
    for (var i = 0; i < eventsList.length; i++) {
        if (eventsList[i].eventCreated === id) {
            return eventsList[i]
        }
    }
    return {};
}

//Validate event form - return boolean true if form is filled correctly
function validate() {
    // console.log('validate() fires.');

    // check for empty inputs
    var hasEventDate = eventDate.val() != "";
    var hasStartTime = startTime.val() != "";
    var hasEndTime = endTime.val() != "";
    var hasDescription = eventDescription.val() != "";

    // check that start time is before end time
    var isValidTime = convertHours(startTime.val()) < convertHours(endTime.val());

    // initialize validation test to false
    var valid = false;

    // if every condition passes validation, set to true
    if (hasEventDate && hasStartTime && hasEndTime && hasDescription && isValidTime) {
        valid = true
    }
    // handle each validation step separately
    else {
        if (!hasEventDate) {
            dateMsg.show();
        }
        if (!hasStartTime) {
            startMsg.show();
        }
        if (!hasEndTime) {
            endMsg.show();
        }
        if (!hasDescription) {
            descriptionMsg.show();
        }
        if (!isValidTime) {
            validTimeMsg.show();
        }
    }

    return valid;
}

// shift custom shadow so top edge aligns to original skewed position
function shiftShadow(height, deg) {
    // console.log(`height: ${height} deg: ${deg}`);

    var amtToShift;
    var radians = ((90 - deg) * Math.PI) / 180;
    amtToShift = height / (2 * Math.tan(radians))
    
    return amtToShift;
}
