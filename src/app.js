const path = require ('path')
const express = require ('express')
const hbs = require ('hbs')

const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express ()
const port = process.env.PORT || 3000;

console.log(port)

const templateDirectoryPath = (path.join(__dirname, '../templates/views'))
const publicDirectoryPath = (path.join(__dirname, '../public'))
const partialsPath = (path.join(__dirname, '../templates/partials'))

app.set('view engine', 'hbs');
app.set('views', templateDirectoryPath)

app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sebastian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sebastian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'What can i help you?',
        title: 'Help',
        name: 'Sebastian'
    })
})

app.get('/weather', (req,res) => {

    if(!req.query.address) {
        res.send({
            error: 'please input a valid address'
        })
    } 

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


    // geocode(req.query.address, (error, data) => {

    //     if(data === undefined){
    //         data = {}
    //     }

    //     const {latitude, longitude} = data
    
    //   if (error) {
    //     return  console.log('Error', error)
    //   }
    //     console.log('Data', data)

    //     forecast(latitude, longitude, (error, forecastData) => {
    //       if (error) {
    //         return console.log('Error', error)
    //       }
    //       console.log('Data', forecastData)

    //       res.send( {
    //         forecast: forecastData,
    //         location: data.location,
    //         address: req.query.address
    //     })
    //     })

    // })
})

app.get('/product', (req, res) =>{
    console.log(req.query)

    if (!req.query.search) {
        res.send({
            error: 'please input the correct search items'})     
    } else {
    res.send({
        products: []
    })
}
})



app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Sebastian',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Sebastian',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`port is listening at ${port}`)
})
