// placeholders, todo: add google storage api
userData = {"whiteList":["learnprogramming"], "blackList":["askreddit"]}
whiteList = userData["whiteList"];
blackList = userData["blackList"];

whiteListElement = document.getElementById("whiteList");
blackListElement = document.getElementById("blackList");

// populate the lists
whiteList.forEach(element => {
    whiteListElement.innerHTML += "<button id=\"whiteElement\">" + element +  " X</button>"
})

blackList.forEach(element => {
    blackListElement.innerHTML += "<button id=\"blackElement\">" + element + " X</button>"
})

var addList = function()
{
    if (this.id == "addWhiteListButton")
    {
        whiteList.push(document.getElementById("addWhiteList").value)
        whiteListElement.innerHTML += "<button id=\"whiteElement\">" + document.getElementById("addWhiteList").value +  " X</button>"
        document.getElementById("addWhiteList").value = ""
    }
    else
    {
        blackList.push(document.getElementById("addBlackList").value)
        blackListElement.innerHTML += "<button id=\"blackElement\">" + document.getElementById("addBlackList").value +  " X</button>"
        document.getElementById("addBlackList").value = ""
    }
    document.getElementById("addWhiteListButton").onclick = addList;
    document.getElementById("addBlackListButton").onclick = addList;
}

document.getElementById("addWhiteListButton").onclick = addList;
document.getElementById("addBlackListButton").onclick = addList;

