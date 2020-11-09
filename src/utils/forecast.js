const request = require('request')

const forecast = (latitude, longitude, callback) =>{

    const url ='http://api.openweathermap.org/data/2.5/weather?lat='+ encodeURIComponent(latitude)+'&lon='+ encodeURIComponent(longitude)+'&units=metric&appid=acd1fa3fde33f152c598b3fc7592b945'

    request({url, json: true}, (error, {body})=>{
    if(error)
    {
        callback("Unable to connect to weather service", undefined)
    }
    else if(body.message)
    {
        callback("Error Finding Location", undefined)
    }
    else{
             const weather = body.weather[0].main 
             const temp = body.main.temp_max 
             const rain = body.clouds.all 
             callback(undefined, weather+" Throughout the day. It is currently "+ temp +". There is a " +  rain + " % chance of rain ")
        }
    }
)}

module.exports = forecast