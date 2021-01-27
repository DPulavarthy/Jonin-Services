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

module.exports = class binary {
    constructor() { }

    /**
     * This function will detect which function to trigger for the given case.
     * 
     * @name auto
     * @param {string} input A string that is either binary or ascii.
     * @return {string} A string that is the opposite language of the input given binary and ascii.
     */

    auto(input) {
        if (/^[01][01\s]*[01]$/.test(input)) return this.decode(input)
        return this.encode(input)
    }

    /**
     * This function converts normal text to binary.
     * 
     * @name encode
     * @param {string} input A string with normal characters.
     * @return {string} A string with binary characters (with spaces).
     */

    encode(input) {
        if (!input) throw new Error(`No Encode Argument was Received`)
        if (typeof input === `number`) throw new Error(`Encode Argument must be string, received Number`)
        try {
            function totxt() {
                function zeroPad(n) { return `00000000`.slice(String(n).length) + n }
                return input.replace(/[\s\S]/g, input => { input = zeroPad(input.charCodeAt().toString(2)); return input })
            }
            return totxt().toString()
        } catch (e) { throw new Error(`Error ${e.stack}`) }
    }

    /**
     * This function converts binay text to normal ascii values.
     * 
     * @name decode
     * @param {string} input A string with binay characters.
     * @return {string} A string with ascii characters.
     */

    decode(input) {
        if (!input || /^\s*$/.test(input)) throw new Error(`No Decode Argument was Received`)
        if (typeof input === `number`) throw new Error(`Decode Argument must be string, received Number`)
        try {
            function tobin(input) {
                input = input.replace(/\s+/g, ``)
                input = input.match(/.{1,8}/g).join(` `)
                return input.split(` `).map((m) => String.fromCharCode(parseInt(m, 2))).join(``)
            }
            return tobin(input).toString()
        } catch (e) {
            if (e.message === `Cannot read property 'join' of null`) throw new Error(`Decode argument can't be empty string`)
            throw new Error(e.stack)
        }
    }
}
