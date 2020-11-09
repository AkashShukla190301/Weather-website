const path = require('path')
const hbs = require('hbs')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')



const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlers engine and views location
app.set('view engine', 'hbs')  // handle bar setups
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



// views
app.get('', (req, res) =>{
    res.render('index', {
        title : "Weather",
        name : "Akash Shukla"
    })
})


app.get('/about', (req, res)=>{
    res.render('about', {
        title : "About Me",
        name : "Akash Shukla"
    })
})



app.get('/help', (req, res) =>{
    res.render('help', {
        title : "Help",
        name : "Akash Shukla",
        message : " Welcome to Help page !"
    })
})



app.get('/weather', (req, res)=>{

    address = req.query.address
    if(!address)
    {
        return res.send({
            error : "Provide an address"
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) =>{
        var message;
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, ForecastData) =>{
            if(error)
            {
                return res.send({error})
            }
            else{
                res.send({
                    forecast: ForecastData,
                    location,
                    address
                })
            }
        })
    })
})




app.get('/help/*', (req, res)=>{
    res.render('404', {
        title : '404',
        name : "Akash Shukla",
        message : "Help article not found"
    })
})



// 404 pages this comes at last 
app.get('*', (req, res)=>{
    res.render('404', {
        title : '404',
        name : "Akash Shukla",
        message : "Page not found"
    })
})


// Server Start
app.listen(port, () =>{
    console.log("Server is up on port " + port)
})