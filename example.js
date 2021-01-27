let services = require(`./services.js`)
console.log(`\nJonin-Services: Testing all service modules`)
setTimeout(_ => this.run(), 2000)

module.exports.run = async _ => {
    await this.binary()
    await this.chatbot()
    await this.endecodify()
    await this.env()
    await this.fetch()
    await this.moment()
    await this.osu()
    await this.profanity()
    await this.sloc()
    await this.weather()
}

module.exports.binary = async _ => {

    /**
     * @file Binary converter.
     * 
     * @name binary
     * @usage new <Services>().binary.encode(string), new <Services>().binary.decode(string), new <Services>().binary.auto(string)
     */

    /**
     * Converts input text into binary or ascii depending on params.
     * 
     * @name binary
     */

    let binary = new services().binary

    console.log(`\nJonin-Services: Testing Modules [binary]\n`)
    console.log(`\tDetect:`, `Hi`, `=>`, binary.auto(`Hi`))
    console.log(`\tDetect:`, `0100100001101001`, `=>`, binary.auto(`0100100001101001`))
    console.log(`\tEncode:`, `Hi`, `=>`, binary.encode(`Hi`))
    console.log(`\tDecode:`, `0100100001101001`, `=>`, binary.decode(`0100100001101001`))
    return
}

module.exports.chatbot = async _ => {

    /**
     * @file Chatbot with history.
     * 
     * @name chatbot
     * @see Object.mergify() Found in `services.js`
     * @see fetch.js Found in `./services/modules/fetch/fetch.js`
     * @usage await new <Services>().chatbot.get(string, array)
     */

    /**
     * Takes the history of the chat and the current message to make a proper response.
     * 
     * @name chatbot
     */

    let chatbot = new services().chatbot
    
    console.log(`\nJonin-Services: Testing Modules [chatbot]\n`)
    let noHistoryChat = await chatbot.get(`Hi`)
    console.log(`\tHistory [\u274C]:`, `Input: Hi`, `||`, `Result: ${noHistoryChat}`)
    let historyChat = await chatbot.get(`Hi`, [`Hello There!`, `What's up?`])
    console.log(`\tHistory [\u2714\uFE0F]:`, `Input: Hi`, `||`, `History: Hello There! (User), What's up? (Bot)`, `||`, `Result: ${historyChat}`)
    return
}

module.exports.endecodify = async _ => {

    /**
     * @file Encode & Decode keys for safe keeping.
     * 
     * @name endecodify
     * @see Object.mergify() Found in `services.js`
     * @usage process.encode(string), process.decode(string), new <Services>().endecodify.encode(string), new <Services>().endecodify.decode(string)
     */

    /**
     * This class encodes and decodes keys for safe keeping.
     * 
     * Check console for args (e.g. npm start encode text).
     * 
     * @name endecodify
     */

    let endecodify = new services().endecodify

    console.log(`\nJonin-Services: Testing Modules [endecodify]\n`)
    let encoded = endecodify.encode(`Hi`).data
    let processEncoded = process.encode(`Hi`).data
    console.log(`\tEncode:`, `Hi`, `=>`, encoded)
    console.log(`\tDecode:`, encoded, `=>`, endecodify.decode(encoded).data)
    console.log(`\tProcess Encode:`, `Hi`, `=>`, processEncoded)
    console.log(`\tProcess Decode:`, processEncoded, `=>`, process.decode(processEncoded).data)
    return
}

module.exports.env = async _ => {

    /**
     * @file Access `.env` through process.
     * 
     * @name env
     * @see Object.mergify() Found in `services.js`
     * @usage  new <Services>().env.config()
     */

    new services().env.config()

    console.log(`\nJonin-Services: Testing Modules [env]\n`)
    console.log(`\tENV Token:`, `\"./env\"`, `=>`, `TOKEN`, `=>`, process.env.TOKEN)
    return
}

module.exports.fetch = async _ => {

    /**
     * @file node-fetch module.
     * 
     * @name fetch
     * @usage new <Services>().fetch(string)
    */

    let fetch = new services().fetch

    console.log(`\nJonin-Services: Testing Modules [fetch]\n`)
    let jsonFetch = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
    console.log(`\tFetch JSON:`, `\"https://jsonplaceholder.typicode.com/todos/1\"`, `=>`, await jsonFetch.json())
    return
}

module.exports.moment = async _ => {

    /**
     * @file moment-duration-format module.
     * 
     * @name moment
     * @usage new <Services>().moment(module[MOMENT])
     */

    let moment = require(`moment`) // https://www.npmjs.com/package/moment
    new services().moment(moment)

    console.log(`\nJonin-Services: Testing Modules [moment]\n`)
    console.log(`\tTime Duration:`, `(Time Now + 500000000 ms) - Time Now`, `=>`, moment.duration((new Date().getTime() + 500000000) - new Date().getTime()).format(`w [Weeks], d [Days], h [Hours], m [Minutes], s [Seconds]`))
    return
}

module.exports.osu = async _ => {

    /**
     * @file osu! info module.
     * 
     * @name osu
     * @see Object.mergify() Found in `services.js`
     * @usage new <Services>(object[TOKEN]).osu.getUser(object[USER])
     */

    /**
     * Get user/beatmap info with the osu module.
     * 
     * @name osu
    */

    let token = `` // ADD TOKEN HERE
    let osu = new services({ osu: token }).osu

    console.log(`\nJonin-Services: Testing Modules [osu]\n`)
    if (!token) return console.log(`\tOsu Service Issue: No token provided [Visit https://osu.ppy.sh/p/api/ to get a token]`)
    let osuUser = await osu.getUser({ u: `fangary12` })
    console.log(`\tUser Fetch:`, `fangary12`, `=>`, JSON.stringify(osuUser))
    return
}

module.exports.profanity = async _ => {

    /**
     * @file Clear out profanity from text.
     * 
     * @name profanity
     * @usage new <Services>().profanity.clean(string)
     */

    /**
     * Replaces all profane words in text with preset characters.
     * 
     * @name profanity
     */

    let profanity = new services().profanity

    console.log(`\nJonin-Services: Testing Modules [profanity]\n`)
    console.log(`\tProfanity Cleaner:`, `So much damn code`, `=>`, profanity.clean(`So much damn code`))
    return
}

module.exports.sloc = async _ => {

    /**
     * @file File data and sloc getter.
     * 
     * @name sloc
     * @usage new <Services>().sloc.readFile(string)
     */

    /**
     * Read file data and get information such as sloc and comments.
     * 
     * @name sloc
     */

    let { readFileSync } = require(`fs`)
    let sloc = new services().sloc

    console.log(`\nJonin-Services: Testing Modules [sloc]\n`)
    console.log(`\tSource Lines Of Code:`, `\"./example.js\"`, `=>`, JSON.stringify(sloc.readFile(readFileSync(`./example.js`, `utf8`))))
    return
}

module.exports.weather = async _ => {

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

    let weather = new services().weather

    console.log(`\nJonin-Services: Testing Modules [weather]\n`)
    await weather.get({ degreeType: `F`, lang: `en-US`, search: `dallas, tx` }, (err, res) => {
        if (err) { }
        console.log(`\tWeather/Forecast:`, `\"Dallas, TX\"`, `=>`, JSON.stringify(res))
    })
    return
}
