console.log("api.js loaded");

function getQuote(callback){

    var quote = "";


    // dummy call
    quote = "Speak softly and carry a big stick"

    callback(quote);
}

function getRandomBoredEvent(callback, type = "education"){

    var bored = {};
    
    // dummy call
    bored = {
        "activity": "Learn a new programming language",
        "accessibility": 0.25,
        "type": type,
        "participants": 1,
        "price": 0.1,
        "key": "5881028"
    };

    callback(bored);
}

function getRandomBoredEventApi(callback, type = "education"){

    var url = "http://www.boredapi.com/api/activity/?type=" + type;
    var bored = {};
    
    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response){
        console.log("bored api event: ", response);
        callback(response);
    })

    callback(bored);
}


function getQuoteApi(callback){

    $.ajax({
        url: "https://type.fit/api/quotes",
        method: "GET"
        }
    ).then(function(response){
        // console.log(response)
        var quotes=JSON.parse(response);
        
        var quote = quotes[Math.floor(Math.random()*quotes.length)];

        if(!quote.author){
            quote.author = "Unknown";
        }

        console.log(quote);
        callback(quote);
    });

}