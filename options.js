chrome.storage.sync.get(['userData'], function(result) {
    whiteList = result.userData.whiteList;
    blackList = result.userData.blackList;

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
            whiteList.push(document.getElementById("addWhiteList").value.toLowerCase())
            whiteListElement.innerHTML += "<button id=\"whiteElement\">" + document.getElementById("addWhiteList").value.toLowerCase() +  " X</button>"
            document.getElementById("addWhiteList").value = ""
            userData = {whiteList: whiteList, blackList: blackList}
            chrome.storage.sync.set({userData: userData}, function() {
                console.log('Value is set to ' + userData)
            });
        }
        else
        {
            blackList.push(document.getElementById("addBlackList").value.toLowerCase())
            blackListElement.innerHTML += "<button id=\"blackElement\">" + document.getElementById("addBlackList").value +  " X</button>"
            document.getElementById("addBlackList").value = ""
        }
        document.getElementById("addWhiteListButton").onclick = addList;
        document.getElementById("addBlackListButton").onclick = addList;
    }

    document.getElementById("addWhiteListButton").onclick = addList;
    document.getElementById("addBlackListButton").onclick = addList;
});

