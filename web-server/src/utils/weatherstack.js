const fetch = require("node-fetch");

const weatherstack =  async (longitude, latitude) => {
    const url = `http://api.weatherstack.com/current?access_key=8d6cdf5b4440b48c7bc11f487f3575cb&query=${latitude},${longitude}`;
    try{
        var response = await fetch(url);
        response = await response.json();
        if(response.error){
            return {error: response.error, weatherData: undefined};
        } else{
            const data = response.current;
            return {
                error: undefined, 
                weatherData: {
                    forecast: `Weather is ${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out.  It feels like ${data.feelslike} degrees out.`
                }
            }
        }
    } catch(e){
        return {error: 'Unable to connect to network.', weatherData: undefined};
    }
}; 

module.exports = weatherstack;