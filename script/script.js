var select = "";
var isStart = true;
$(document).ready(function()
{
    chrome.storage.sync.get('enabled', function(result) 
    {
        isStart= result.enabled;
    });
    if(isStart)
    {
        BuildSelct();
        switch(GetSearchType())
        {
            case 1:
            {
                ChangeBing();
                break;
            }
            case 2:
            {
                ChangeBaidu();
                break;
            }
            case 3:
            {
                Change360();
                break;
            }
        }
    }
});

function BuildSelct()
{
    select += "<select id='searchChoose'>";
    select += "<option value='http://cn.bing.com/search?q='>必应</option>";
    select += "<option value='https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=2&tn=baiduhome_pg&wd='>百度</option>";
    select += "<option value='https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q='>360</option>";
    select += "</select>";
}

function GetSearchType()
{
    var url = window.location.href;
    var bing = "http://cn\\.bing\\.com/.*";
    var patterBing = new RegExp(bing);
    if(patterBing.exec(url)==url)
    {
        return 1;
    }
    var baidu = "https://w{0,3}\\.baidu\\.com/.*";
    var patterBaidu = new RegExp(baidu);
    if(patterBaidu.exec(url)==url)
    {
        return 2;
    }
    var _360 = "https://www\\.so\\.com/.*";
    var patter360 = new RegExp(_360);
    if(patter360.exec(url)==url)
    {
        return 3;
    }
}

function ExecSearch(key)
{
    var url = $("#searchChoose").val();
    url += key;
    window.location.href= url;
}

function ChangeBing()
{
    $(".b_searchbox").after(select);
    $("#searchChoose").addClass("bing");
    $("#sb_form_go").attr("type","button");
    $("#sb_form_go").click(function()
    {
        var key = $("#sb_form_q").val();
        ExecSearch(key);
    });
}

function ChangeBaidu()
{
    $(".s_ipt_wr").after(select);
    $("#searchChoose").addClass("baidu");
    $("#su").attr("type","button");
    $("#su").click(function()
    {
       var key = $("input[name=oq]").val();
       ExecSearch(key); 
    });
}

function Change360()
{
    $("#su").before(select);
    $("#searchChoose").addClass("_360");
    $("#su").attr("type","button");
    $("#su").click(function()
    {
       var key = $("#keyword").val();
       ExecSearch(key); 
    });
}