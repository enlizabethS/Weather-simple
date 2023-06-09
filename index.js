//https://get.geojs.io/v1/ip/geo.json
const box = document.getElementById("weather-box");
const weathercodeElement = document.getElementById("weathercode");
const cityElement = document.getElementById("city");
const temperatureElement = document.getElementById("temperature");
const windElement = document.getElementById("wind");

function getweatherByCode(code){
    switch(code){
        case 0:
            return "Clear sky";
            case 1:
                return "Mainly clear";
            case 2: 
            return "Partly cloudyr";
            case 3:
                return "Overcast";
            case 42:
                return "Fog";
                case 48:
                    return "Depositing rime fog";
                    //61, 63, 65	
                 case 61: 
                 return "Slight rain";
                 case 63:
                    return "Moderate rain, moderate and heavy intensity";
                    case 65:
                        return "Heavy intensity rain";
            default:
            return " - ";
}
}


async function f(){
   const response = await fetch ("https://get.geojs.io/v1/ip/geo.json");
   const obj = await response.json();
//    console.log(obj);
   const {city,latitude,longitude}=obj;
   console.log(city + " " + latitude + " " + longitude);

   const weatherResponse = await fetch(
   `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`);
   const weatherObj = await  weatherResponse.json();
//   console.log(weatherObj.current_weather);
  const {temperature, windspeed, weathercode} = weatherObj.current_weather;
  console.log(temperature + " " + windspeed + " " + weathercode);
  
  cityElement.innerText = city;
  temperatureElement.innerText = temperature + "°C";
  weathercodeElement.innerText = getweatherByCode(weathercode);
  windElement.innerText = windspeed;

  }
  
  f();