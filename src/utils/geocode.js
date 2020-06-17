const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoicm9nZXJhbWFkZXVzIiwiYSI6ImNrYmFsM2JobzBwNGoycHA1dTJ3MnFndHoifQ.pPmQucqkmOrnypgGTqYbfA`

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


// const geocode = (address, callback) => {
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoicm9nZXJhbWFkZXVzIiwiYSI6ImNrYmFsM2JobzBwNGoycHA1dTJ3MnFndHoifQ.pPmQucqkmOrnypgGTqYbfA`
    

// request({ url: url, json: true }, (error, response) => { 

//     console.log(response)

//  const data = response.body.features[0]


//  const {place_name, center} = data

//     if (error) { 
//     callback('Unable to connect to location services!', undefined) 
// } else if (response.body.features.length === 0) { 
//     callback('Unable to find location. Try another search.', undefined)
// } else {
//             callback(undefined, {
//                 latitude: center[1],
//                 longitude: center[0],
//                 location: place_name
// }) }
//  })}
module.exports = geocode

