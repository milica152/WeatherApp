const request = require("request");

const weatherstack = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8d6cdf5b4440b48c7bc11f487f3575cb&query=' + latitude + ',' + longitude;
    //console.log(url);
    request({url: url, json:true}, (error, response) => {
        //console.log();
        //console.log();
        //console.log(response.body);
        if(error){
            callback('Unable to connect to network.', undefined)
        } else if(response.body.error){
            callback(response.body.error, undefined);
        } else{
            const data = response.body.current;
            callback(undefined, {
                forecast: "Weather is " + data.weather_descriptions[0] + ". It is currently " + data.temperature + " degrees out.  It feels like " + data.feelslike + " degrees out."
            })
        }
    })
}; 

module.exports = weatherstack;