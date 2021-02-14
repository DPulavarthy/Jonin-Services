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
 * This class sets-up all the modules.
 * 
 * @name services
 * @param {array} reject Array of modules that will not be set-up.
 * @return {null}
 */

module.exports = class services {
    constructor(key) {
        let [files, modules] = [[`binary`, `chatbot`, `endecodify`, `env`, `profanity`, `sloc`, `weather`], [`fetch`, `moment`]]
        for (let file of files) if (!reject.includes(file)) this[file] = new (require(`./modules/${file}/${file}.js`))()
        for (let file of modules) if (!reject.includes(file)) this[file] = require(`./modules/${file}/${file}.js`)
        if (key.osu) this.osu = new (require(`./modules/osu/osu.js`))(reject[0].osu)
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
