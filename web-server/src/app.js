const express = require('express');
const path = require('path');
const hbs = require('hbs');
const weatherstack = require('./utils/weatherstack');
const geocode = require('./utils/geocode');

const app = express();
const publicDirPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDirPath));
app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        creator: "Milica Medic"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        creator: "Milica Medic",
        message: "This is help page"
    });
});

app.get('/help/*', (req, res) => {
    res.send('Help article not found.');
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: "Milica",
        bio: "Short bio",
        title: "About page"
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        });
    }
    
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
        
        weatherstack(longitude, latitude, (error, weatherData) => {
            if(error){
                return res.send({error});
            }
            return res.send({
                forecast: weatherData.forecast,
                location: location ,
                address: req.query.address
            });
        })
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 page",
        creator: "Milica Medic",
        message: "Page not found."
    });
});

app.listen(3000, () => {
});