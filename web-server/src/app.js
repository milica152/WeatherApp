const express = require('express');
const path = require('path');
const hbs = require('hbs');
const weatherstack = require('./utils/weatherstack');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;
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

app.get('/weather', async (req, res) => {
    if(!req.query.address) return res.send({ error: "You must provide an address" });
    
    const {error, data={}} = await geocode(req.query.address);
    if(error) return res.send({ error });
    
    const {weatherError, weatherData={}} = await weatherstack(data.longitude, data.latitude);
    if(weatherError) return res.send({error: weatherError});
    return res.send({
        forecast: weatherData.forecast,
        location: data.location ,
        address: req.query.address
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 page",
        creator: "Milica Medic",
        message: "Page not found."
    });
});

app.listen(port, () => {
});