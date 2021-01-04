// console.log("api.js loaded");


// get activity from bored api - call data setting callback function
function getRandomBoredEventApi(callback, type = ""){
    
    var boredUrl = "http://www.boredapi.com/api/activity/?type=";
    boredUrl += type;
    
    // async call
    $.ajax({
        url: boredUrl,
        method: "GET"
    }).then(function(response){
        console.log("bored api event: ", response);
        
        // call display setting function
        callback(response);
    }).fail(function(){
        // if unable to get activity, send fix connection as activity
        var activity = {
            activity: "Fix your internet connection!",
            participants: "1",
            type: "diy"
        }
        
        // call display setting function
        callback(activity);
    })
    
}

// get quote from type.fit api
function getQuoteApi(callback){
    var quoteUrl = "https://type.fit/api/quotes";
    
    // async call
    $.ajax({
        url: quoteUrl,
        method: "GET"
    }
    ).then(function(response){
        // console.log(response)
        
        // convert response to object
        var quotes=JSON.parse(response);
        
        // get random quote from response
        var quote = quotes[Math.floor(Math.random()*quotes.length)];

        // if author is blank, attribute to Unknown
        if(!quote.author){
            quote.author = "Unknown";
        }

        // call quote display function
        callback(quote);

    }).fail(function(){

        // if unable to get quote, send snarky quote
        callback({
            text: "Fix your internet connection!",
            author: "Abraham Lincoln"
        })
    });

}