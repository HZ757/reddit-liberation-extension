// placeholders, todo: add google storage api
whiteList = ["learnprogramming"];
blackList = ["askreddit"];

whiteListElement = document.getElementById("whiteList");
blackListElement = document.getElementById("blackList");

// populate the lists
whiteList.forEach(element => {
    whiteListElement.innerHTML += "<button id=\"whiteElement\">" + element +  " X</button>"
})

blackList.forEach(element => {
    blackListElement.innerHTML += "<button id=\"blackElement\">" + element + " X</button>"
})

