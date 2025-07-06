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
}

var hidden = false;

var elementsToShow = {};

var elementsToHide = [
    '._30BbATRhFv3V83DHNDjJAO', '._2l7c_Oz0UVsamALvPrlznq',
    // Remove left sidebar
    '#left-sidebar-container',
    // Remove right sidebar
    '#right-sidebar-container',
    // Remove Reddit logo
    '#reddit-logo', '.header-logo'
];

function hideElement(element) {
    element.style.display = 'none';
}


function hideElementByQuerySelector(querySelector) {
    try {
        const element = document.querySelector(querySelector);
        elementsToShow[querySelector] = element.style.display;
        hideElement(element);
    } catch (err) {
        // Silently fail if element not found
    }
}

function showElement(element, displayProperty) {
    element.style.display = displayProperty;
}

function showElementByQuerySelector(querySelector) {
    try {
        const element = document.querySelector(querySelector);
        const displayProperty = elementsToShow[querySelector];

        showElement(element, displayProperty);
    } catch (err) {
        // Silently fail if element not found
    }
}

function hideCommentAndLogo() {
    if (!hidden) {
        for (var querySelector of elementsToHide) {
            hideElementByQuerySelector(querySelector);
        }
    }

    hidden = true;
}

function showCommentAndLogo() {
    if (hidden) {
        for (var querySelector of elementsToHide) {
            showElementByQuerySelector(querySelector);
        }
    }

    hidden = false;
}

var redirectUrl = "https://hz757.github.io/PortfolioWebsite/RedditLiberationRedirect.html";
function redirect() {
    //document.getElementsByTagName('body')[0].innerHTML = "<k>STOP PROCRASTINATING ON REDDIT</k> <p>You may only go to reddit comment pages</p> <p>Extension built by <a style=\"color:blue\" href=\"https://henryz.dev/\">Henry Zhang</a></p>";
    window.location.href = redirectUrl;
}

// check if not a comment section, and not a whitelisted subreddit
async function redirectAndRemoveIfNeeded() {
    var result = await UserData.getData();

    whiteList = [];
    blackList = [];
    pausedUntilTime = null;

    if (result.userData != undefined)
    {
        whiteList = result.userData.whiteList;
        blackList = result.userData.blackList;
        pausedUntilTime = result.userData.pausedUntilTime;

        if (pausedUntilTime != null) {
            pausedUntilTime = new Date(pausedUntilTime);
        }
    }

    pathName = window.location.pathname;

    var currentTime = new Date();
    var isPaused = currentTime <= pausedUntilTime;

    if (isPaused) {
        showCommentAndLogo();
    }


    if (!isPaused) {
        var newUserData = {...result.userData, pausedUntilTime: null};
        chrome.storage.sync.set({userData: newUserData}, function() {});

        function isUserPath(pathName, candidate) {
            return pathName.toLowerCase().includes("/user/" + candidate.toLowerCase());
        }

        function isSubredditPath(pathName, candidate) {
            return pathName.toLowerCase().includes("/r/" + candidate.toLowerCase());
        }

        function isUserOrSubredditPath(pathName, candidate) {
            return isUserPath(pathName, candidate) && isSubredditPath(pathName, candidate);
        }

        if (pathName != null )
        {
            var isCommmentsOrMessagesOrSettings = pathName.includes("comments") || pathName.includes("/message/") || pathName.includes("/settings/");
            var isAllowedPath = isCommmentsOrMessagesOrSettings;
            if (isAllowedPath)
            {
                // check the blacklist to see whether to block
                var isBlackListedPath = blackList.some((item) => isUserOrSubredditPath(pathName, item))
                if (isBlackListedPath) {
                    redirect();
                }
            }
            else
            {
                console.log("2");
                // check each member of the whitelist, if the website isn't there, block it
                var isWhiteListedPath = whiteList.some((item) => isUserOrSubredditPath(pathName, item));
                var shouldBlock = !isWhiteListedPath;

                // I need to do testing to see if this works, because it could very well not work
                if (shouldBlock)
                {
                    redirect();
                }
            }
        }
        else
        {
            redirect();
        }
    }

    if (!isPaused) {
        hideCommentAndLogo();
    }
}

redirectAndRemoveIfNeeded();
setInterval(redirectAndRemoveIfNeeded, 1000);
