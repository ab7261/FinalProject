// Write your client side Javascript code here


function main()
{
    
    const submit = document.getElementById("button");
    const playagain = document.getElementById("booton");
    playagain.style.display="none";
    const gohome = document.getElementById("buon");
    gohome.style.display="none";
    const giveup = document.getElementById("boton");

    document.getElementById("acname").value= "Actor Name";
    document.getElementById("og").value = "Movie Name";


   

    submit.addEventListener("click",function()
    {
let button = new XMLHttpRequest();
    button.open('POST','https://intense-oasis-08149.herokuapp.com/gamepage',true);
    button.setRequestHeader('Content-Type', 'application/json');

    function solver(func,arr,var1,var2)
    {
        let bool = false;
        for(let i = 1; i<arr.length;i++)
        {
            if(func(arr[i])&&!bool)
            {
                if(var1==="")
                var1+=(arr[i])
                else
                var1+=(" "+ arr[i]);
            }
            else if(func(arr[i])&&bool)
            {
                if(var2==="")
                var2+=(arr[i])
                else
                var2+=(" "+ arr[i]);
            }

            else
            {
                bool = true;
            }


        }

        return var1 + "%" + var2;
    }

    function isVal (val)
    {
        if(val==="to")
        {
            return false;
        }
        else
        {
            return true;
        }
    }

   
    
    const actor = document.getElementById("acname").value; //New Actor NOT PASSED IN
    const operator = document.getElementById("fir").textContent.split(" ");

    const var1 = "";
    const var2 = "";
    const valarr = solver(isVal,operator,var1,var2).split("%");
    const cactor = valarr[0]; //Old Actor emovie.actoron
    const og = valarr[1]; //Final Goal movie.actortwo
    const movie = document.getElementById("og").value; //Movie
    const sendme = {
        "og":og,
        "cactor": cactor,
        "actor":actor,
        "movie":movie
    };

    console.log(sendme);
    
    button.onload=function()
{
    const arr = [];
    let response = button.responseText;
    console.log(response);
    arr.push(response);

    function mappy (val)
    {
        if(val=="1")
        {
            return "wrong";
        }
       else if(val=="2")
        {
            return "next";
        }
       else if(val=="3")
       {
           return "finished";
       }
       else
       {
           return "ERROR";
       }
    }
    const result = arr.map(mappy);
    document.getElementById("acname").value = "Actor Name";
    document.getElementById("og").value = "Movie Name";
    const message = document.getElementById("pen");
    const first = document.getElementById("fir");
    const second = document.getElementById("prin");
    switch(result[0])
    {
        case "wrong":
        message.textContent= "Nope, try again";
        document.getElementById("acname").value = "Actor Name";
        document.getElementById("og").value = "Movie Name";
            break;
        case "next":
            message.textContent= "Nice work!";
            first.textContent= "Connect " + actor + " to " + og;
            second.textContent= actor + " starred with";
            document.getElementById("acname").name = actor;
        break;
        case "finished":
            message.textContent= "Nice work! You Won!";
            first.style.display="none";
            second.style.display="none";
            document.getElementById("acname").style.display="none";
            document.getElementById("desc").style.display="none";
            document.getElementById("og").style.display="none";
            document.getElementById("button").style.display="none";
            document.getElementById("boton").style.display="none";
            playagain.style.display="inline";
            gohome.style.display="inline";
        break;
        case "ERROR":
        console.log("error");
        break;
        default:
        console.log("missed");
    }
}
    button.send(JSON.stringify(sendme));
});





    
}



document.addEventListener('DOMContentLoaded', main);