/**
 * @file Current/Forcast weather fetcher.
 * 
 * @name weather
 * @see fetch.js Found in `./services/modules/fetch/fetch.js`
 * @usage new <Services>().weather.get(object)
 */

/**
 * Get the weather of a location as well as the forcast.
 * 
 * @name weather
 */

module.exports = class weather {

    /**
     * This constructor sets up presets required by the `get()` function.
     * 
     * @name constructor
     */
    
    constructor() {
        this.fetch = require(`../fetch/fetch.js`)
    }

    /**
     * This function gets the data decodes into JSON format.
     * 
     * @name get
     * @param {object} options An object with the options such as degree type or data language (Defaults exist).
     * @param {function} callback Where the data from the request is directed to.
     * @return {object} An object that contain current weather data and forecast data.
     */

    get(options, callback) {
        if (typeof callback !== `function`) callback = (err, result) => { return err || result }
        if (!options || typeof options !== `object`) return callback(`invalid options`)
        if (!options.search) return callback(`missing search input`)
        let [xml2JS, result] = [require(`./parser.js`), new Array()]

        this.fetch(`http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype=${options.degreeType || `F`}&culture=${options.lang || `en-US`}&weasearchstr=${require(`querystring`).escape(options.search)}`).then(async res => {
            let body = await res.text()
            if (!body) return callback(new Error(`failed to get body content`));
            if (body.indexOf(`<`) !== 0) {
                if (body.search(/not found/i) !== -1) return callback(null, result)
                return callback(new Error(`invalid body content`))
            }
            new xml2JS.Parser({ charkey: `C$`, attrkey: `A$`, explicitArray: true }).parseString(body, (err, resultJSON) => {
                if (err) return callback(err)
                if (!resultJSON || !resultJSON.weatherdata || !resultJSON.weatherdata.weather) return callback(new Error(`failed to parse weather data`));
                if (resultJSON.weatherdata.weather[`A$`] && resultJSON.weatherdata.weather[`A$`].errormessage) return callback(resultJSON.weatherdata.weather[`A$`].errormessage);
                if (!(resultJSON.weatherdata.weather instanceof Array)) return callback(new Error(`missing weather info`))
                let [weatherLen, weatherItem] = [resultJSON.weatherdata.weather.length]
                for (let i = 0; i < weatherLen; i++) {
                    if (typeof resultJSON.weatherdata.weather[i][`A$`] !== `object`) continue
                    weatherItem = {
                        location: {
                            name: resultJSON.weatherdata.weather[i][`A$`][`weatherlocationname`],
                            zipcode: resultJSON.weatherdata.weather[i][`A$`][`zipcode`],
                            lat: resultJSON.weatherdata.weather[i][`A$`][`lat`],
                            long: resultJSON.weatherdata.weather[i][`A$`][`long`],
                            timezone: resultJSON.weatherdata.weather[i][`A$`][`timezone`],
                            alert: resultJSON.weatherdata.weather[i][`A$`][`alert`],
                            degreetype: resultJSON.weatherdata.weather[i][`A$`][`degreetype`],
                            imagerelativeurl: resultJSON.weatherdata.weather[i][`A$`][`imagerelativeurl`],
                            url: resultJSON.weatherdata.weather[i][`A$`][`url`],
                            code: resultJSON.weatherdata.weather[i][`A$`][`weatherlocationcode`],
                            entityid: resultJSON.weatherdata.weather[i][`A$`][`entityid`],
                            encodedlocationname: resultJSON.weatherdata.weather[i][`A$`][`encodedlocationname`]
                        },
                        current: null,
                        forecast: null
                    }
                    if (resultJSON.weatherdata.weather[i][`current`] instanceof Array && resultJSON.weatherdata.weather[i][`current`].length > 0) {
                        if (typeof resultJSON.weatherdata.weather[i][`current`][0][`A$`] === `object`) {
                            weatherItem.current = resultJSON.weatherdata.weather[i][`current`][0][`A$`]
                            weatherItem.current.imageUrl = `${weatherItem.location.imagerelativeurl}law/${weatherItem.current.skycode}.gif`
                        }
                    }
                    if (resultJSON.weatherdata.weather[i][`forecast`] instanceof Array) {
                        weatherItem.forecast = new Array()
                        for (let k = 0; k < resultJSON.weatherdata.weather[i][`forecast`].length; k++) if (typeof resultJSON.weatherdata.weather[i][`forecast`][k][`A$`] === `object`) weatherItem.forecast.push(resultJSON.weatherdata.weather[i][`forecast`][k][`A$`])
                    }
                    result.push(weatherItem)
                }
                return callback(null, result)
            })
        }).catch(() => null)
    }
}
