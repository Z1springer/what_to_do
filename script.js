
var sunday ="#sunday";
var monday ="#monday";
var tuesday ="#tuesday";
var wednesday ="#wednesday";
var thursday ="#thursday";
var friday ="#friday";
var saturday ="#saturday";


var week = $("#week")
var save = $(".save")
var bored = $(".bored")
var textarea = $(".textSpace")

// a function for clicking save
save.on("click", function(){
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
bored.on("click", function(){
    console.log("jill")

})

// a function for clicking a textarea
textarea.on("click", function(){
    

})

$(`#sun`).val(localStorage.getItem("sun"))
$(`#mon`).val(localStorage.getItem("mon"))
$(`#tues`).val(localStorage.getItem("tues"))
$(`#wed`).val(localStorage.getItem("wed"))
$(`#thurs`).val(localStorage.getItem("thurs"))
$(`#fri`).val(localStorage.getItem("fri"))
$(`#sat`).val(localStorage.getItem("sat"))