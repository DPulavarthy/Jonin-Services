/**
 * @file moment-duration-format module.
 * 
 * @name moment
 * @usage new <Services>().moment(module[MOMENT])
 */

((root, factory) => {
    if (typeof define === `function` && define.amd) define([`moment`], factory)
    else if (typeof exports === `object`) try { module.exports = factory(require(`moment`)) } catch (e) { module.exports = factory }
    if (root) root.momentDurationFormatSetup = root.moment ? factory(root.moment) : factory;
})(this, moment => {
    let [types, toLocaleStringWorks, toLocaleStringRoundingWorks, intlNumberFormatWorks, intlNumberFormatRoundingWorks] = [`escape years months weeks days hours minutes seconds milliseconds general`.split(` `), false, false, false, false]
    let bubbles = [
        { type: `seconds`, targets: [{ type: `minutes`, value: 60 }, { type: `hours`, value: 3600 }, { type: `days`, value: 86400 }, { type: `weeks`, value: 604800 }, { type: `months`, value: 2678400 }, { type: `years`, value: 31536000 }] },
        { type: `minutes`, targets: [{ type: `hours`, value: 60 }, { type: `days`, value: 1440 }, { type: `weeks`, value: 10080 }, { type: `months`, value: 44640 }, { type: `years`, value: 525600 }] },
        { type: `hours`, targets: [{ type: `days`, value: 24 }, { type: `weeks`, value: 168 }, { type: `months`, value: 744 }, { type: `years`, value: 8760 }] },
        { type: `days`, targets: [{ type: `weeks`, value: 7 }, { type: `months`, value: 31 }, { type: `years`, value: 365 }] },
        { type: `months`, targets: [{ type: `years`, value: 12 }] }
    ]
    function stringIncludes(str, search) { if (search.length > str.length) return false; return str.indexOf(search) !== -1 }
    function repeatZero(qty) { let result = ``; while (qty) result += `0`, qty -= 1; return result }
    function stringRound(digits) {
        let [digitsArray, i, carry] = [digits.split(``).reverse(), 0, true]
        while (carry && i < digitsArray.length) {
            if (i) {
                if (digitsArray[i] === `9`) digitsArray[i] = `0`
                else digitsArray[i] = (parseInt(digitsArray[i], 10) + 1).toString(), carry = false
            } else {
                if (parseInt(digitsArray[i], 10) < 5) carry = false
                digitsArray[i] = `0`
            }
            i += 1
        }
        if (carry) digitsArray.push(`1`)
        return digitsArray.reverse().join(``)
    }
    function cachedNumberFormat(locale, options) {
        let optionsString = map(keys(options).sort(), key => { return `${key}:${options[key]}` }).join(`,`), cacheKey = `${locale}+${optionsString}`
        if (!cachedNumberFormat.cache[cacheKey]) cachedNumberFormat.cache[cacheKey] = Intl.NumberFormat(locale, options)
        return cachedNumberFormat.cache[cacheKey]
    }
    cachedNumberFormat.cache = {}
    function formatNumber(number, options, userLocale) {
        let [useToLocaleString, useGrouping, maximumSignificantDigits, minimumIntegerDigits, fractionDigits, groupingSeparator, decimalSeparator] = [options.useToLocaleString, options.useGrouping, options.maximumSignificantDigits, options.minimumIntegerDigits || 1, options.fractionDigits || 0, options.groupingSeparator, options.decimalSeparator], grouping = useGrouping && options.grouping.slice()
        if (useToLocaleString && userLocale) {
            let localeStringOptions = { minimumIntegerDigits: minimumIntegerDigits, useGrouping: useGrouping }
            if (fractionDigits) localeStringOptions.maximumFractionDigits = fractionDigits, localeStringOptions.minimumFractionDigits = fractionDigits
            if (maximumSignificantDigits && number > 0) localeStringOptions.maximumSignificantDigits = maximumSignificantDigits
            if (intlNumberFormatWorks) {
                if (!intlNumberFormatRoundingWorks) {
                    let roundingOptions = extend({}, options)
                    roundingOptions.useGrouping = false
                    roundingOptions.decimalSeparator = `.`
                    number = parseFloat(formatNumber(number, roundingOptions), 10)
                }
                return cachedNumberFormat(userLocale, localeStringOptions).format(number);
            } else {
                if (!toLocaleStringRoundingWorks) {
                    var roundingOptions = extend({}, options)
                    roundingOptions.useGrouping = false
                    roundingOptions.decimalSeparator = `.`
                    number = parseFloat(formatNumber(number, roundingOptions), 10)
                }
                return number.toLocaleString(userLocale, localeStringOptions);
            }
        }
        let numberString
        if (maximumSignificantDigits) numberString = number.toPrecision(maximumSignificantDigits + 1)
        else numberString = number.toFixed(fractionDigits + 1)
        let [temp, integerString, fractionString, exponentString] = [numberString.split(`e`)]
        exponentString = temp[1] || ``
        temp = temp[0].split(`.`)
        fractionString = temp[1] || ``
        integerString = temp[0] || ``
        let [integerLength, fractionLength, digits] = [integerString.length, fractionString.length, integerString + fractionString], digitCount = integerLength + fractionLength
        if (maximumSignificantDigits && digitCount === (maximumSignificantDigits + 1) || !maximumSignificantDigits && fractionLength === (fractionDigits + 1)) {
            digits = stringRound(digits)
            if (digits.length === digitCount + 1) integerLength = integerLength + 1
            if (fractionLength) digits = digits.slice(0, -1)
            integerString = digits.slice(0, integerLength)
            fractionString = digits.slice(integerLength)
        }
        if (maximumSignificantDigits) fractionString = fractionString.replace(/0*$/, ``)
        let exponent = parseInt(exponentString, 10)
        if (exponent > 0) {
            if (fractionString.length <= exponent) fractionString = fractionString + repeatZero(exponent - fractionString.length), integerString = integerString + fractionString, fractionString = ``
            else integerString = integerString + fractionString.slice(0, exponent), fractionString = fractionString.slice(exponent)
        } else if (exponent < 0) fractionString = (repeatZero(Math.abs(exponent) - integerString.length) + integerString + fractionString), integerString = `0`
        if (!maximumSignificantDigits) {
            fractionString = fractionString.slice(0, fractionDigits)
            if (fractionString.length < fractionDigits) fractionString = fractionString + repeatZero(fractionDigits - fractionString.length)
            if (integerString.length < minimumIntegerDigits) integerString = repeatZero(minimumIntegerDigits - integerString.length) + integerString
        }
        let formattedString = ``
        if (useGrouping) {
            temp = integerString
            let group

            while (temp.length) {
                if (grouping.length) group = grouping.shift()
                if (formattedString) formattedString = groupingSeparator + formattedString
                formattedString = temp.slice(-group) + formattedString
                temp = temp.slice(0, -group)
            }
        } else formattedString = integerString
        if (fractionString) formattedString = formattedString + decimalSeparator + fractionString
        return formattedString
    }
    function durationLabelCompare(a, b) {
        if (a.label.length > b.label.length) return -1
        if (a.label.length < b.label.length) return 1
        return 0
    }
    function durationGetLabels(token, localeData) {
        let labels = []
        each(keys(localeData), localeDataKey => {
            if (localeDataKey.slice(0, 15) !== `_durationLabels`) return
            let labelType = localeDataKey.slice(15).toLowerCase()
            each(keys(localeData[localeDataKey]), labelKey => { if (labelKey.slice(0, 1) === token) labels.push({ type: labelType, key: labelKey, label: localeData[localeDataKey][labelKey] }) })
        })
        return labels
    }
    function durationPluralKey(token, integerValue, decimalValue) { if (integerValue === 1 && decimalValue === null) return token; return token + token }
    let engLocale = {
        durationLabelsStandard: { S: `millisecond`, SS: `milliseconds`, s: `second`, ss: `seconds`, m: `minute`, mm: `minutes`, h: `hour`, hh: `hours`, d: `day`, dd: `days`, w: `week`, ww: `weeks`, M: `month`, MM: `months`, y: `year`, yy: `years` },
        durationLabelsShort: { S: `msec`, SS: `msecs`, s: `sec`, ss: `secs`, m: `min`, mm: `mins`, h: `hr`, hh: `hrs`, d: `dy`, dd: `dys`, w: `wk`, ww: `wks`, M: `mo`, MM: `mos`, y: `yr`, yy: `yrs` },
        durationTimeTemplates: { HMS: `h:mm:ss`, HM: `h:mm`, MS: `m:ss` },
        durationLabelTypes: [{ type: `standard`, string: `__` }, { type: `short`, string: `_` }],
        durationPluralKey: durationPluralKey
    }
    function isArray(array) { return Object.prototype.toString.call(array) === `[object Array]` }
    function isObject(obj) { return Object.prototype.toString.call(obj) === `[object Object]` }
    function findLast(array, callback) { let index = array.length; while (index -= 1) if (callback(array[index])) return array[index] }
    function find(array, callback) { let [max, index, match] = [array && array.length || 0, 0]; if (typeof callback !== `function`) match = callback, callback = item => { return item === match }; while (index < max) { if (callback(array[index])) return array[index]; index += 1 } }
    function each(array, callback) { let [max, index] = [array.length, 0]; if (!array || !max) return; while (index < max) { if (callback(array[index], index) === false) return; index += 1 } }
    function map(array, callback) { let [max, index, ret] = [array.length, 0, new Array()]; if (!array || !max) return ret; while (index < max) ret[index] = callback(array[index], index), index += 1; return ret }
    function pluck(array, prop) { return map(array, item => { return item[prop] }) }
    function compact(array) { let ret = []; each(array, item => { if (item) ret.push(item) }); return ret }
    function unique(array) { let ret = []; each(array, _a => { if (!find(ret, _a)) ret.push(_a) }); return ret }
    function intersection(a, b) { let ret = []; each(a, _a => { each(b, _b => { if (_a === _b) ret.push(_a) }) }); return unique(ret) }
    function rest(array, callback) { let ret = []; each(array, (item, index) => { if (!callback(item)) { ret = array.slice(index); return false } }); return ret }
    function initial(array, callback) { var reversed = array.slice().reverse(); return rest(reversed, callback).reverse() }
    function extend(a, b) { for (var key in b) if (b.hasOwnProperty(key)) a[key] = b[key]; return a }
    function keys(a) { let ret = []; for (var key in a) if (a.hasOwnProperty(key)) ret.push(key); return ret }
    function any(array, callback) {
        let [max, index] = [array.length, 0]
        if (!array || !max) return false
        while (index < max) { if (callback(array[index], index) === true) return true; index += 1 }
        return false
    }
    function flatten(array) { let ret = []; each(array, child => ret = ret.concat(child)); return ret }
    function toLocaleStringSupportsLocales() { let number = 0; try { number.toLocaleString(`i`) } catch (e) { return e.name === `RangeError` }; return false }
    function featureTestFormatterRounding(formatter) { return formatter(3.55, `en`, { useGrouping: false, minimumIntegerDigits: 1, minimumFractionDigits: 1, maximumFractionDigits: 1 }) === `3.6` }
    function featureTestFormatter(formatter) {
        let passed = true
        passed = passed && formatter(1, `en`, { minimumIntegerDigits: 1 }) === `1`
        passed = passed && formatter(1, `en`, { minimumIntegerDigits: 2 }) === `01`
        passed = passed && formatter(1, `en`, { minimumIntegerDigits: 3 }) === `001`
        if (!passed) return false
        passed = passed && formatter(99.99, `en`, { maximumFractionDigits: 0, minimumFractionDigits: 0 }) === `100`
        passed = passed && formatter(99.99, `en`, { maximumFractionDigits: 1, minimumFractionDigits: 1 }) === `100.0`
        passed = passed && formatter(99.99, `en`, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) === `99.99`
        passed = passed && formatter(99.99, `en`, { maximumFractionDigits: 3, minimumFractionDigits: 3 }) === `99.990`
        if (!passed) return false
        passed = passed && formatter(99.99, `en`, { maximumSignificantDigits: 1 }) === `100`
        passed = passed && formatter(99.99, `en`, { maximumSignificantDigits: 2 }) === `100`
        passed = passed && formatter(99.99, `en`, { maximumSignificantDigits: 3 }) === `100`
        passed = passed && formatter(99.99, `en`, { maximumSignificantDigits: 4 }) === `99.99`
        passed = passed && formatter(99.99, `en`, { maximumSignificantDigits: 5 }) === `99.99`
        if (!passed) return false
        passed = passed && formatter(1000, `en`, { useGrouping: true }) === `1,000`
        passed = passed && formatter(1000, `en`, { useGrouping: false }) === `1000`
        if (!passed) return false
        return true
    }
    function durationsFormat() {
        let [args, settings, durations] = [[].slice.call(arguments), {}]
        each(args, (arg, index) => {
            if (!index) { if (!isArray(arg)) throw `Expected array as the first argument to durationsFormat.`; durations = arg }
            if (typeof arg === `string` || typeof arg === `function`) { settings.template = arg; return }
            if (typeof arg === `number`) { settings.precision = arg; return }
            if (isObject(arg)) extend(settings, arg)
        })
        if (!durations || !durations.length) return []
        settings.returnMomentTypes = true
        let formattedDurations = map(durations, dur => { return dur.format(settings) }), [outputTypes, largest] = [intersection(types, unique(pluck(flatten(formattedDurations), `type`))), settings.largest]
        if (largest) outputTypes = outputTypes.slice(0, largest)
        Object.mergify(settings, { returnMomentTypes: false, outputTypes: outputTypes })
        return map(durations, dur => { return dur.format(settings) })
    }
    function durationFormat() {
        let [args, settings, asMilliseconds, asMonths] = [[].slice.call(arguments), extend({}, this.format.defaults), this.asMilliseconds(), this.asMonths()]
        if (typeof this.isValid === `function` && this.isValid() === false) asMilliseconds = 0, asMonths = 0
        let [isNegative, remainder, remainderMonths] = [asMilliseconds < 0, moment.duration(Math.abs(asMilliseconds), `milliseconds`), moment.duration(Math.abs(asMonths), `months`)]
        each(args, arg => {
            if (typeof arg === `string` || typeof arg === `function`) { settings.template = arg; return }
            if (typeof arg === `number`) { settings.precision = arg; return }
            if (isObject(arg)) extend(settings, arg)
        })
        let [momentTokens, tokenDefs] = [{ years: `y`, months: `M`, weeks: `w`, days: `d`, hours: `h`, minutes: `m`, seconds: `s`, milliseconds: `S` }, { escape: /\[(.+?)\]/, years: /\*?[Yy]+/, months: /\*?M+/, weeks: /\*?[Ww]+/, days: /\*?[Dd]+/, hours: /\*?[Hh]+/, minutes: /\*?m+/, seconds: /\*?s+/, milliseconds: /\*?S+/, general: /.+?/ }]
        settings.types = types
        let [typeMap, tokenizer] = [token => { return find(types, type => { return tokenDefs[type].test(token) }) }, new RegExp(map(types, type => { return tokenDefs[type].source }).join(`|`), `g`)]
        settings.duration = this
        let [template, outputTypes, returnMomentTypes, largest, stopTrim] = [typeof settings.template === `function` ? settings.template.apply(settings) : settings.template, settings.outputTypes, settings.returnMomentTypes, settings.largest, new Array()]
        if (!outputTypes) {
            if (isArray(settings.stopTrim)) settings.stopTrim = settings.stopTrim.join(``)
            if (settings.stopTrim) { each(settings.stopTrim.match(tokenizer), token => { let type = typeMap(token); if (type === `escape` || type === `general`) return; stopTrim.push(type) }) }
        }
        let localeData = moment.localeData()
        if (!localeData) localeData = {}
        each(keys(engLocale), key => {
            if (typeof engLocale[key] === `function`) { if (!localeData[key]) localeData[key] = engLocale[key]; return }
            if (!localeData[`_${key}`]) localeData[`_${key}`] = engLocale[key]
        })
        each(keys(localeData._durationTimeTemplates), item => template = template.replace(`_` + item + `_`, localeData._durationTimeTemplates[item]))
        let [userLocale, useLeftUnits, usePlural, precision, forceLength, useGrouping, trunc] = [settings.userLocale || moment.locale(), settings.useLeftUnits, settings.usePlural, settings.precision, settings.forceLength, settings.useGrouping, settings.trunc], useSignificantDigits = settings.useSignificantDigits && precision > 0, significantDigits = useSignificantDigits ? settings.precision : 0, significantDigitsCache = significantDigits, [minValue, isMinValue, maxValue, isMaxValue, useToLocaleString, groupingSeparator, decimalSeparator, grouping] = [settings.minValue, false, settings.maxValue, false, settings.useToLocaleString, settings.groupingSeparator, settings.decimalSeparator, settings.grouping]
        useToLocaleString = useToLocaleString && (toLocaleStringWorks || intlNumberFormatWorks)
        let trim = settings.trim
        if (isArray(trim)) trim = trim.join(` `)
        if (trim === null && (largest || maxValue || useSignificantDigits)) trim = `all`
        if (trim === null || trim === true || trim === `left` || trim === `right`) trim = `large`
        if (trim === false) trim = ``
        let trimIncludes = item => { return item.test(trim) }
        let [rLarge, rSmall, rBoth, rMid, rAll, rFinal] = [/large/, /small/, /both/, /mid/, /^all|[^sm]all/, /final/], [trimLarge, trimSmall, trimMid, trimFinal] = [largest > 0 || any([rLarge, rBoth, rAll], trimIncludes), any([rSmall, rBoth, rAll], trimIncludes), any([rMid, rAll], trimIncludes), any([rFinal, rAll], trimIncludes)]
        let rawTokens = map(template.match(tokenizer), (token, index) => {
            let type = typeMap(token)
            if (token.slice(0, 1) === `*`) {
                token = token.slice(1)
                if (type !== `escape` && type !== `general`) stopTrim.push(type)
            }
            return { index: index, length: token.length, text: ``, token: (type === `escape` ? token.replace(tokenDefs.escape, `$1`) : token), type: ((type === `escape` || type === `general`) ? null : type) }
        })
        let [currentToken, tokens] = [{ index: 0, length: 0, token: ``, text: ``, type: null }, new Array()]
        if (useLeftUnits) rawTokens.reverse()
        each(rawTokens, token => {
            if (token.type) { if (currentToken.type || currentToken.text) tokens.push(currentToken); currentToken = token; return }
            if (useLeftUnits) currentToken.text = token.token + currentToken.text
            else currentToken.text += token.token
        })
        if (currentToken.type || currentToken.text) tokens.push(currentToken)
        if (useLeftUnits) tokens.reverse()
        let momentTypes = intersection(types, unique(compact(pluck(tokens, `type`))))
        if (!momentTypes.length) return pluck(tokens, `text`).join(``)
        momentTypes = map(momentTypes, (momentType, index) => {
            let [isSmallest, isLargest, rawValue] = [((index + 1) === momentTypes.length), (!index)]
            if (momentType === `years` || momentType === `months`) rawValue = remainderMonths.as(momentType)
            else rawValue = remainder.as(momentType)
            let wholeValue = Math.floor(rawValue), [decimalValue, token] = [rawValue - wholeValue, find(tokens, token => { return momentType === token.type })]
            if (isLargest && maxValue && rawValue > maxValue) isMaxValue = true
            if (isSmallest && minValue && Math.abs(settings.duration.as(momentType)) < minValue) isMinValue = true
            if (isLargest && forceLength === null && token.length > 1) forceLength = true
            remainder.subtract(wholeValue, momentType)
            remainderMonths.subtract(wholeValue, momentType)
            return { rawValue: rawValue, wholeValue: wholeValue, decimalValue: isSmallest ? decimalValue : 0, isSmallest: isSmallest, isLargest: isLargest, type: momentType, tokenLength: token.length }
        })
        let truncMethod = trunc ? Math.floor : Math.round
        let [truncate, foundFirst, bubbled] = [(value, places) => { let factor = Math.pow(10, places); return truncMethod(value * factor) / factor }, false, false]
        let formatValue = momentType => {
            let formatOptions = { useGrouping: useGrouping, groupingSeparator: groupingSeparator, decimalSeparator: decimalSeparator, grouping: grouping, useToLocaleString: useToLocaleString }
            if (useSignificantDigits) {
                if (significantDigits <= 0) Object.mergify(momentType, { rawValue: 0, wholeValue: 0, decimalValue: 0 })
                else { formatOptions.maximumSignificantDigits = significantDigits; momentType.significantDigits = significantDigits }
            }
            if (isMaxValue && !bubbled) {
                if (momentType.isLargest) Object.mergify(momentType, { wholeValue: maxValue, decimalValue: 0 })
                else Object.mergify(momentType, { wholeValue: 0, decimalValue: 0 })
            }
            if (isMinValue && !bubbled) {
                if (momentType.isSmallest) Object.mergify(momentType, { wholeValue: minValue, decimalValue: 0 })
                else Object.mergify(momentType, { wholeValue: 0, decimalValue: 0 })
            }
            if (momentType.isSmallest || momentType.significantDigits && momentType.significantDigits - momentType.wholeValue.toString().length <= 0) {
                if (precision < 0) momentType.value = truncate(momentType.wholeValue, precision)
                else if (precision === 0) momentType.value = truncMethod(momentType.wholeValue + momentType.decimalValue)
                else {
                    if (useSignificantDigits) {
                        if (trunc) momentType.value = truncate(momentType.rawValue, significantDigits - momentType.wholeValue.toString().length)
                        else momentType.value = momentType.rawValue
                        if (momentType.wholeValue) significantDigits -= momentType.wholeValue.toString().length
                    } else {
                        formatOptions.fractionDigits = precision
                        if (trunc) momentType.value = momentType.wholeValue + truncate(momentType.decimalValue, precision)
                        else momentType.value = momentType.wholeValue + momentType.decimalValue
                    }
                }
            } else {
                if (useSignificantDigits && momentType.wholeValue) { momentType.value = Math.round(truncate(momentType.wholeValue, momentType.significantDigits - momentType.wholeValue.toString().length)); significantDigits -= momentType.wholeValue.toString().length }
                else momentType.value = momentType.wholeValue
            }
            if (momentType.tokenLength > 1 && (forceLength || foundFirst)) {
                formatOptions.minimumIntegerDigits = momentType.tokenLength
                if (bubbled && formatOptions.maximumSignificantDigits < momentType.tokenLength) delete formatOptions.maximumSignificantDigits
            }
            if (!foundFirst && (momentType.value > 0 || trim === `` /* trim: false */ || find(stopTrim, momentType.type) || find(outputTypes, momentType.type))) foundFirst = true
            momentType.formattedValue = formatNumber(momentType.value, formatOptions, userLocale)
            formatOptions.useGrouping = false
            formatOptions.decimalSeparator = `.`
            momentType.formattedValueEn = formatNumber(momentType.value, formatOptions, `en`)
            if (momentType.tokenLength === 2 && momentType.type === `milliseconds`) momentType.formattedValueMS = formatNumber(momentType.value, { minimumIntegerDigits: 3, useGrouping: false }, `en`).slice(0, 2)
            return momentType
        }
        momentTypes = map(momentTypes, formatValue)
        momentTypes = compact(momentTypes)
        if (momentTypes.length > 1) {
            let findType = type => { return find(momentTypes, momentType => { return momentType.type === type }) }
            let bubbleTypes = bubble => {
                let bubbleMomentType = findType(bubble.type)
                if (!bubbleMomentType) return
                each(bubble.targets, target => {
                    let targetMomentType = findType(target.type)
                    if (!targetMomentType) return
                    if (parseInt(bubbleMomentType.formattedValueEn, 10) === target.value) {
                        Object.mergify(bubbleMomentType, { rawValue: 0, wholeValue: 0, decimalValue: 0 })
                        Object.mergify(targetMomentType, { rawValue: targetMomentType.rawValue + 1, wholeValue: targetMomentType.wholeValue + 1, decimalValue: 0, formattedValueEn: targetMomentType.wholeValue.toString() })
                        bubbled = true
                    }
                })
            }
            each(bubbles, bubbleTypes)
        }
        if (bubbled) foundFirst = false, significantDigits = significantDigitsCache, momentTypes = map(momentTypes, formatValue), momentTypes = compact(momentTypes)
        if (outputTypes && !(isMaxValue && !settings.trim)) {
            momentTypes = map(momentTypes, momentType => {
                if (find(outputTypes, outputType => { return momentType.type === outputType })) return momentType
                return null
            })
            momentTypes = compact(momentTypes)
        } else {
            if (trimLarge) momentTypes = rest(momentTypes, momentType => { return !momentType.isSmallest && !momentType.wholeValue && !find(stopTrim, momentType.type) })
            if (largest && momentTypes.length) momentTypes = momentTypes.slice(0, largest)
            if (trimSmall && momentTypes.length > 1) momentTypes = initial(momentTypes, momentType => { return !momentType.wholeValue && !find(stopTrim, momentType.type) && !momentType.isLargest })
            if (trimMid) {
                momentTypes = map(momentTypes, (momentType, index) => {
                    if (index > 0 && index < momentTypes.length - 1 && !momentType.wholeValue) return null
                    return momentType
                })
                momentTypes = compact(momentTypes)
            }
            if (trimFinal && momentTypes.length === 1 && !momentTypes[0].wholeValue && !(!trunc && momentTypes[0].isSmallest && momentTypes[0].rawValue < minValue)) momentTypes = []
        }

        if (returnMomentTypes) return momentTypes
        each(tokens, token => {
            let key = momentTokens[token.type]
            let momentType = find(momentTypes, momentType => { return momentType.type === token.type })
            if (!key || !momentType) return
            let values = momentType.formattedValueEn.split(`.`)
            values[0] = parseInt(values[0], 10)
            if (values[1]) values[1] = parseFloat(`0.${values[1]}`, 10)
            else values[1] = null
            let [pluralKey, labels, autoLocalized, pluralizedLabels] = [localeData.durationPluralKey(key, values[0], values[1]), durationGetLabels(key, localeData), false, {}]
            each(localeData._durationLabelTypes, labelType => {
                let label = find(labels, label => { return label.type === labelType.type && label.key === pluralKey })
                if (label) {
                    pluralizedLabels[label.type] = label.label
                    if (stringIncludes(token.text, labelType.string)) token.text = token.text.replace(labelType.string, label.label), autoLocalized = true
                }
            })
            if (usePlural && !autoLocalized) {
                labels.sort(durationLabelCompare)
                each(labels, label => {
                    if (pluralizedLabels[label.type] === label.label) {
                        if (stringIncludes(token.text, label.label)) return false
                        return
                    }
                    if (stringIncludes(token.text, label.label)) { token.text = token.text.replace(label.label, pluralizedLabels[label.type]); return false }
                })
            }
        })
        tokens = map(tokens, token => {
            if (!token.type) return token.text
            let momentType = find(momentTypes, momentType => { return momentType.type === token.type })
            if (!momentType) return ``
            let out = ``
            if (useLeftUnits) out += token.text
            if (isNegative && isMaxValue || !isNegative && isMinValue) out += `< `, isMaxValue = false, isMinValue = false
            if (isNegative && isMinValue || !isNegative && isMaxValue) out += `> `, isMaxValue = false, isMinValue = false
            if (isNegative && (momentType.value > 0 || trim === `` || find(stopTrim, momentType.type) || find(outputTypes, momentType.type))) out += `-`, isNegative = false
            if (token.type === `milliseconds` && momentType.formattedValueMS) out += momentType.formattedValueMS
            else out += momentType.formattedValue
            if (!useLeftUnits) out += token.text
            return out
        })
        return tokens.join(``).replace(/(,| |:|\.)*$/, ``).replace(/^(,| |:|\.)*/, ``)
    }
    function defaultFormatTemplate() {
        let dur = this.duration, findType = type => { return dur._data[type] }, [firstType, lastType] = [find(this.types, findType), findLast(this.types, findType)]
        switch (firstType) {
            case `milliseconds`: return `S __`;
            case `seconds`:
            case `minutes`: return `*_MS_`
            case `hours`: return `_HMS_`
            case `days`: if (firstType === lastType) return `d __`
            case `weeks`: if (firstType === lastType) return `w __`; if (this.trim === null) this.trim = `both`; return `w __, d __, h __`
            case `months`: if (firstType === lastType) return `M __`
            case `years`: if (firstType === lastType) return `y __`; if (this.trim === null) this.trim = `both`; return `y __, M __, d __`
            default: if (this.trim === null) this.trim = `both`; return `y __, d __, h __, m __, s __`
        }
    }
    function init(context) {
        if (!context) throw `Moment Duration Format init cannot find moment instance.`
        context.duration.format = durationsFormat
        context.duration.fn.format = durationFormat
        context.duration.fn.format.defaults = { trim: null, stopTrim: null, largest: null, maxValue: null, minValue: null, precision: 0, trunc: false, forceLength: null, userLocale: null, usePlural: true, useLeftUnits: false, useGrouping: true, useSignificantDigits: false, template: defaultFormatTemplate, useToLocaleString: true, groupingSeparator: `,`, decimalSeparator: `.`, grouping: [3] }
        context.updateLocale(`en`, engLocale)
    }
    let toLocaleStringFormatter = (number, locale, options) => { return number.toLocaleString(locale, options) }
    toLocaleStringWorks = toLocaleStringSupportsLocales() && featureTestFormatter(toLocaleStringFormatter)
    toLocaleStringRoundingWorks = toLocaleStringWorks && featureTestFormatterRounding(toLocaleStringFormatter)
    let intlNumberFormatFormatter = (number, locale, options) => { if (typeof window !== `undefined` && window && window.Intl && window.Intl.NumberFormat) return window.Intl.NumberFormat(locale, options).format(number) }
    intlNumberFormatWorks = featureTestFormatter(intlNumberFormatFormatter)
    intlNumberFormatRoundingWorks = intlNumberFormatWorks && featureTestFormatterRounding(intlNumberFormatFormatter)
    init(moment)
    return init
})
