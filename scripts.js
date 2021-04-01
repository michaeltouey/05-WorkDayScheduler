$(document).ready(function() {
    //get all the elements in an array
    var arrayTimeBlock = $(".timeblock");

    //set the time
    $("#currentDay").text(moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));

    //set the text fields on load
    var history = JSON.parse(localStorage.getItem("history")) || [];
    if (history.length > 0) {
        for (var i = 0; i < history.length; i++) {
            var stringSelector = '[time="'+ history[i].time +'"]';
            $(stringSelector).find(".description").val(history[i].text);
        }
    };

    //set the color by time
    //get the current hour
    var currentHour = moment().hour();
    //loop through and assign tense classes
    arrayTimeBlock.each(function(i) {
        var timeId = $(arrayTimeBlock[i]).attr("time");

        if (currentHour < timeId) {
            $(arrayTimeBlock[i]).addClass("past");
        } else if (currentHour === timeId) {
            $(arrayTimeBlock[i]).addClass("present");
        } else if (currentHour > timeId) {
            $(arrayTimeBlock[i]).addClass("future");
        }
    });

    //add save button functionality
    $(".savebtn").on("click",function(event) {
        //get the text
        var text = $(event.target).closest(".timeblock").find(".description").val();
        //get time id
        var timeId = $(event.target).closest(".timeblock").attr("time");
        //get the history 
        var history = JSON.parse(localStorage.getItem("history")) || [];
        //create a new history entry
        var entry = {
            time: timeId,
            text: text
        }
        //push entry to history
        history.push(entry);
        //set into local storage
        localStorage.setItem("history",JSON.stringify(history));
    });
});