/**
 * @file Connect all modules and make sure all resources are functional.
 * 
 * @name Jonin-Services
 * @usage new services()
 * @version 1.0.0
 */

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
 * This class sets-up all the modules.
 * 
 * @name services
 * @param {array} reject Array of modules that will not be set-up.
 * @return {null}
 */

module.exports = class services {
    constructor(key) {
        let [files, modules] = [[`binary`, `chatbot`, `env`, `profanity`, `sloc`, `weather`], [`fetch`, `moment`]]
        for (let file of files) this[file] = new (require(`./modules/${file}/${file}.js`))()
        for (let file of modules) this[file] = require(`./modules/${file}/${file}.js`)
        if (key && key.osu) this.osu = new (require(`./modules/osu/osu.js`))(key.osu)
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
