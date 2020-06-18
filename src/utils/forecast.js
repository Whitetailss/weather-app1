const request = require('request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })


// const fakeurl = `http://api.weatherstack.com/current?access_key=aa911a13fae26a7d246ce8503e647544&query=-75.7088,44.1545&units=m`


const forecast = (latitude, longitude, callback) => {
    const url = 
`http://api.weatherstack.com/current?access_key=aa911a13fae26a7d246ce8503e647544&query=${latitude},${longitude}&units=m`

request( {url: url, json: true }, (error,response) => {

    const data = response.body.current

    const {weather_descriptions, temperature, feelslike, humidity, precip} = data

    let bringUmbrella = ''

    if (precip > 0){
        bringUmbrella = `You should bring an umbrella because chances of rain is ${precip} %`
    } else {
        bringUmbrella = `Umbrella not needed, enjoy your hands free!`
    }

    if (error) {
        callback('Unable to connect to location services', undefined)
    } else if (response.body.error) {
        callback('Unable to find coordinates. Try another search', undefined)
    } else {

        callback(undefined, 

         (`${weather_descriptions}: Temperature dfdis ${temperature}, it feels like ${feelslike}, humidity is ${humidity}. ${bringUmbrella}`)
        )

        console.log(response.body.current)
    } 
})
}



module.exports = forecast

// forecast(-75.7088, 44.1545, (error, data) => {
//         console.log('Error', error)
//         console.log('Data', data)
//       })
