const fetch = require("node-fetch");

const geocode = async (address) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWlsaWNhLW1lZGljIiwiYSI6ImNrbnlsM2pvMTFpMGUybnFuNG5ramJ2Y20ifQ.LUzC0glo45Q6K9zp0fqYQQ&limit=1`;
    try{
        var response = await fetch(url);
        response = await response.json();
        if(!response.features || !response.features[0]){
            return {error : "Unable to find location. Try again.", data: undefined};
        } else if(response.error){
            return {error : response.error, data:undefined};
        } else{
            const coordinates = response.features[0].center;
            return {
                error : undefined, 
                data : {
                    longitude: coordinates[0],
                    latitude: coordinates[1],
                    location: response.features[0].place_name
                }
            };
        }
    } catch(e){
        return {error : 'Unable to connect to network.', data: undefined};
    }
};

module.exports = geocode;