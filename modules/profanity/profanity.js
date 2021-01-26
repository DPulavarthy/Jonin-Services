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

module.exports = class profanity {
    constructor() { this.data = require(`./words.json`).data.sort((x, y) => y.length - x.length) }

    /**
     * The function to iterate through the profanity list and replace.
     * 
     * @name clean
     * @param {string} input Any string with profanity to be cleaned.
     * @return {string} A string with  profanity cleaned out.
     */

    clean(input) {
        for (let word of this.data) input = eval(`\`${input}\`.replace(/${word}/g, \`*****\`)`)
        return input
    }
}
