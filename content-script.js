function deleteCommentAndLogo() {
    try{
        document.getElementsByClassName('_30BbATRhFv3V83DHNDjJAO')[0].innerHTML = ""
        
    }
    catch(err) {
        
    }

    try{
        document.getElementsByClassName('_2l7c_Oz0UVsamALvPrlznq')[0].innerHTML = ""
    }
    catch(err) {

    }

    // Remove left sidebar
    try {
        const leftSidebar = document.getElementById('left-sidebar-container');
        if (leftSidebar) {
            leftSidebar.remove();
        }
    } catch(err) {
        // Silently fail if element not found
    }

    // Remove right sidebar
    try {
        const rightSidebar = document.getElementById('right-sidebar-container');
        if (rightSidebar) {
            rightSidebar.remove();
        }
    } catch(err) {
        // Silently fail if element not found
    }

    // Remove Reddit logo
    try {
        const redditLogo = document.getElementById('reddit-logo');
        if (redditLogo) {
            redditLogo.remove();
        }
        // Also try to remove by header logo class
        const headerLogo = document.querySelector('.header-logo');
        if (headerLogo) {
            headerLogo.remove();
        }
    } catch(err) {
        // Silently fail if element not found
    }
}

chrome.storage.sync.get(['userData'], function(result) {
    whiteList = [];
    blackList = [];
    if (result.userData != undefined)
    {
        whiteList = result.userData.whiteList;
        blackList = result.userData.blackList;
    }


    pathName = window.location.pathname;

    // check if not a comment section, and not a whitelisted subreddit
    if (pathName != null )
    {
        if (pathName.includes("comments") || pathName.includes("/message/") || pathName.includes("/settings/"))
        {
            // check the blacklist to see
            blackList.forEach(element => {
                if (pathName.toLowerCase().includes("/r/" + element.toLowerCase()) || pathName.toLowerCase().includes("/user/" + element.toLowerCase()))
                {
                    //document.getElementsByTagName('body')[0].innerHTML = "<k>STOP PROCRASTINATING ON REDDIT</k> <p>You may only go to reddit comment pages</p> <p>Extension built by <a style=\"color:blue\" href=\"https://henryz.dev/\">Henry Zhang</a></p>";
                    window.location.href = "https://hz757.github.io/PortfolioWebsite/RedditLiberationRedirect.html";
                }
            })
        }
        else
        {
            console.log("2");
            // check each member of the whitelist, if the website isn't there, block it
            willBlock = true;
            whiteList.forEach(element => {
                if (pathName.toLowerCase().includes("/r/" + element.toLowerCase()) || pathName.toLowerCase().includes("/user/" + element.toLowerCase()))
                {
                    willBlock = false;
                }
            })
            
            // I need to do testing to see if this works, because it could very well not work
            if (willBlock)
            {
                //document.getElementsByTagName('body')[0].innerHTML = "<k>STOP PROCRASTINATING ON REDDIT</k> <p>You may only go to reddit comment pages</p> <p>Extension built by <a style=\"color:blue\" href=\"https://henryz.dev/\">Henry Zhang</a></p>";
                window.location.href = "https://hz757.github.io/PortfolioWebsite/RedditLiberationRedirect.html";
            }
        }
    }
    else
    {
        //document.getElementsByTagName('body')[0].innerHTML = "<k>STOP PROCRASTINATING ON REDDIT</k> <p>You may only go to reddit comment pages</p> <p>Extension built by <a style=\"color:blue\" href=\"https://henryz.dev/\">Henry Zhang</a></p>";
        window.location.href = "https://hz757.github.io/PortfolioWebsite/RedditLiberationRedirect.html";
    }

    setInterval(deleteCommentAndLogo, 100)
});
