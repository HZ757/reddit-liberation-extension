whiteList = ["learnprogramming"];
blackList = ["askreddit"];

pathName = window.location.pathname;

// check if not a comment section, and not a whitelisted subreddit
if (pathName != null )
{
    if (pathName.includes("comments"))
    {
        // check the blacklist to see
        blackList.forEach(element => {
            if (pathName.includes("/r/" + element))
            {
                document.getElementsByTagName('body')[0].innerHTML = "<k>STOP PROCRASTINATING ON REDDIT</k> <p>You may only go to reddit comment pages</p>";
            }
        })
    }
    else
    {
        console.log("2");
        // check each member of the whitelist, if the website isn't there, block it
        willBlock = true;
        whiteList.forEach(element => {
            if (pathName.includes("/r/" + element))
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

