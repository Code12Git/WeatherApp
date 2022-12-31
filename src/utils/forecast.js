const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=c279fba41f0580e22255245e44f7b96b&query='+ latitude+ ','+ longitude +'& units=f'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.It feels like " + response.body.current.feelslike +" and humidity is " + response.body.current.humidity)
        }
    })
}

module.exports=forecast