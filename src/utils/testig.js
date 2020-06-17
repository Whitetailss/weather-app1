const request = require('request')

const geocodeURL =
`http://api.weatherstack.com/current?access_key=aa911a13fae26a7d246ce8503e647544&query=-75.7088,asfndksajf44.1asdf545&units=m`

request({ url: geocodeURL, json: true }, (error, response) => { 

    const data = response

    console.log(data.body)
    
    })