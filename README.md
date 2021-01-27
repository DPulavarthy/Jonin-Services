<p>
    <a href="https://twitter.com/iKurasad">
        <img src="https://img.shields.io/badge/creator-Kurasad%232521-%23ff0092" alt="Kurasad#2521" />
    </a>
    <a href="https://github.com/DPulavarthy/Jonin-Services/blob/main/LICENSE">
        <img src="https://img.shields.io/npm/l/jonin-services" alt="License" />
    </a>
    <a href="https://www.npmjs.com/package/jonin-services">
        <img src="https://img.shields.io/npm/dt/jonin-services" alt="Downloads" />
    </a>
    <a href="https://www.npmjs.com/package/jonin-services">
        <img src="https://img.shields.io/github/package-json/v/DPulavarthy/Jonin-Services" alt="Version" />
    </a>
    <a href="https://github.com/DPulavarthy/Jonin-Services"
        title="All code regarding Jonin and Jonin Services is protected.">
        <img src="assets/jonin-services.jpg" alt="Jonin Services Image" />
    </a>
    <h3 align="center"> 💠 Jonin Services 💠 </h3>
    <p align="center"> A cluster of recoded modules for ease of access 
        <strong> [All services are built for <a href="https://jonin.gq">Jonin</a> but can be used at your own risk] </strong>
        <br />
        <a href="https://kura.gq"><strong> Visit the creator » </strong></a>
    </p>
    <p align="center">
        <a href="https://discord.gg/H5PwwSJ"> Contact </a>
        •
        <a href="https://github.com/DPulavarthy/Jonin-Services/issues"> Report Bug </a>
        •
        <a href="https://github.com/DPulavarthy/Jonin-Services/issues"> Request Feature </a>
    </p>
</p>

### Following Modules Used/Recoded

