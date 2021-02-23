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
        input = input.split(/ +/g)
        for (let word of this.data) for (let i = 0; i < input.length; i++) if (input[i].match(new RegExp(`\\b(\\w*^${word}\\w*)\\b`, `g`))) input[i] = `${input[i].slice(0, 1)}${`\\\*`.repeat(input[i].length - 1)}`
        return input.join(` `)
    }
}
