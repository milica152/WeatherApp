const request = require("request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWlsaWNhLW1lZGljIiwiYSI6ImNrbnlsM2pvMTFpMGUybnFuNG5ramJ2Y20ifQ.LUzC0glo45Q6K9zp0fqYQQ&limit=1';

    request({url: url, json:true}, (error, response) => {
        //console.log();
        //console.log();
        //console.log("Response is : " + JSON.stringify(response.body));
        if(error){
            callback('Unable to connect to network.', undefined)
        } else if(response.body.features === undefined || response.body.features[0] === undefined){
            callback("Unable to find location. Try again.", undefined);
        } else if(response.body.error){
            callback(response.body.error, undefined);
        } else{
            const coordinates = response.body.features[0].center;
            callback(undefined, {
                longitude: coordinates[0],
                latitude: coordinates[1],
                location: response.body.features[0].place_name
            });
        }
    })
};

module.exports = geocode;