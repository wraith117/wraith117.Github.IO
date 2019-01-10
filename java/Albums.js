window.onload = function()
{
console.log("Ready")
}

var bool = false

function navigation()
{
    if(bool == false) 
    {
        document.getElementById("Albums").style.width = "400px";
        document.getElementById("Background").style.marginLeft = "400px";
        bool = true;
    }

    else 
    {
        document.getElementById("Albums").style.width = "15px";
        document.getElementById("Background").style.marginLeft = "15px";
        bool = false;
    }
}

