// Write your client side Javascript code here

function main()
{
    document.getElementById("boton").addEventListener('click',function()
    {
        document.getElementById("wins").textContent="Winstreak: 0";

        const req = new XMLHttpRequest();
        req.open("GET","https://intense-oasis-08149.herokuapp.com/profile:reset",true);
        req.send();
    });
    


    
}

document.addEventListener('DOMContentLoaded', main);