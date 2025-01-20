//require('dotenv').config();

//let map= document.getElementById("map"); map already knows how to do this so this is not needed
let map = L.map("map").setView([ 51.0447, -114.0719], 6);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


//getting location
const apiKey = "at_vEyWH0UnQzTGPgKwGH4QywpSUy0C4";
//const apiKey = process.env.API_KEY;

$( window ).on( "load", () =>{
    getYourIP().then(ip =>{
        //console.log(ip);
        $("#ipaddress").append(`<h4>${ip.ip}</h4>`)
        $("#location").append(`<h4>${ip.location.region},${ip.location.country}</h4>`)
        $("#timezone").append(`<h4>${ip.location.timezone}</h4>`)
        $("#isp").append(`<h4>${ip.isp}</h4>`)
    })
});

$("button").on("click", ()=>{
    $("#ipaddress h4, #location h4, #timezone h4, #isp h4").remove();
    const ipAddress = $("input").val();
    const url = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`;
    searchForIP(url).then(ip =>{
                //console.log(ip);
                $("#ipaddress").append(`<h4>${ip.ip}</h4>`)
                $("#location").append(`<h4>${ip.location.region},${ip.location.country}</h4>`)
                $("#timezone").append(`<h4>${ip.location.timezone}</h4>`)
                $("#isp").append(`<h4>${ip.isp}</h4>`)
            })

    
})





async function getYourIP(){
    try{
        const response = await fetch (`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`);
        if (response.ok){
            const jsonResponse = await response.json();
            
            return jsonResponse;
        }
        
    }
    catch(error){
        console.log(error)
    }
}

async function searchForIP(url){
    try{
        const response = await fetch(url);
        if (response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        }
        
    }
    catch(error){
        console.log(error)
    }
}