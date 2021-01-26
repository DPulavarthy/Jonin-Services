/**
 * @file Chatbot with history.
 * 
 * @name chatbot
 * @see Object.mergify() Found in `services.js`
 * @see fetch.js Found in `./services/modules/fetch/fetch.js`
 * @usage await new <Services>().chatbot.get(string, array)
 */

/**
 * Takes the history of the chat and the current message to make a proper response.
 * 
 * @name chatbot
 */

module.exports = class chatbot {

    /**
     * This constructor sets up presets required by the `get()` function.
     * 
     * @name constructor
     */

    constructor() {
        Object.mergify(this, {
            fetch: require(`../fetch/fetch.js`),
            crypt: {
                rotl: (n, b) => { return (n << b) | (n >>> (32 - b)) },
                bytesToWords: bytes => { for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) words[b >>> 5] |= bytes[i] << (24 - b % 32); return words },
                wordsToBytes: words => { for (var bytes = [], b = 0; b < words.length * 32; b += 8) bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF); return bytes },
                endian: n => {
                    if (n.constructor == Number) return this.crypt.rotl(n, 8) & 0x00FF00FF | this.crypt.rotl(n, 24) & 0xFF00FF00
                    for (let i = 0; i < n.length; i++) n[i] = this.crypt.endian(n[i])
                    return n
                },
                bytesToHex: bytes => {
                    for (var hex = [], i = 0; i < bytes.length; i++) {
                        hex.push((bytes[i] >>> 4).toString(16))
                        hex.push((bytes[i] & 0xF).toString(16))
                    }
                    return hex.join(``)
                }
            },
            encode: message => { return this.crypt.bytesToHex(this.crypt.wordsToBytes(this.md5(message))) },
            md5: message => {
                let [stringToBytes, isBuffer] = [
                    str => { for (var bytes = [], i = 0; i < str.length; i++) bytes.push(str.charCodeAt(i) & 0xFF); return bytes },
                    obj => {
                        let [isBuffer, isSlowBuffer] = [(obj) => { return !!obj.constructor && typeof obj.constructor.isBuffer === `function` && obj.constructor.isBuffer(obj) }, (obj) => { return typeof obj.readFloatLE === `function` && typeof obj.slice === `function` && isBuffer(obj.slice(0, 0)) }]
                        return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
                    }]
                if (message.constructor == String) message = stringToBytes(unescape(encodeURIComponent(message)))
                else if (isBuffer(message)) message = Array.prototype.slice.call(message, 0)
                else if (!Array.isArray(message) && message.constructor !== Uint8Array) message = message.toString()
                let [m, l, a, b, c, d] = [this.crypt.bytesToWords(message), message.length * 8, 1732584193, -271733879, -1732584194, 271733878]
                for (let i = 0; i < m.length; i++) m[i] = ((m[i] << 8) | (m[i] >>> 24)) & 0x00FF00FF | ((m[i] << 24) | (m[i] >>> 8)) & 0xFF00FF00
                m[l >>> 5] |= 0x80 << (l % 32)
                m[(((l + 64) >>> 9) << 4) + 14] = l
                let [FF, GG, HH, II] = [
                    (a, b, c, d, x, s, t) => { let n = a + (b & c | ~b & d) + (x >>> 0) + t; return ((n << s) | (n >>> (32 - s))) + b },
                    (a, b, c, d, x, s, t) => { let n = a + (b & d | c & ~d) + (x >>> 0) + t; return ((n << s) | (n >>> (32 - s))) + b },
                    (a, b, c, d, x, s, t) => { let n = a + (b ^ c ^ d) + (x >>> 0) + t; return ((n << s) | (n >>> (32 - s))) + b },
                    (a, b, c, d, x, s, t) => { let n = a + (c ^ (b | ~d)) + (x >>> 0) + t; return ((n << s) | (n >>> (32 - s))) + b }
                ]
                for (let i = 0; i < m.length; i += 16) {
                    let [aa, bb, cc, dd] = [a, b, c, d]

                    a = FF(a, b, c, d, m[i + 0], 7, -680876936)
                    d = FF(d, a, b, c, m[i + 1], 12, -389564586)
                    c = FF(c, d, a, b, m[i + 2], 17, 606105819)
                    b = FF(b, c, d, a, m[i + 3], 22, -1044525330)
                    a = FF(a, b, c, d, m[i + 4], 7, -176418897)
                    d = FF(d, a, b, c, m[i + 5], 12, 1200080426)
                    c = FF(c, d, a, b, m[i + 6], 17, -1473231341)
                    b = FF(b, c, d, a, m[i + 7], 22, -45705983)
                    a = FF(a, b, c, d, m[i + 8], 7, 1770035416)
                    d = FF(d, a, b, c, m[i + 9], 12, -1958414417)
                    c = FF(c, d, a, b, m[i + 10], 17, -42063)
                    b = FF(b, c, d, a, m[i + 11], 22, -1990404162)
                    a = FF(a, b, c, d, m[i + 12], 7, 1804603682)
                    d = FF(d, a, b, c, m[i + 13], 12, -40341101)
                    c = FF(c, d, a, b, m[i + 14], 17, -1502002290)
                    b = FF(b, c, d, a, m[i + 15], 22, 1236535329)

                    a = GG(a, b, c, d, m[i + 1], 5, -165796510)
                    d = GG(d, a, b, c, m[i + 6], 9, -1069501632)
                    c = GG(c, d, a, b, m[i + 11], 14, 643717713)
                    b = GG(b, c, d, a, m[i + 0], 20, -373897302)
                    a = GG(a, b, c, d, m[i + 5], 5, -701558691)
                    d = GG(d, a, b, c, m[i + 10], 9, 38016083)
                    c = GG(c, d, a, b, m[i + 15], 14, -660478335)
                    b = GG(b, c, d, a, m[i + 4], 20, -405537848)
                    a = GG(a, b, c, d, m[i + 9], 5, 568446438)
                    d = GG(d, a, b, c, m[i + 14], 9, -1019803690)
                    c = GG(c, d, a, b, m[i + 3], 14, -187363961)
                    b = GG(b, c, d, a, m[i + 8], 20, 1163531501)
                    a = GG(a, b, c, d, m[i + 13], 5, -1444681467)
                    d = GG(d, a, b, c, m[i + 2], 9, -51403784)
                    c = GG(c, d, a, b, m[i + 7], 14, 1735328473)
                    b = GG(b, c, d, a, m[i + 12], 20, -1926607734)

                    a = HH(a, b, c, d, m[i + 5], 4, -378558)
                    d = HH(d, a, b, c, m[i + 8], 11, -2022574463)
                    c = HH(c, d, a, b, m[i + 11], 16, 1839030562)
                    b = HH(b, c, d, a, m[i + 14], 23, -35309556)
                    a = HH(a, b, c, d, m[i + 1], 4, -1530992060)
                    d = HH(d, a, b, c, m[i + 4], 11, 1272893353)
                    c = HH(c, d, a, b, m[i + 7], 16, -155497632)
                    b = HH(b, c, d, a, m[i + 10], 23, -1094730640)
                    a = HH(a, b, c, d, m[i + 13], 4, 681279174)
                    d = HH(d, a, b, c, m[i + 0], 11, -358537222)
                    c = HH(c, d, a, b, m[i + 3], 16, -722521979)
                    b = HH(b, c, d, a, m[i + 6], 23, 76029189)
                    a = HH(a, b, c, d, m[i + 9], 4, -640364487)
                    d = HH(d, a, b, c, m[i + 12], 11, -421815835)
                    c = HH(c, d, a, b, m[i + 15], 16, 530742520)
                    b = HH(b, c, d, a, m[i + 2], 23, -995338651)

                    a = II(a, b, c, d, m[i + 0], 6, -198630844)
                    d = II(d, a, b, c, m[i + 7], 10, 1126891415)
                    c = II(c, d, a, b, m[i + 14], 15, -1416354905)
                    b = II(b, c, d, a, m[i + 5], 21, -57434055)
                    a = II(a, b, c, d, m[i + 12], 6, 1700485571)
                    d = II(d, a, b, c, m[i + 3], 10, -1894986606)
                    c = II(c, d, a, b, m[i + 10], 15, -1051523)
                    b = II(b, c, d, a, m[i + 1], 21, -2054922799)
                    a = II(a, b, c, d, m[i + 8], 6, 1873313359)
                    d = II(d, a, b, c, m[i + 15], 10, -30611744)
                    c = II(c, d, a, b, m[i + 6], 15, -1560198380)
                    b = II(b, c, d, a, m[i + 13], 21, 1309151649)
                    a = II(a, b, c, d, m[i + 4], 6, -145523070)
                    d = II(d, a, b, c, m[i + 11], 10, -1120210379)
                    c = II(c, d, a, b, m[i + 2], 15, 718787259)
                    b = II(b, c, d, a, m[i + 9], 21, -343485551)

                    a = (a + aa) >>> 0
                    b = (b + bb) >>> 0
                    c = (c + cc) >>> 0
                    d = (d + dd) >>> 0
                }
                return this.crypt.endian([a, b, c, d])
            }
        })
    }

    /**
     * This function requests and gets the chatbot information.
     * 
     * @name get
     * @param {string} stimulus The current message that requires a response.
     * @param {array} context The previous message and responses regrading the user and the chatbot.
     * @return {string} A response to the message given the history.
     */

    async get(stimulus, context = []) {
        return new Promise(async (r, rej) => {
            let res = await this.fetch(`https://www.cleverbot.com/`).catch(() => null)
            if (!res) return rej(null)
            let [payload, history] = [`stimulus=${escape(stimulus).includes(`%u`) ? escape(escape(stimulus).replace(/%u/g, `|`)) : escape(stimulus)}&`, context.reverse()]
            for (let i = 0; i < context.length; i++) payload += `vText${i + 2}=${escape(history[i]).includes(`%u`) ? escape(escape(history[i]).replace(/%u/g, `|`)) : escape(history[i])}&`
            payload += `cb_settings_scripting=no&islearning=1&icognoid=wsf&icognocheck=`
            let res2 = await this.fetch(`https://www.cleverbot.com/webservicemin?uc=UseOfficialCleverbotAPI`, { method: `POST`, body: `${payload}${this.encode(payload.substring(7, 33))}`, headers: { "Content-Type": `text/plain`, Cookie: [res.headers.get(`set-cookie`)] }, }).catch(() => null)
            if (!res2) return rej(null)
            return r(decodeURIComponent(res2.headers.get(`cboutput`)))
        })
    }
}
