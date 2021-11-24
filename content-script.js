chrome.storage.sync.get(['userData'], function(result) {
    whiteList = result.userData.whiteList;
    blackList = result.userData.blackList;

    pathName = window.location.pathname;

    // check if not a comment section, and not a whitelisted subreddit
    if (pathName != null )
    {
        if (pathName.includes("comments"))
        {
            // check the blacklist to see
            blackList.forEach(element => {
                if (pathName.toLowerCase().includes("/r/" + element.toLowerCase()))
                {
                    document.getElementsByTagName('body')[0].innerHTML = "<k>STOP PROCRASTINATING ON REDDIT</k> <p>You may only go to reddit comment pages</p>";
                }
            })

            if (!window.location.href.includes("old."))
            {
                setTimeout(() => {  
                    document.getElementsByClassName('_2l7c_Oz0UVsamALvPrlznq')[0].innerHTML = ""
                }, 5000);
            }
            
        }
        else
        {
            console.log("2");
            // check each member of the whitelist, if the website isn't there, block it
            willBlock = true;
            whiteList.forEach(element => {
                if (pathName.toLowerCase().includes("/r/" + element.toLowerCase()))
                {
                    willBlock = false;
                }
            })
            
            // I need to do testing to see if this works, because it could very well not work
            if (willBlock)
            {
                document.getElementsByTagName('body')[0].innerHTML = "<k>STOP PROCRASTINATING ON REDDIT</k> <p>You may only go to reddit comment pages</p>";
            }
        }
    }
    else
    {
        document.getElementsByTagName('body')[0].innerHTML = "<k>STOP PROCRASTINATING ON REDDIT</k> <p>You may only go to reddit comment pages</p>";
    }
});
