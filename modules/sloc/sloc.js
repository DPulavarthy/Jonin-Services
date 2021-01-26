/**
 * @file File data and sloc getter.
 * 
 * @name sloc
 * @usage new <Services>().sloc.readFile(string)
 */

/**
 * Read file data and get information such as sloc and comments.
 * 
 * @name sloc
 */

module.exports = class sloc {
    constructor() { }

    /**
     * This function will check options and run the main function.
     * 
     * @name readFile
     * @param {string} contents A string that is the file data.
     * @param {object} options An object with module options.
     * @return {object} An object with file data.
     */

    readFile(contents, options) {
        if (!options) options = {}
        return this.slocCount(contents, options)
    }

    /**
     * This function will check, read, parse, and count data on the file.
     * 
     * @name slocCount
     * @param {string} contents A string that is the file data.
     * @param {object} options An object with module options.
     * @return {object} An object with file data.
     */

    slocCount(contents, options) {
        options = this.extend({ singleLineComment: `//`, blockCommentOpen: `/*`, blockCommentClose: `*/`, lineSeparator: `\r\n` }, options)
        let [statistics, lines, lineType, line, blockCommentOpen] = [
            { total: 0, source: 0, singleLineComments: 0, blockCommentLines: 0, blockComments: 0, empty: 0 }, contents.split(options.lineSeparator),
            (line, options) => {
                if (line.length === 0) return `empty`
                if (line.substr(0, 2) == options.singleLineComment) return `singleLineComment`
                if (line.substr(0, 2) == options.blockCommentOpen) return `blockCommentOpen`
                if (line.substr(line.length - 2) == options.blockCommentClose) return `blockCommentClose`
                return `source`
            }
        ]

        for (let i = 0; i < lines.length; i++) {
            statistics.total++
            line = lines[i].trim()
            switch (lineType(line, options)) {
                case `empty`: statistics.empty++; break
                case `singleLineComment`: statistics.singleLineComments++; break
                case `blockCommentOpen`: blockCommentOpen = true; break
                case `blockCommentClose`: if (blockCommentOpen) statistics.blockComments++, blockCommentOpen = false; break
                case `source`: if (!blockCommentOpen) statistics.source++; break
            }
        }
        statistics.blockCommentLines = statistics.total - statistics.singleLineComments - statistics.source - statistics.empty
        return statistics
    }

    /**
     * Resource function for `slocCount()`.
     * 
     * @name extend
     * @return {object} Modified data.
     */

    extend() {
        let [hasOwn, toStr, defineProperty, gOPD, isArray, isPlainObject, setProperty, getProperty, target, i, length, deep, options, name, src, copy, copyIsArray, clone] = [
            Object.prototype.hasOwnProperty,
            Object.prototype.toString,
            Object.defineProperty,
            Object.getOwnPropertyDescriptor,
            arr => { if (typeof Array.isArray === `function`) return Array.isArray(arr); return toStr.call(arr) === `[object Array]` },
            obj => {
                if (!obj || toStr.call(obj) !== `[object Object]`) return false
                let [hasOwnConstructor, hasIsPrototypeOf] = [hasOwn.call(obj, `constructor`), obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, `isPrototypeOf`)]
                if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) return false
                for (let _ in obj) { }
                return typeof key === `undefined` || hasOwn.call(obj, key)
            },
            (target, options) => {
                if (defineProperty && options.name === `__proto__`) defineProperty(target, options.name, { enumerable: true, configurable: true, value: options.newValue, writable: true })
                else target[options.name] = options.newValue
            },
            (obj, name) => { if (name === `__proto__`) { if (!hasOwn.call(obj, name)) return void 0; else if (gOPD) return gOPD(obj, name).value }; return obj[name] },
            arguments[0], 1, arguments.length, false

        ]

        if (typeof target === `boolean`) deep = target, target = arguments[1] || {}, i = 2
        if (target == null || (typeof target !== `object` && typeof target !== `function`)) target = {}
        for (; i < length; ++i) {
            options = arguments[i]
            if (options != null) {
                for (name in options) {
                    src = getProperty(target, name), copy = getProperty(options, name)
                    if (target !== copy) {
                        if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                            if (copyIsArray) copyIsArray = false, clone = src && isArray(src) ? src : []
                            else clone = src && isPlainObject(src) ? src : {}
                            setProperty(target, { name: name, newValue: extend(deep, clone, copy) })
                        } else if (typeof copy !== `undefined`) setProperty(target, { name: name, newValue: copy })
                    }
                }
            }
        }
        return target
    }
}
