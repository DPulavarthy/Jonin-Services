let services = require(`./services.js`)
console.log(`\nGanyu-Services: Testing all service modules`)
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
    let binary = new services().binary

    console.log(`\nGanyu-Services: Testing Modules [binary]\n`)
    console.log(`\tDetect:`, `Hi`, `=>`, binary.auto(`Hi`))
    console.log(`\tDetect:`, `0100100001101001`, `=>`, binary.auto(`0100100001101001`))
    console.log(`\tEncode:`, `Hi`, `=>`, binary.encode(`Hi`))
    console.log(`\tDecode:`, `0100100001101001`, `=>`, binary.decode(`0100100001101001`))
    return
}

module.exports.chatbot = async _ => {
    let chatbot = new services().chatbot

    console.log(`\nGanyu-Services: Testing Modules [chatbot]\n`)
    let noHistoryChat = await chatbot.get(`Hi`)
    console.log(`\tHistory [\u274C]:`, `Input: Hi`, `||`, `Result: ${noHistoryChat}`)
    let historyChat = await chatbot.get(`Hi`, [`Hello There!`, `What's up?`])
    console.log(`\tHistory [\u2714\uFE0F]:`, `Input: Hi`, `||`, `History: Hello There! (User), What's up? (Bot)`, `||`, `Result: ${historyChat}`)
    return
}

module.exports.endecodify = async _ => {
    let endecodify = new services().endecodify

    console.log(`\nGanyu-Services: Testing Modules [endecodify]\n`)
    let encoded = endecodify.encode(`Hi`)
    let processEncoded = process.encode(`Hi`)
    console.log(`\tEncode:`, `Hi`, `=>`, encoded)
    console.log(`\tDecode:`, encoded, `=>`, endecodify.decode(encoded))
    console.log(`\tProcess Encode:`, `Hi`, `=>`, processEncoded)
    console.log(`\tProcess Decode:`, processEncoded, `=>`, process.decode(processEncoded))
    return
}

module.exports.env = async _ => {
    new services().env.config()

    console.log(`\nGanyu-Services: Testing Modules [env]\n`)
    console.log(`\tENV Token:`, `\"./env\"`, `=>`, `TOKEN`, `=>`, process.env.TOKEN)
    return
}

module.exports.fetch = async _ => {
    let fetch = new services().fetch

    console.log(`\nGanyu-Services: Testing Modules [fetch]\n`)
    let jsonFetch = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
    console.log(`\tFetch JSON:`, `\"https://jsonplaceholder.typicode.com/todos/1\"`, `=>`, await jsonFetch.json())
    return
}

module.exports.moment = async _ => {
    let moment = require(`moment`) // https://www.npmjs.com/package/moment
    new services().moment(moment)

    console.log(`\nGanyu-Services: Testing Modules [moment]\n`)
    console.log(`\tTime Duration:`, `(Time Now + 500000000 ms) - Time Now`, `=>`, moment.duration((new Date().getTime() + 500000000) - new Date().getTime()).format(`w [Weeks], d [Days], h [Hours], m [Minutes], s [Seconds]`))
    return
}

module.exports.osu = async _ => {
    let token = `` // ADD TOKEN HERE
    let osu = new services({ osu: token }).osu

    console.log(`\nGanyu-Services: Testing Modules [osu]\n`)
    if (!token) return console.log(`\tOsu Service Issue: No token provided [Visit https://osu.ppy.sh/p/api/ to get a token]`)
    let osuUser = await osu.getUser({ u: `fangary12` })
    console.log(`\tUser Fetch:`, `fangary12`, `=>`, JSON.stringify(osuUser))
    return
}

module.exports.profanity = async _ => {
    let profanity = new services().profanity

    console.log(`\nGanyu-Services: Testing Modules [profanity]\n`)
    console.log(`\tProfanity Cleaner:`, `So much damn code`, `=>`, profanity.clean(`So much damn code`))
    return
}

module.exports.sloc = async _ => {
    let { readFileSync } = require(`fs`)
    let sloc = new services().sloc

    console.log(`\nGanyu-Services: Testing Modules [sloc]\n`)
    console.log(`\tSource Lines Of Code:`, `\"./example.js\"`, `=>`, JSON.stringify(sloc.readFile(readFileSync(`./example.js`, `utf8`))))
    return
}

module.exports.weather = async _ => {
    let weather = new services().weather

    console.log(`\nGanyu-Services: Testing Modules [weather]\n`)
    await weather.get({ degreeType: `F`, lang: `en-US`, search: `dallas, tx` }, (err, res) => {
        if (err) { }
        console.log(`\tWeather/Forecast:`, `\"Dallas, TX\"`, `=>`, JSON.stringify(res))
    })
    return
}
