/**
 * @file Support file for following service: weather.
 * 
 * @name parser Source from weather
 * @see Object.mergify() Found in `services.js`
 */

 (sax => {
    let [S, buffers] = [0, [`comment`, `sgmlDecl`, `textNode`, `tagName`, `doctype`, `procInstName`, `procInstBody`, `entity`, `attribName`, `attribValue`, `cdata`, `script`]]

    Object.mergify(sax, {
        parser: (strict, opt) => { return new SAXParser(strict, opt) },
        SAXParser: SAXParser,
        SAXStream: SAXStream,
        createStream: createStream,
        MAX_BUFFER_LENGTH: 64 * 1024,
        EVENTS: [`text`, `processinginstruction`, `sgmldeclaration`, `doctype`, `comment`, `opentagstart`, `attribute`, `opentag`, `closetag`, `opencdata`, `cdata`, `closecdata`, `error`, `end`, `ready`, `script`, `opennamespace`, `closenamespace`],
        STATE: { BEGIN: S++, BEGIN_WHITESPACE: S++, TEXT: S++, TEXT_ENTITY: S++, OPEN_WAKA: S++, SGML_DECL: S++, SGML_DECL_QUOTED: S++, DOCTYPE: S++, DOCTYPE_QUOTED: S++, DOCTYPE_DTD: S++, DOCTYPE_DTD_QUOTED: S++, COMMENT_STARTING: S++, COMMENT: S++, COMMENT_ENDING: S++, COMMENT_ENDED: S++, CDATA: S++, CDATA_ENDING: S++, CDATA_ENDING_2: S++, PROC_INST: S++, PROC_INST_BODY: S++, PROC_INST_ENDING: S++, OPEN_TAG: S++, OPEN_TAG_SLASH: S++, ATTRIB: S++, ATTRIB_NAME: S++, ATTRIB_NAME_SAW_WHITE: S++, ATTRIB_VALUE: S++, ATTRIB_VALUE_QUOTED: S++, ATTRIB_VALUE_CLOSED: S++, ATTRIB_VALUE_UNQUOTED: S++, ATTRIB_VALUE_ENTITY_Q: S++, ATTRIB_VALUE_ENTITY_U: S++, CLOSE_TAG: S++, CLOSE_TAG_SAW_WHITE: S++, SCRIPT: S++, SCRIPT_ENDING: S++ },
        XML_ENTITIES: { amp: `&`, gt: `>`, lt: `<`, quot: `\"`, apos: `\'` },
        ENTITIES: { amp: "&", gt: ">", lt: "<", quot: `\"`, apos: `\'`, AElig: 198, Aacute: 193, Acirc: 194, Agrave: 192, Aring: 197, Atilde: 195, Auml: 196, Ccedil: 199, ETH: 208, Eacute: 201, Ecirc: 202, Egrave: 200, Euml: 203, Iacute: 205, Icirc: 206, Igrave: 204, Iuml: 207, Ntilde: 209, Oacute: 211, Ocirc: 212, Ograve: 210, Oslash: 216, Otilde: 213, Ouml: 214, THORN: 222, Uacute: 218, Ucirc: 219, Ugrave: 217, Uuml: 220, Yacute: 221, aacute: 225, acirc: 226, aelig: 230, agrave: 224, aring: 229, atilde: 227, auml: 228, ccedil: 231, eacute: 233, ecirc: 234, egrave: 232, eth: 240, euml: 235, iacute: 237, icirc: 238, igrave: 236, iuml: 239, ntilde: 241, oacute: 243, ocirc: 244, ograve: 242, oslash: 248, otilde: 245, ouml: 246, szlig: 223, thorn: 254, uacute: 250, ucirc: 251, ugrave: 249, uuml: 252, yacute: 253, yuml: 255, copy: 169, reg: 174, nbsp: 160, iexcl: 161, cent: 162, pound: 163, curren: 164, yen: 165, brvbar: 166, sect: 167, uml: 168, ordf: 170, laquo: 171, not: 172, shy: 173, macr: 175, deg: 176, plusmn: 177, sup1: 185, sup2: 178, sup3: 179, acute: 180, micro: 181, para: 182, middot: 183, cedil: 184, ordm: 186, raquo: 187, frac14: 188, frac12: 189, frac34: 190, iquest: 191, times: 215, divide: 247, OElig: 338, oelig: 339, Scaron: 352, scaron: 353, Yuml: 376, fnof: 402, circ: 710, tilde: 732, Alpha: 913, Beta: 914, Gamma: 915, Delta: 916, Epsilon: 917, Zeta: 918, Eta: 919, Theta: 920, Iota: 921, Kappa: 922, Lambda: 923, Mu: 924, Nu: 925, Xi: 926, Omicron: 927, Pi: 928, Rho: 929, Sigma: 931, Tau: 932, Upsilon: 933, Phi: 934, Chi: 935, Psi: 936, Omega: 937, alpha: 945, beta: 946, gamma: 947, delta: 948, epsilon: 949, zeta: 950, eta: 951, theta: 952, iota: 953, kappa: 954, lambda: 955, mu: 956, nu: 957, xi: 958, omicron: 959, pi: 960, rho: 961, sigmaf: 962, sigma: 963, tau: 964, upsilon: 965, phi: 966, chi: 967, psi: 968, omega: 969, thetasym: 977, upsih: 978, piv: 982, ensp: 8194, emsp: 8195, thinsp: 8201, zwnj: 8204, zwj: 8205, lrm: 8206, rlm: 8207, ndash: 8211, mdash: 8212, lsquo: 8216, rsquo: 8217, sbquo: 8218, ldquo: 8220, rdquo: 8221, bdquo: 8222, dagger: 8224, Dagger: 8225, bull: 8226, hellip: 8230, permil: 8240, prime: 8242, Prime: 8243, lsaquo: 8249, rsaquo: 8250, oline: 8254, frasl: 8260, euro: 8364, image: 8465, weierp: 8472, real: 8476, trade: 8482, alefsym: 8501, larr: 8592, uarr: 8593, rarr: 8594, darr: 8595, harr: 8596, crarr: 8629, lArr: 8656, uArr: 8657, rArr: 8658, dArr: 8659, hArr: 8660, forall: 8704, part: 8706, exist: 8707, empty: 8709, nabla: 8711, isin: 8712, notin: 8713, ni: 8715, prod: 8719, sum: 8721, minus: 8722, lowast: 8727, radic: 8730, prop: 8733, infin: 8734, ang: 8736, and: 8743, or: 8744, cap: 8745, cup: 8746, int: 8747, there4: 8756, sim: 8764, cong: 8773, asymp: 8776, ne: 8800, equiv: 8801, le: 8804, ge: 8805, sub: 8834, sup: 8835, nsub: 8836, sube: 8838, supe: 8839, oplus: 8853, otimes: 8855, perp: 8869, sdot: 8901, lceil: 8968, rceil: 8969, lfloor: 8970, rfloor: 8971, lang: 9001, rang: 9002, loz: 9674, spades: 9824, clubs: 9827, hearts: 9829, diams: 9830 }
    })

    function SAXParser(strict, opt) {
        if (!(this instanceof SAXParser)) return new SAXParser(strict, opt)
        clearBuffers(this)
        this.opt = opt || {}
        this.opt.lowercase = this.opt.lowercase || this.opt.lowercasetags
        Object.mergify(this, { q: ``, c: ``, bufferCheckPosition: sax.MAX_BUFFER_LENGTH, looseCase: this.opt.lowercase ? `toLowerCase` : `toUpperCase`, tags: new Array(), closed: false, closedRoot: false, sawRoot: false, tag: null, error: null, strict: !!strict, noscript: !!(strict || this.opt.noscript), state: S.BEGIN, strictEntities: this.opt.strictEntities, ENTITIES: this.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES), attribList: new Array() })
        if (this.opt.xmlns) this.ns = Object.create(rootNS)
        this.trackPosition = this.opt.position !== false
        if (this.trackPosition) this.position = this.line = this.column = 0
        emit(this, `onready`)
    }

    if (!Object.create) Object.create = o => { function F() { }; F.prototype = o; let newf = new F(); return newf }
    if (!Object.keys) Object.keys = o => { let a = new Array(); for (let i in o) if (o.hasOwnProperty(i)) a.push(i); return a }

    function checkBufferLength(parser) {
        let [maxAllowed, maxActual] = [Math.max(sax.MAX_BUFFER_LENGTH, 10), 0]
        for (let i = 0, l = buffers.length; i < l; i++) {
            let len = parser[buffers[i]].length
            if (len > maxAllowed) {
                switch (buffers[i]) {
                    case `textNode`: closeText(parser); break
                    case `cdata`: emitNode(parser, `oncdata`, parser.cdata); parser.cdata = ``; break
                    case `script`: emitNode(parser, `onscript`, parser.script); parser.script = ``; break
                    default: error(parser, `Max buffer length exceeded: ${buffers[i]}`)
                }
            }
            maxActual = Math.max(maxActual, len)
        }
        parser.bufferCheckPosition = (sax.MAX_BUFFER_LENGTH - maxActual) + parser.position
    }

    function clearBuffers(parser) { for (let i = 0, l = buffers.length; i < l; i++) parser[buffers[i]] = `` }

    function flushBuffers(parser) {
        closeText(parser)
        if (parser.cdata !== ``) emitNode(parser, `oncdata`, parser.cdata), parser.cdata = ``
        if (parser.script !== ``) emitNode(parser, `onscript`, parser.script), parser.script = ``
    }

    SAXParser.prototype = {
        end: () => end(this),
        write: write,
        resume: function () { this.error = null; return this },
        close: function () { return this.write(null) },
        flush: () => { flushBuffers(this) }
    }

    let Stream
    try { Stream = require(`stream`).Stream } catch (ex) { Stream = () => { } }
    let streamWraps = sax.EVENTS.filter(ev => { return ev !== `error` && ev !== `end` })

    function createStream(strict, opt) { return new SAXStream(strict, opt) }

    function SAXStream(strict, opt) {
        if (!(this instanceof SAXStream)) return new SAXStream(strict, opt)
        Stream.apply(this)
        Object.mergify(this, { _parser: new SAXParser(strict, opt), writable: true, readable: true, _decoder: null })
        this._parser.onend = _ => this.emit(`end`)
        this._parser.onerror = er => { this.emit(`error`, er); this._parser.error = null }

        streamWraps.forEach(ev => {
            Object.defineProperty(this, `on${ev}`, {
                get: _ => { return this._parser[`on${ev}`] },
                set: h => {
                    if (!h) {
                        this.removeAllListeners(ev)
                        this._parser[`on${ev}`] = h
                        return h
                    }
                    this.on(ev, h)
                },
                enumerable: true,
                configurable: false
            })
        })
    }

    SAXStream.prototype = Object.create(Stream.prototype, { constructor: { value: SAXStream } })

    SAXStream.prototype.write = data => {
        if (typeof Buffer === `function` && typeof Buffer.isBuffer === `function` && Buffer.isBuffer(data)) {
            if (!this._decoder) { let SD = require(`string_decoder`).StringDecoder; this._decoder = new SD(`utf8`) }
            data = this._decoder.write(data)
        }
        this._parser.write(data.toString())
        this.emit(`data`, data)
        return true
    }

    SAXStream.prototype.end = chunk => { if (chunk && chunk.length) this.write(chunk); this._parser.end(); return true }
    SAXStream.prototype.on = (ev, handler) => { if (!this._parser[`on${ev}`] && streamWraps.indexOf(ev) !== -1) this._parser[`on${ev}`] = _ => { let args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments); args.splice(0, 0, ev); this.emit.apply(this, args) }; return Stream.prototype.on.call(this, ev, handler) }

    let [CDATA, DOCTYPE, XML_NAMESPACE, XMLNS_NAMESPACE, nameStart, nameBody, entityStart, entityBody] = [`[CDATA[`, `DOCTYPE`, `http://www.w3.org/XML/1998/namespace`, `http://www.w3.org/2000/xmlns/`, /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/], rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

    function isWhitespace(c) { return c === ` ` || c === `\n` || c === `\r` || c === `\t` }
    function isQuote(c) { return c === `\"` || c === `\'` }
    function isAttribEnd(c) { return c === `>` || isWhitespace(c) }
    function isMatch(regex, c) { return regex.test(c) }
    function notMatch(regex, c) { return !isMatch(regex, c) }

    Object.keys(sax.ENTITIES).forEach(key => { let e = sax.ENTITIES[key], s = typeof e === `number` ? String.fromCharCode(e) : e; sax.ENTITIES[key] = s })

    for (var s in sax.STATE) { sax.STATE[sax.STATE[s]] = s }

    S = sax.STATE

    function emit(parser, event, data) { parser[event] && parser[event](data) }
    function emitNode(parser, nodeType, data) { if (parser.textNode) closeText(parser); emit(parser, nodeType, data) }
    function closeText(parser) {
        parser.textNode = textopts(parser.opt, parser.textNode)
        if (parser.textNode) emit(parser, `ontext`, parser.textNode)
        parser.textNode = ``
    }
    function textopts(opt, text) {
        if (opt.trim) text = text.trim()
        if (opt.normalize) text = text.replace(/\s+/g, ` `)
        return text
    }
    function error(parser, er) {
        closeText(parser)
        if (parser.trackPosition) er += `\nLine: ${parser.line}\nColumn: ${parser.column} \nChar: ${parser.c}`
        er = new Error(er)
        parser.error = er
        emit(parser, `onerror`, er)
        return parser
    }
    function end(parser) {
        if (parser.sawRoot && !parser.closedRoot) strictFail(parser, `Unclosed root tag`)
        if ((parser.state !== S.BEGIN) && (parser.state !== S.BEGIN_WHITESPACE) && (parser.state !== S.TEXT)) error(parser, `Unexpected end`)
        closeText(parser)
        Object.mergify(parser, { c: ``, closed: true })
        emit(parser, `onend`)
        SAXParser.call(parser, parser.strict, parser.opt)
        return parser
    }
    function strictFail(parser, message) {
        if (typeof parser !== `object` || !(parser instanceof SAXParser)) throw new Error(`bad call to strictFail`)
        if (parser.strict) error(parser, message)
    }
    function newTag(parser) {
        if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]()
        let parent = parser.tags[parser.tags.length - 1] || parser, tag = parser.tag = { name: parser.tagName, attributes: {} }
        if (parser.opt.xmlns) tag.ns = parent.ns
        parser.attribList.length = 0
        emitNode(parser, `onopentagstart`, tag)
    }
    function qname(name, attribute) {
        let i = name.indexOf(`:`), qualName = i < 0 ? [``, name] : name.split(`:`)
        let [prefix, local] = [qualName[0], qualName[1]]
        if (attribute && name === `xmlns`) prefix = `xmlns`, local = ``
        return { prefix: prefix, local: local }
    }
    function attrib(parser) {
        if (!parser.strict) parser.attribName = parser.attribName[parser.looseCase]()
        if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) { parser.attribName = parser.attribValue = ``; return }
        if (parser.opt.xmlns) {
            let qn = qname(parser.attribName, true), [prefix, local] = [qn.prefix, qn.local]
            if (prefix === `xmlns`) {
                if (local === `xml` && parser.attribValue !== XML_NAMESPACE) strictFail(parser, `xml: prefix must be bound to ${XML_NAMESPACE}\nActual: ${parser.attribValue}`)
                else if (local === `xmlns` && parser.attribValue !== XMLNS_NAMESPACE) strictFail(parser, `xml: prefix must be bound to ${XMLNS_NAMESPACE}\nActual: ${parser.attribValue}`)
                else {
                    let [tag, parent] = [parser.tag, parser.tags[parser.tags.length - 1] || parser]
                    if (tag.ns === parent.ns) tag.ns = Object.create(parent.ns)
                    tag.ns[local] = parser.attribValue
                }
            }
            parser.attribList.push([parser.attribName, parser.attribValue])
        } else {
            parser.tag.attributes[parser.attribName] = parser.attribValue
            emitNode(parser, `onattribute`, { name: parser.attribName, value: parser.attribValue })
        }

        parser.attribName = parser.attribValue = ``
    }
    function openTag(parser, selfClosing) {
        if (parser.opt.xmlns) {
            let [tag, qn, parent] = [parser.tag, qname(parser.tagName), parser.tags[parser.tags.length - 1] || parser]
            tag.prefix = qn.prefix
            tag.local = qn.local
            tag.uri = tag.ns[qn.prefix] || ``
            if (tag.prefix && !tag.uri) strictFail(parser, `Unbound namespace prefix: ${JSON.stringify(parser.tagName)}`), tag.uri = qn.prefix
            if (tag.ns && parent.ns !== tag.ns) Object.keys(tag.ns).forEach(p => emitNode(parser, `onopennamespace`, { prefix: p, uri: tag.ns[p] }))
            for (let i = 0, l = parser.attribList.length; i < l; i++) {
                let nv = parser.attribList[i], [name, value] = [nv[0], nv[1]], qualName = qname(name, true), [prefix, local] = [qualName.prefix, qualName.local], uri = prefix === `` ? `` : (tag.ns[prefix] || ``), a = { name: name, value: value, prefix: prefix, local: local, uri: uri }
                if (prefix && prefix !== `xmlns` && !uri) strictFail(parser, `Unbound namespace prefix: ${JSON.stringify(prefix)}`), a.uri = prefix
                parser.tag.attributes[name] = a
                emitNode(parser, `onattribute`, a)
            }
            parser.attribList.length = 0
        }
        parser.sawRoot = true
        parser.tag.isSelfClosing = !!selfClosing
        parser.tags.push(parser.tag)
        emitNode(parser, `onopentag`, parser.tag)
        if (!selfClosing) {
            if (!parser.noscript && parser.tagName.toLowerCase() === `script`) parser.state = S.SCRIPT
            else parser.state = S.TEXT
            Object.mergify(parser, { tag: null, tagName: `` })
        }
        Object.mergify(parser, { attribName: ``, attribValue: `` })
        parser.attribList.length = 0
    }
    function closeTag(parser) {
        if (!parser.tagName) { strictFail(parser, `Weird empty close tag.`); return Object.mergify(parser, { textNode: `${parser.textNode}</>`, state: S.TEXT }) }
        if (parser.script) {
            if (parser.tagName !== `script`) return Object.mergify(parser, { script: `</${parser.tagName}>`, tagName: ``, state: S.SCRIPT })
            emitNode(parser, `onscript`, parser.script)
            parser.script = ``
        }
        let [s, t, tagName] = [parser.tags.length, parser.tags.length, parser.tagName]
        if (!parser.strict) tagName = tagName[parser.looseCase]()
        while (t--) if (parser.tags[t].name !== tagName) strictFail(parser, `Unexpected close tag`); else break
        if (t < 0) { strictFail(parser, `Unmatched closing tag: ${parser.tagName}`); return Object.mergify(parser, { textNode: `</${parser.tagName}>`, state: S.TEXT }) }
        parser.tagName = tagName
        while (s-- > t) {
            let [x, parent] = [{}, parser.tags[parser.tags.length - 1] || parser], tag = parser.tag = parser.tags.pop()
            parser.tagName = parser.tag.name
            emitNode(parser, `onclosetag`, parser.tagName)
            for (let i in tag.ns) x[i] = tag.ns[i]
            if (parser.opt.xmlns && tag.ns !== parent.ns) Object.keys(tag.ns).forEach(p => emitNode(parser, `onclosenamespace`, { prefix: p, uri: tag.ns[p] }))
        }
        if (t === 0) parser.closedRoot = true
        parser.tagName = parser.attribValue = parser.attribName = ``
        parser.attribList.length = 0
        parser.state = S.TEXT
    }
    function parseEntity(parser) {
        let [entity, numStr, num] = [parser.entity, ``], entityLC = entity.toLowerCase()
        if (parser.ENTITIES[entity]) return parser.ENTITIES[entity]
        if (parser.ENTITIES[entityLC]) return parser.ENTITIES[entityLC]
        entity = entityLC
        if (entity.charAt(0) === `#`) {
            if (entity.charAt(1) === `x`) entity = entity.slice(2), num = parseInt(entity, 16), numStr = num.toString(16)
            else entity = entity.slice(1), num = parseInt(entity, 10), numStr = num.toString(10)
        }
        entity = entity.replace(/^0+/, ``)
        if (isNaN(num) || numStr.toLowerCase() !== entity) { strictFail(parser, `Invalid character entity`); return `&${parser.entity};` }
        return String.fromCodePoint(num)
    }
    function beginWhiteSpace(parser, c) {
        if (c === `<`) Object.mergify(parser, { state: S.OPEN_WAKA, startTagPosition: parser.position })
        else if (!isWhitespace(c)) { strictFail(parser, `Non-whitespace before first tag.`); Object.mergify(parser, { textNode: c, state: S.TEXT }) }
    }
    function charAt(chunk, i) { return i < chunk.length ? chunk.charAt(i) : `` }
    function write(chunk) {
        if (this.error) throw this.error
        if (this.closed) return error(this, `Cannot write after close. Assign an onready handler.`)
        if (chunk === null) return end(this)
        if (typeof chunk === `object`) chunk = chunk.toString()
        let [i, c] = [0, ``]
        while (true) {
            c = charAt(chunk, i++)
            this.c = c
            if (!c) break
            if (this.trackPosition) { this.position++; if (c === `\n`) this.line++, this.column = 0; else this.column++ }
            switch (this.state) {
                case S.BEGIN: this.state = S.BEGIN_WHITESPACE; if (c === `\uFEFF`) continue; beginWhiteSpace(this, c); continue
                case S.BEGIN_WHITESPACE: beginWhiteSpace(this, c); continue
                case S.TEXT:
                    if (this.sawRoot && !this.closedRoot) {
                        let starti = i - 1
                        while (c && c !== '<' && c !== '&') {
                            c = charAt(chunk, i++)
                            if (c && this.trackPosition) { this.position++; if (c === '\n') this.line++, this.column = 0; else this.column++ }
                        }
                        this.textNode += chunk.substring(starti, i - 1)
                    }
                    if (c === `<` && !(this.sawRoot && this.closedRoot && !this.strict)) Object.mergify(this, { state: S.OPEN_WAKA, startTagPosition: this.position })
                    else {
                        if (!isWhitespace(c) && (!this.sawRoot || this.closedRoot)) strictFail(this, `Text data outside of root node.`)
                        if (c === `&`) this.state = S.TEXT_ENTITY
                        else this.textNode += c
                    }
                    continue
                case S.SCRIPT:
                    if (c === `<`) this.state = S.SCRIPT_ENDING
                    else this.script += c
                    continue
                case S.SCRIPT_ENDING:
                    if (c === `/`) this.state = S.CLOSE_TAG
                    else Object.mergify(this, { script: `<${c}`, state: S.SCRIPT })
                    continue
                case S.OPEN_WAKA:
                    if (c === `!`) Object.mergify(this, { state: S.SGML_DECL, sgmlDecl: `` })
                    else if (isMatch(nameStart, c)) Object.mergify(this, { state: S.OPEN_TAG, tagName: c })
                    else if (c === `/`) Object.mergify(this, { state: S.CLOSE_TAG, tagName: `` })
                    else if (c === `?`) Object.mergify(this, { state: S.PROC_INST, procInstName: ``, procInstBody: `` })
                    else { strictFail(this, `Unencoded <`); if (this.startTagPosition + 1 < this.position) c = new Array(this.position - this.startTagPosition).join(` `) + c; Object.mergify(this, { textNode: `${this.textNode}<${c}`, state: S.TEXT }) }
                    continue
                case S.SGML_DECL:
                    if ((this.sgmlDecl + c).toUpperCase() === CDATA) { emitNode(this, `onopencdata`); Object.mergify(this, { state: S.CDATA, sgmlDecl: ``, cdata: `` }) }
                    else if (this.sgmlDecl + c === `--`) Object.mergify(this, { state: S.COMMENT, comment: ``, sgmlDecl: `` })
                    else if ((this.sgmlDecl + c).toUpperCase() === DOCTYPE) { this.state = S.DOCTYPE; if (this.doctype || this.sawRoot) strictFail(this, `Inappropriately located doctype declaration`); Object.mergify(this, { doctype: ``, sgmlDecl: `` }) }
                    else if (c === `>`) { emitNode(this, `onsgmldeclaration`, this.sgmlDecl); Object.mergify(this, { sgmlDecl: ``, state: S.TEXT }) }
                    else if (isQuote(c)) Object.mergify(this, { state: S.SGML_DECL_QUOTED, sgmlDecl: `${this.sgmlDecl}${c}` })
                    else this.sgmlDecl += c
                    continue
                case S.SGML_DECL_QUOTED:
                    if (c === this.q) Object.mergify(this, { state: S.SGML_DECL, q: `` })
                    this.sgmlDecl += c
                    continue
                case S.DOCTYPE:
                    if (c === `>`) { emitNode(this, `ondoctype`, this.doctype); Object.mergify(this, { state: S.TEXT, doctype: true }) }
                    else { this.doctype += c; if (c === `[`) this.state = S.DOCTYPE_DTD; else if (isQuote(c)) Object.mergify(this, { state: S.DOCTYPE_QUOTED, q: c }) }
                    continue
                case S.DOCTYPE_QUOTED:
                    this.doctype += c
                    if (c === this.q) Object.mergify(this, { q: ``, state: S.DOCTYPE })
                    continue
                case S.DOCTYPE_DTD:
                    this.doctype += c
                    if (c === `]`) this.state = S.DOCTYPE
                    else if (isQuote(c)) Object.mergify(this, { state: S.DOCTYPE_DTD_QUOTED, q: c })
                    continue
                case S.DOCTYPE_DTD_QUOTED:
                    this.doctype += c
                    if (c === this.q) Object.mergify(this, { state: S.DOCTYPE_DTD, q: `` })
                    continue
                case S.COMMENT:
                    if (c === `-`) this.state = S.COMMENT_ENDING
                    else this.comment += c
                    continue
                case S.COMMENT_ENDING:
                    if (c === `-`) { Object.mergify(this, { state: S.COMMENT_ENDED, comment: textopts(this.opt, this.comment) }); if (this.comment) emitNode(this, `oncomment`, this.comment); this.comment = `` }
                    else Object.mergify(this, { comment: `${this.comment}-${c}`, state: S.COMMENT })
                    continue
                case S.COMMENT_ENDED:
                    if (c !== `>`) { strictFail(this, `Malformed comment`); Object.mergify(this, { comment: `${this.comment}--${c}`, state: S.COMMENT }) }
                    else this.state = S.TEXT
                    continue
                case S.CDATA:
                    if (c === `]`) this.state = S.CDATA_ENDING
                    else this.cdata += c
                    continue
                case S.CDATA_ENDING:
                    if (c === `]`) this.state = S.CDATA_ENDING_2
                    else Object.mergify(this, { cdata: `${this.cdata}]${c}`, state: S.CDATA })
                    continue
                case S.CDATA_ENDING_2:
                    if (c === `>`) { if (this.cdata) emitNode(this, `oncdata`, this.cdata); emitNode(this, `onclosecdata`); Object.mergify(this, { cdata: ``, state: S.TEXT }) }
                    else if (c === `]`) this.cdata += `]`
                    else Object.mergify(this, { cdata: `${this.cdata}]]${c}`, state: S.CDATA })
                    continue
                case S.PROC_INST:
                    if (c === `?`) this.state = S.PROC_INST_ENDING
                    else if (isWhitespace(c)) this.state = S.PROC_INST_BODY
                    else this.procInstName += c
                    continue
                case S.PROC_INST_BODY:
                    if (!this.procInstBody && isWhitespace(c)) continue
                    else if (c === `?`) this.state = S.PROC_INST_ENDING
                    else this.procInstBody += c
                    continue
                case S.PROC_INST_ENDING:
                    if (c === `>`) { emitNode(this, `onprocessinginstruction`, { name: this.procInstName, body: this.procInstBody }); Object.mergify(this, { procInstName: ``, procInstBody: ``, state: S.TEXT }) }
                    else Object.mergify(this, { procInstBody: `${this.procInstBody}?${c}`, state: S.PROC_INST_BODY })
                    continue
                case S.OPEN_TAG:
                    if (isMatch(nameBody, c)) this.tagName += c
                    else {
                        newTag(this)
                        if (c === `>`) openTag(this)
                        else if (c === `/`) this.state = S.OPEN_TAG_SLASH
                        else { if (!isWhitespace(c)) strictFail(this, `Invalid character in tag name`); this.state = S.ATTRIB }
                    }
                    continue
                case S.OPEN_TAG_SLASH:
                    if (c === `>`) { openTag(this, true); closeTag(this) }
                    else { strictFail(this, `Forward-slash in opening tag not followed by >`); this.state = S.ATTRIB }
                    continue
                case S.ATTRIB:
                    if (isWhitespace(c)) continue
                    else if (c === `>`) openTag(this)
                    else if (c === `/`) this.state = S.OPEN_TAG_SLASH
                    else if (isMatch(nameStart, c)) Object.mergify(this, { attribName: c, attribValue: ``, state: S.ATTRIB_NAME })
                    else strictFail(this, `Invalid attribute name`)
                    continue
                case S.ATTRIB_NAME:
                    if (c === `=`) this.state = S.ATTRIB_VALUE
                    else if (c === `>`) { strictFail(this, `Attribute without value`); this.attribValue = this.attribName; attrib(this); openTag(this) }
                    else if (isWhitespace(c)) this.state = S.ATTRIB_NAME_SAW_WHITE
                    else if (isMatch(nameBody, c)) this.attribName += c
                    else strictFail(this, `Invalid attribute name`)
                    continue
                case S.ATTRIB_NAME_SAW_WHITE:
                    if (c === `=`) this.state = S.ATTRIB_VALUE
                    else if (isWhitespace(c)) continue
                    else {
                        strictFail(this, `Attribute without value`)
                        this.tag.attributes[this.attribName] = ``
                        emitNode(this, `onattribute`, { name: this.attribName, value: `` })
                        Object.mergify(this, { attribValue: ``, attribName: `` })
                        if (c === `>`) openTag(this)
                        else if (isMatch(nameStart, c)) Object.mergify(this, { attribName: c, state: S.ATTRIB_NAME })
                        else { strictFail(this, `Invalid attribute name`); this.state = S.ATTRIB }
                    }
                    continue
                case S.ATTRIB_VALUE:
                    if (isWhitespace(c)) continue
                    else if (isQuote(c)) Object.mergify(this, { q: c, state: S.ATTRIB_VALUE_QUOTED })
                    else { strictFail(this, `Unquoted attribute value`); Object.mergify(this, { state: S.ATTRIB_VALUE_UNQUOTED, attribValue: c }) }
                    continue
                case S.ATTRIB_VALUE_QUOTED:
                    if (c !== this.q) { if (c === `&`) this.state = S.ATTRIB_VALUE_ENTITY_Q; else this.attribValue += c; continue }
                    attrib(this)
                    Object.mergify(this, { q: ``, state: S.ATTRIB_VALUE_CLOSED })
                    continue
                case S.ATTRIB_VALUE_CLOSED:
                    if (isWhitespace(c)) this.state = S.ATTRIB
                    else if (c === `>`) openTag(this)
                    else if (c === `/`) this.state = S.OPEN_TAG_SLASH
                    else if (isMatch(nameStart, c)) { strictFail(this, `No whitespace between attributes`); Object.mergify(this, { attribName: c, attribValue: ``, state: S.ATTRIB_NAME }) }
                    else strictFail(this, `Invalid attribute name`)
                    continue
                case S.ATTRIB_VALUE_UNQUOTED:
                    if (!isAttribEnd(c)) {
                        if (c === `&`) this.state = S.ATTRIB_VALUE_ENTITY_U
                        else this.attribValue += c
                        continue
                    }
                    attrib(this)
                    if (c === `>`) openTag(this); else this.state = S.ATTRIB
                    continue
                case S.CLOSE_TAG:
                    if (!this.tagName) {
                        if (isWhitespace(c)) continue
                        else if (notMatch(nameStart, c)) {
                            if (this.script) Object.mergify(this, { script: `${this.script}</${c}`, state: S.SCRIPT })
                            else strictFail(this, `Invalid tagname in closing tag.`)
                        } else this.tagName = c
                    } else if (c === `>`) closeTag(this)
                    else if (isMatch(nameBody, c)) this.tagName += c
                    else if (this.script) Object.mergify(this, { script: `${this.script}</${this.tagName}`, tagName: ``, state: S.SCRIPT })
                    else { if (!isWhitespace(c)) strictFail(this, `Invalid tagname in closing tag`); this.state = S.CLOSE_TAG_SAW_WHITE }
                    continue
                case S.CLOSE_TAG_SAW_WHITE:
                    if (isWhitespace(c)) continue
                    if (c === `>`) closeTag(this)
                    else strictFail(this, `Invalid characters in closing tag`)
                    continue
                case S.TEXT_ENTITY:
                case S.ATTRIB_VALUE_ENTITY_Q:
                case S.ATTRIB_VALUE_ENTITY_U:
                    let [returnState, buffer] = new Array()
                    switch (this.state) {
                        case S.TEXT_ENTITY: returnState = S.TEXT, buffer = `textNode`; break
                        case S.ATTRIB_VALUE_ENTITY_Q: returnState = S.ATTRIB_VALUE_QUOTED, buffer = `attribValue`; break
                        case S.ATTRIB_VALUE_ENTITY_U: returnState = S.ATTRIB_VALUE_UNQUOTED, buffer = `attribValue`; break
                    }
                    if (c === `;`) {
                        this[buffer] += parseEntity(this)
                        Object.mergify(this, { entity: ``, state: returnState })
                    } else if (isMatch(this.entity.length ? entityBody : entityStart, c)) this.entity += c
                    else {
                        strictFail(this, `Invalid character in entity name`)
                        this[buffer] += `&${this.entity}${c}`
                        Object.mergify(this, { entity: ``, state: returnState })
                    }
                    continue
                default: throw new Error(this, `Unknown state: ${this.state}`)
            }
        }
        if (this.position >= this.bufferCheckPosition) checkBufferLength(this)
        return this
    }
    if (!String.fromCodePoint) {
        (() => {
            let [stringFromCharCode, floor, fromCodePoint] = [
                String.fromCharCode,
                Math.floor,
                _ => {
                    let [MAX_SIZE, codeUnits, index, length, result, highSurrogate, lowSurrogate] = [0x4000, new Array(), -1, arguments.length, ``]
                    if (!length) return ``
                    while (++index < length) {
                        let codePoint = Number(arguments[index])
                        if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) !== codePoint) throw RangeError(`Invalid code point: ${codePoint}`)
                        if (codePoint <= 0xFFFF) codeUnits.push(codePoint)
                        else codePoint -= 0x10000, highSurrogate = (codePoint >> 10) + 0xD800, lowSurrogate = (codePoint % 0x400) + 0xDC00, codeUnits.push(highSurrogate, lowSurrogate)
                        if (index + 1 === length || codeUnits.length > MAX_SIZE) result += stringFromCharCode.apply(null, codeUnits), codeUnits.length = 0
                    }
                    return result
                }
            ]
            if (Object.defineProperty) Object.defineProperty(String, `fromCodePoint`, { value: fromCodePoint, configurable: true, writable: true })
            else String.fromCodePoint = fromCodePoint
        })
    }
})(typeof exports === `undefined` ? this.sax = {} : exports)