| Old                                                                             |       | New                               |
| ------------------------------------------------------------------------------- | ----- | --------------------------------- |
| [decode-encode-binary](https://www.npmjs.com/package/decode-encode-binary)      | **❯** | [binary](modules/binary)          |
| [cleverbot-free](https://www.npmjs.com/package/cleverbot-free)                  | **❯** | [chatbot](modules/chatbot)        |
| [endecodify](https://www.npmjs.com/package/endecodify)                          | **❯** | [endecodify](modules/endecodify)  |
| [dotenv](https://www.npmjs.com/package/dotenv)                                  | **❯** | [env](modules/env)                |
| [node-fetch](https://www.npmjs.com/package/node-fetch)                          | **❯** | [fetch](modules/fetch)            |
| [moment-duration-format](https://www.npmjs.com/package/moment-duration-format)  | **❯** | [moment](modules/moment)          |
| [node-osu](https://www.npmjs.com/package/node-osu)                              | **❯** | [osu](modules/osu)                |
| [@2toad/profanity](https://www.npmjs.com/package/@2toad/profanity)              | **❯** | [profanity](modules/profanity)    |
| [sloc-count](https://www.npmjs.com/package/sloc-count)                          | **❯** | [sloc](modules/sloc)              |
| [weather-js](https://www.npmjs.com/package/weather-js)                          | **❯** | [weather](modules/weather)        |

## Usage

#### Install
```
npm install jonin-services
```

### Modules

#### ❯ Binary 
[Click here for more information](example.js#L18)
```js
/**
 * Converts input text into binary or ascii depending on params.
 * 
 * @name binary
 */

let services = require("jonin-services")
let binary = new services().binary

console.log(binary.auto(`Hi`)) // Detect text and return opposite
// Console: 0100100001101001
console.log(binary.auto(`0100100001101001`))
// Console: Hi
console.log(binary.encode(`Hi`)) // Force encode
// Console: 0100100001101001
console.log(binary.decode(`0100100001101001`)) // Force decode
// Console: Hi
```

#### ❯ Chatbot 
[Click here for more information](example.js#L43)
```js
/**
 * Takes the history of the chat and the current message to make a proper response.
 * 
 * @name chatbot
 */

let services = require("jonin-services")
let chatbot = new services().chatbot

let noHistoryChat = await chatbot.get(`Hi`)
console.log(noHistoryChat) // Start a conversation/No history avaliable
// Console: Hello
let historyChat = await chatbot.get(`Hi`, [`Hello There!`, `What's up?`])
console.log(historyChat) // Request a message with history
// Console: How are you?
```

#### ❯ Endecodify  
[Click here for more information](example.js#L70)
```js
/**
 * This class encodes and decodes keys for safe keeping.
 * 
 * Check console for args (e.g. npm start encode text).
 * 
 * @name endecodify
 */

let services = require("jonin-services")
let endecodify = new services().endecodify

console.log(endecodify.encode(`Hi`)) // Encode normal text
// Console: 8x05h 8x09E 8x07o 8x22iI
console.log(endecodify.decode(`8x05h 8x09E 8x07o 8x22iI`)) // Decode the encoded string
// Console: Hi
console.log(process.encode(`Hi`)) // Access module through `process`
// Console: 8x05h 8x09E 8x07o 8x22iI
console.log(process.decode(`8x05h 8x09E 8x07o 8x22iI`))
// Console: Hi
```
```bash
node . encode Hi
node . decode 8x05h 8x09E 8x07o 8x22iI
```

#### ❯ Env 
[Click here for more information](example.js#L100)
```js
/**
 * @file Access `.env` through process.
 * 
 * @name env
 * @see Object.mergify() Found in `services.js`
 * @usage  new <Services>().env.config()
 */

let services = require("jonin-services")

new services().env.config() // Run config

console.log(process.env.TOKEN) // Access env data
// Console: SUPER_SECRET_KEY
```

#### ❯ Fetch 
[Click here for more information](example.js#L117)
```js
/**
 * @file node-fetch module.
 * 
 * @name fetch
 * @usage new <Services>().fetch(string)
 */

let services = require("jonin-services")
let fetch = new services().fetch

let jsonFetch = await fetch(`https://jsonplaceholder.typicode.com/todos/1`) // Fetch site
console.log(await jsonFetch.json()) // Log JSON
// Console: { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
```

#### ❯ Moment 
[Click here for more information](example.js#L134)

⚠️ Make sure to install [npmjs/moment](https://www.npmjs.com/package/moment) before running
```js
/**
 * @file moment-duration-format module.
 * 
 * @name moment
 * @usage new <Services>().moment(module[MOMENT])
 */

let services = require("jonin-services")
let moment = require(`moment`) // https://www.npmjs.com/package/moment
new services().moment(moment)

// Moment duration format
console.log(moment.duration((new Date().getTime() + 500000000) - new Date().getTime()).format(`w [Weeks], d [Days], h [Hours], m [Minutes], s [Seconds]`))
// Console: 5 Days, 18 Hours, 53 Minutes, 20 Seconds
```

#### ❯ Osu 
[Click here for more information](example.js#L151)
```js
/**
 * @file osu! info module.
 * 
 * @name osu
 * @see Object.mergify() Found in `services.js`
 * @usage new <Services>(object[TOKEN]).osu.getUser(object[USER])
 */

let services = require("jonin-services")
let token = `` // ADD TOKEN HERE
let osu = new services({ osu: token }).osu

if (!token) return console.log(`\tOsu Service Issue: No token provided [Visit https://osu.ppy.sh/p/api/ to get a token]`) // If not token
let osuUser = await osu.getUser({ u: `fangary12` }) // Get osu! user information
console.log(`\tUser Fetch:`, `fangary12`, `=>`, JSON.stringify(osuUser))
// Console: User {...}
```

#### ❯ Profanity 
[Click here for more information](example.js#L177)
```js
/**
 * @file Clear out profanity from text.
 * 
 * @name profanity
 * @usage new <Services>().profanity.clean(string)
 */

let services = require("jonin-services")
let profanity = new services().profanity

console.log(profanity.clean(`So much damn code`)) // Clean up text
// Console: So much ***** code
```

#### ❯ Sloc 
[Click here for more information](example.js#L199)
```js
/**
 * @file File data and sloc getter.
 * 
 * @name sloc
 * @usage new <Services>().sloc.readFile(string)
 */

let services = require("jonin-services")
let { readFileSync } = require(`fs`)
let sloc = new services().sloc

console.log(JSON.stringify(sloc.readFile(readFileSync(`./example.js`, `utf8`)))) // Log file data
// Console: {"total":117,"source":95,"singleLineComments":0,"blockCommentLines":0,"blockComments":0,"empty":22}
```


#### ❯ Weather 
[Click here for more information](example.js#L222)
```js
/**
 * @file Current/Forcast weather fetcher.
 * 
 * @name weather
 * @see fetch.js Found in `./services/modules/fetch/fetch.js`
 * @usage new <Services>().weather.get(object)
 */

let services = require("jonin-services")
let weather = new services().weather

await weather.get({ degreeType: `F`, lang: `en-US`, search: `dallas, tx` }, (err, res) => {
    if (err) { }
    console.log(`\tWeather/Forecast:`, `\"Dallas, TX\"`, `=>`, JSON.stringify(res))
})
// Console: [{"location":{...},"forecast":[{...},{...},{...}]}]
```
