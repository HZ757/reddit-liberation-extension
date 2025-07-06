class UserData {
    static promise = null;
    static async getData() {
        if (UserData.promise == null) {
            UserData.promise = chrome.storage.sync.get(['userData']);
        }

        var data = await UserData.promise;
        UserData.promise = null;

        return data;
    }

    static async setData(userData) {
        await chrome.storage.sync.set({ userData: userData })
    }
}

function areSameDay(firstDate, secondDate) {
    return (firstDate.getFullYear() == secondDate.getFullYear() &&
        firstDate.getMonth() == secondDate.getMonth() &&
        firstDate.getDate() == secondDate.getDate());
}

function hhmmss(seconds) {
    ss = seconds % 60;
    mm = Math.floor(seconds / 60);

    hh = Math.floor(mm / 60);
    mm = mm % 60;

    function pad(num) {
        return num.toString().padStart(2, '0');
    }

    return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
}

async function updatePausedElement() {
    var pausedElement = document.getElementById("current-pause");

    var result = await UserData.getData();
    var pausedUntilTime = result.userData.pausedUntilTime;

    console.log(pausedUntilTime);

    if (pausedUntilTime == null) {
        pausedElement.innerHTML = '';
    }

    // populate currently paused time
    if (pausedUntilTime != null) {
        var currentTime = Date.now();
        var pausedTimePassed = pausedUntilTime <= currentTime;

        if (pausedTimePassed) {
            // eliminate the time from storage
            pausedElement.innerHTML = '';
        } else {
            var time;
            if (areSameDay(new Date(currentTime), new Date(pausedUntilTime))) {
                time = new Date(pausedUntilTime).toLocaleTimeString();
            } else {
                time = new Date(pausedUntilTime).toLocaleString();
            }
            var pausedForInSeconds = Math.ceil((pausedUntilTime - currentTime) / 1000);
            pausedElement.innerHTML = `Currently paused for <span style="font-family: monospace; font-size: 1.5em;">${hhmmss(pausedForInSeconds)}</span> (until: ${time}) <button id="cancel-pause">Cancel Pause</button>`;
            document.getElementById("cancel-pause").onclick = cancelPause;
        }
    }
}

async function cancelPause() {
    const result = await UserData.getData();
    const newUserData = {...result.userData, pausedUntilTime: null}
    await chrome.storage.sync.set({userData: newUserData});
}

var ONE_SECOND = 1_000;
updatePausedElement();
setInterval(() => updatePausedElement(), 1000)

UserData.getData().then(function(result) {
    whiteList = [];
    blackList = [];
    var pausedUntilTime = null;
    if (result.userData != undefined)
    {
        whiteList = result.userData.whiteList;
        if (whiteList == null) {
            whiteList = [];
        }

        blackList = result.userData.blackList;
        if (blackList == null) {
            blackList = [];
        }

        pausedUntilTime = result.userData.pausedUntilTime;
    }

    var userData = result.userData;

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

            userData = {...userData, whiteList: whiteList, blackList: blackList}
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

            userData = {...userData, whiteList: whiteList, blackList: blackList}
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
            userData = {...userData, whiteList: whiteList, blackList: blackList}
            chrome.storage.sync.set({userData: userData}, function() {

            });
            this.remove();

        }
        else
        {
            blackList.splice(blackList.findIndex(isSubredditname), 1);
            userData = {...userData, whiteList: whiteList, blackList: blackList}
            chrome.storage.sync.set({userData: userData}, function() {

            });
            this.remove();

        }
    }

    var pauseFor5Minutes = function () {
        pausedUntilTime = new Date().getTime() + 5 * 60 * 1000;
        userData = { whiteList, blackList, pausedUntilTime };

        UserData.setData(userData).then(() => {
            updatePausedElement();
        });
    }

    document.getElementById("pauseFor5MinBtn").onclick = pauseFor5Minutes;
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
