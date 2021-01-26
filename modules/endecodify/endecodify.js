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

module.exports = class endecodify {

    /**
     * This constructor sets up process properties and checks the console.
     * 
     * @name constructor
     */

    constructor() {
        Object.mergify(process, { encode: this.encode, decode: this.decode })
        if (process.argv[2]) console.log(this[process.argv[2].toLowerCase().includes(`decode`) ? `decode` : `encode`](process.argv.splice(3).join(` `)))
    }

    /**
     * Module encoder.
     * 
     * @name encode
     * @param {string} input A string to encode.
     * @return {string} An encoded string.
     */

    encode(input) {
        let [code, split, string, letters] = [Buffer.from(Buffer.from(input, `ascii`).toString(`base64`), `base64`).toString(`hex`), new Array(), new Array(), [...Array(26)].map((_, i) => String.fromCharCode(i + 65)).concat([...Array(26)].map((_, i) => String.fromCharCode(i + 65)).map(letter => letter.toLowerCase()))]
        for (let char of code.split(``)) {
            if (isNaN(parseInt(char))) split.push(`!${char}`)
            else {
                char = parseInt(char)
                let num = char === 0 ? 9 : ++char, format = num % 2 === 0 ? `${++num * 2}i` : num
                if ((format.toString().endsWith(`i`) && format.length - 1 < 2) || format < 10) split.push(`0${format}`)
                else split.push(format)
            }
        }
        for (let char of split) string.push(`8x${char}${letters[Math.floor(Math.random() * (char.toString().endsWith(`i`) ? letters.length / 2 : letters.length))]}`)
        return string.join(` `)
    }

    /**
     * Module decoder.
     * 
     * @name decode
     * @param {string} message A string to decode.
     * @return {string} A decoded string.
     */

    decode(input) {
        let string = new Array()
        input = input.replace(/8x/g, ``).split(` `)
        for (let char of input) {
            char = isNaN(parseInt(char.slice(-1))) && !char.startsWith(`!`) && char.substring(2, 3) !== `i` ? char.slice(0, - 1) : char
            if (char.includes(`!`)) char = char.substring(1)
            else if (char.includes(`i`)) char = (parseInt(char) / 2) - 1
            else char = parseInt(char)
            if (!isNaN(parseInt(char))) string.push(char === 0 ? 9 : --char)
            else string.push(char)
        }
        return Buffer.from(Buffer.from(string.join(``), `hex`).toString(`base64`), `base64`).toString(`ascii`)
    }
}
