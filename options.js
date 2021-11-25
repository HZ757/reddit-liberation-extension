
chrome.storage.sync.get(['userData'], function(result) {
    whiteList = [];
    blackList = [];
    if (result.userData != undefined)
    {
        whiteList = result.userData.whiteList;
        blackList = result.userData.blackList;
    }

    whiteListElement = document.getElementById("whiteList");
    blackListElement = document.getElementById("blackList");

    // populate the lists
    whiteList.forEach(element => {
        whiteListElement.innerHTML += "<button class=\"whiteElement\">" + element +  " X</button>"
    })

    blackList.forEach(element => {
        blackListElement.innerHTML += "<button class=\"blackElement\">" + element + " X</button>"
    })

    var addList = function()
    {
        if (this.id == "addWhiteListButton")
        {
            whiteList.push(document.getElementById("addWhiteList").value.toLowerCase())
            whiteListElement.innerHTML += "<button class=\"whiteElement\">" + document.getElementById("addWhiteList").value.toLowerCase() +  " X</button>"
            document.getElementById("addWhiteList").value = ""

            userData = {whiteList: whiteList, blackList: blackList}
            chrome.storage.sync.set({userData: userData}, function() {
                //console.log('Value is set to ' + userData)
            });
            document.getElementById("addWhiteListButton").onclick = addList;
        }
        else
        {
            blackList.push(document.getElementById("addBlackList").value.toLowerCase())
            blackListElement.innerHTML += "<button class=\"blackElement\">" + document.getElementById("addBlackList").value.toLowerCase() +  " X</button>"
            document.getElementById("addBlackList").value = ""

            userData = {whiteList: whiteList, blackList: blackList}
            chrome.storage.sync.set({userData: userData}, function() {
                //console.log('Value is set to ' + userData)
            });
            document.getElementById("addBlackListButton").onclick = addList;
        }

        let whiteElements = document.getElementsByClassName("whiteElement");

        for(let i = 0; i < whiteElements.length; i++) {
            whiteElements[i].onclick = removeFromList
        }

        let blackElements = document.getElementsByClassName("blackElement");

        for(let i = 0; i < blackElements.length; i++) {
            blackElements[i].onclick = removeFromList
        }
    }

    var removeFromList = function()
    {
        subredditName = this.innerText.substring(0, this.innerText.length-2);
        var isSubredditname = (element) => element == subredditName;
        // find the subreddit name whiteList/blackList and remove it from there
        // update google storage
        // remove the element from the options page

        if (this.className == "whiteElement")
        {
            whiteList.splice(whiteList.findIndex(isSubredditname), 1);
            userData = {whiteList: whiteList, blackList: blackList}
            chrome.storage.sync.set({userData: userData}, function() {
                
            });
            this.remove();
            
        }
        else
        {
            blackList.splice(blackList.findIndex(isSubredditname), 1);
            userData = {whiteList: whiteList, blackList: blackList}
            chrome.storage.sync.set({userData: userData}, function() {
                
            });
            this.remove();
            
        }
    }

    document.getElementById("addWhiteListButton").onclick = addList;
    document.getElementById("addBlackListButton").onclick = addList;


    let whiteElements = document.getElementsByClassName("whiteElement");

    for(let i = 0; i < whiteElements.length; i++) {
        whiteElements[i].onclick = removeFromList
    }

    let blackElements = document.getElementsByClassName("blackElement");

    for(let i = 0; i < blackElements.length; i++) {
        blackElements[i].onclick = removeFromList
    }
});