/**
 * @file Encode & Decode keys for safe keeping.
 * 
 * @name endecodify
 * @see Object.mergify() Found in `services.js`
 * @usage process.encode(string), process.decode(string), new <Services>().endecodify.encode(string), new <Services>().endecodify.decode(string)
 */

let { StringDecoder } = require(`string_decoder`), key = {
    max: Buffer.from(new StringDecoder(`utf8`).write(Buffer.from(`0x${`4F 51 3D 3D`.split(` `).join(` 0x`)}`.split(` `))), `base64`).toString(`ascii`),
    min: Buffer.from(new StringDecoder(`utf8`).write(Buffer.from(`0x${`4D 41 3D 3D`.split(` `).join(` 0x`)}`.split(` `))), `base64`).toString(`ascii`),
    letters: [...Array(26)].map((_, i) => String.fromCharCode(i + 65)).concat([...Array(26)].map((_, i) => String.fromCharCode(i + 65)).map(letter => letter.toLowerCase()))
}

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
        let pub = {
            encodify: input => {
                let string = new Array()
                for (let char of input.split(``)) {
                    char = parseInt(char)
                    let num = char === key.max ? key.min : ++char, format = num % 2 === 0 ? `${++num * 2}i` : num
                    if ((format.toString().endsWith(`i`) && format.length - 1 < 2) || format < 10) string.push(`0${format}`)
                    else string.push(format)
                }
                return string
            },
            joinify: input => {
                let string = new Array()
                for (let char of input) string.push(`8x${char}${key.letters[Math.floor(Math.random() * (char.toString().endsWith(`i`) ? key.letters.length / 2 : key.letters.length))]}`)
                return string.join(` `)
            }
        }
        return { case: `success`, code: `200`, data: pub.joinify(pub.encodify(Buffer.from(Buffer.from(Buffer.from(Buffer.from(input, `ascii`).toString(`base64`), `base64`).toString(`hex`), `ascii`).toString(`base64`), `base64`).toString(`hex`))) }
    }

    /**
     * Module decoder.
     * 
     * @name decode
     * @param {string} message A string to decode.
     * @return {string} A decoded string.
     */

    decode(input) {
        let pub = {
            splitify: input => { return input.replace(/8x/g, ``).split(` `) },
            decodify: input => {
                let string = new Array()
                for (let char of input) {
                    char = isNaN(parseInt(char.slice(-1))) && char.substring(2, 3) !== `i` ? char.slice(0, - 1) : char
                    if (char.includes(`i`)) char = (parseInt(char.substring(0, char.length - 1)) / 2) - 1; else char = parseInt(char)
                    string.push(char === key.min ? key.max : --char)
                }
                return string.join(``)
            }
        }
        return { case: `success`, code: `200`, data: Buffer.from(Buffer.from(Buffer.from(Buffer.from(pub.decodify(pub.splitify(input)), `hex`).toString(`base64`), `base64`).toString(`ascii`), `hex`).toString(`base64`), `base64`).toString(`ascii`) }
    }
}
