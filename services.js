/**
 * @file Connect all modules and make sure all resources are functional.
 * 
 * @name Jonin-Services
 * @usage new services()
 * @version 1.0.0
 */

/**
 * A custom error for all client services.
 * 
 * @name serviceError
 * @param {string} message A message to describe the error.
 * @return {Error} Logs a service error and exits the process.
 */

class serviceError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

/**
 * This function merges multiple objects into one.
 * 
 * @name mergify
 * @param {object} main Master object (All other objects merge into this).
 * @param {array} subs Array of objects to merge into `main`.
 * @return {object} Master object (`main`) with `subs` merged.
 */

Object.mergify = (main, ...subs) => {
    if (typeof main !== `object` || main === null) throw new serviceError(`Must pass an object type data`)
    for (let obj of subs) if (typeof obj !== `object` || obj === null) throw new serviceError(`Must pass an object type data`)
    for (let obj of subs) for (let attrname in obj) main[attrname] = obj[attrname]
    return main
}

/**
 * This function makes all numbers the same length.
 * 
 * @name equalify
 * @param {array} nums Array of nums (positive & negative).
 * @return {array} Array of modified nums (strings) all the same length.
 */

Number.equalify = (...nums) => {
    for (let num of nums) if (typeof num !== `number`) throw new serviceError(`Must pass an integer type data`)
    let max = Math.max(...nums).toString().length
    for (let i = 0; i < nums.length; i++) {
        let [stringify, zero] = [nums[i].toString(), new String()]
        for (let i = 0; i < max - stringify.length; i++) zero += `0`
        nums[i] = nums[i] > 0 ? `${zero}${nums[i]}` : `-${zero}${stringify.substring(1)}`
    }
    return nums
}

/**
 * This function returns a string with all chracters the given `char`.
 * 
 * @name loopify
 * @param {string} char Character to be looped.
 * @param {number} length Number of time to loop.
 * @return {string} String with`char` looped.
 */

String.loopify = (char, length) => {
    let string = new String()
    for (let i = 0; i < length; i++) string += char
    return string
}

/**
 * This class sets-up all the modules.
 * 
 * @name services
 * @param {array} reject Array of modules that will not be set-up.
 * @return {null}
 */

module.exports = class services {
    constructor(...reject) {
        let [files, modules] = [[`binary`, `chatbot`, `endecodify`, `env`, `profanity`, `sloc`, `weather`], [`fetch`, `moment`]]
        for (let file of files) if (!reject.includes(file)) eval(`this[\`MOD\`] = new (require(\`./modules/MOD/MOD.js\`))()`.replace(/MOD/g, file))
        for (let file of modules) if (!reject.includes(file)) eval(`this[\`MOD\`] = require(\`./modules/MOD/MOD.js\`)`.replace(/MOD/g, file))
        if ((typeof reject[0] === `string` && reject[0] !== `osu`) && reject[0] && reject[0].osu) this.osu = new (require(`./modules/osu/osu.js`))(reject[0].osu)
    }

    /**
     * @File Binary converter.
     * 
     * @name binary
     */

    binary() { this.binary }

    /**
     * @File Chatbot with history.
     * 
     * @name chatbot
     */

    chatbot() { this.chatbot }

    /**
     * @File Encode & Decode keys for safe keeping.
     * 
     * @name endecodify
     */

    endecodify() { this.endecodify }

    /**
     * @File Access `.env` through process.
     * 
     * @name env
     */

    env() { this.env }

    /**
     * @File node-fetch module.
     * 
     * @name fetch
     */

    fetch() { this.fetch }

    /**
     * @File moment-duration-format module.
     * 
     * @name moment
     */

    moment() { this.moment }

    /**
     * @File osu! info module.
     * 
     * @name osu
     */

    osu() { this.osu }

    /**
     * @File Clear out profanity from text.
     * 
     * @name profanity
     */

    profanity() { this.profanity }

    /**
     * @File File data and sloc getter.
     * 
     * @name sloc
     */

    sloc() { this.sloc }

    /**
     * @File Current/Forcast weather fetcher.
     * 
     * @name weather
     */

    weather() { this.weather }
}
