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