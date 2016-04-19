var isStart = true;
window.onload = function()
{
    document.getElementById("option_button").addEventListener("click",ChangeStatus);
    chrome.storage.sync.get('enabled', function(result) 
    {
        isStart= result.enabled;
        UpdateStatus();
    });
}

function ChangeStatus()
{
    isStart = !isStart;
    UpdateStatus();
    chrome.storage.sync.set(
    {
        'enabled': isStart
    }, function() {});
}

function UpdateStatus()
{
    if(!isStart)
    {
        document.getElementById("option_button").className = "stop";
        document.getElementById("option_button").innerText = "禁   用";
        chrome.browserAction.setIcon(
        {
            path: '../res/stop.png'
        });
    }
    else
    {
        document.getElementById("option_button").className = "start";
        document.getElementById("option_button").innerText = "启  用";
        chrome.browserAction.setIcon(
        {
            path: '../res/start.png'
        });
    }
}