/**
 * @file Access `.env` through process.
 * 
 * @name env
 * @see Object.mergify() Found in `services.js`
 * @usage  new <Services>().env.config()
 */

let [NEWLINE, RE_INI_KEY_VAL, RE_NEWLINES, NEWLINES_MATCH] = [`\n`, /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/, /\\n/g, /\n|\r|\r\n/]

/**
 * Set `.env` file fields as properties of process.env.
 * 
 * @name env
 */

module.exports = class env {

    /**
     * This constructor sets up presets required by the `config()` function.
     * 
     * @name constructor
     */

    constructor() { Object.mergify(this, { readFileSync: require(`fs`).readFileSync, path: require(`path`), log: message => console.log(`[dotenv][DEBUG] ${message}`) }) }

    /**
     * This function sets the `.env` file under process properties.
     * 
     * @name config
     */

    config() {
        let [dotenvPath, encoding, debug] = [this.path.resolve(process.cwd(), `.env`), `utf8`, false]
        try {
            let parsed = this.parse(this.readFileSync(dotenvPath, encoding), false)
            Object.keys(parsed).forEach(key => {
                if (!Object.prototype.hasOwnProperty.call(process.env, key)) process.env[key] = parsed[key]
                else if (debug) this.log(`"${key}" is already defined in \`process.env\` and will not be overwritten`)
            })
            return parsed
        } catch (e) { return { error: e } }
    }

    /**
     * This function is a resource function for `config()`.
     * 
     * @name parse
     * @param {string} input A string.
     * @param {object} options An object with debug properties.
     * @return {object} An object with parsed data.
     */

    parse(src, options) {
        let [debug, obj] = [Boolean(options && options.debug), {}]
        src.toString().split(NEWLINES_MATCH).forEach((line, idx) => {
            let keyValueArr = line.match(RE_INI_KEY_VAL)
            if (keyValueArr != null) {
                let [key, val] = [keyValueArr[1], keyValueArr[2] || ``], end = val.length - 1, [isDoubleQuoted, isSingleQuoted] = [val[0] === `\"` && val[end] === `\"`, val[0] === `\'` && val[end] === `\'`]
                if (isSingleQuoted || isDoubleQuoted) {
                    val = val.substring(1, end)
                    if (isDoubleQuoted) val = val.replace(RE_NEWLINES, NEWLINE)
                } else val = val.trim()
                obj[key] = val
            } else if (debug) this.log(`did not match key and value when parsing line ${idx + 1}: ${line}`)
        })
        return obj
    }
}
