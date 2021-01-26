/**
 * @file osu! info module.
 * 
 * @name osu
 * @see Object.mergify() Found in `services.js`
 * @usage new <Services>(object[TOKEN]).osu.getUser(object[USER])
 */

/**
 * Get user/beatmap info with the osu module.
 * 
 * @name osu
 */

module.exports = class osu {	

    /**
     * This constructor sets up properties needed by all functions and resource functions.
     * 
     * @name constructor
	 * @param {string} token An osu! access token [https://osu.ppy.sh/p/api/]
     */

	constructor(token) {
		Object.mergify(this, {
			fetch: require(`../fetch/fetch.js`), sets: require(`./sets.js`), token: token, baseUrl: `https://osu.ppy.sh/api`, notFoundAsError: false, completeScores: false, parseNumeric: false,
			Constants: {
				getNumeric: parseNumeric => { return parseNumeric ? v => v === undefined || v === null ? v : parseFloat(v) : v => v },
				Mods: { None: 0, NoFail: 1, Easy: 1 << 1, TouchDevice: 1 << 2, Hidden: 1 << 3, HardRock: 1 << 4, SuddenDeath: 1 << 5, DoubleTime: 1 << 6, Relax: 1 << 7, HalfTime: 1 << 8, Nightcore: 1 << 9, Flashlight: 1 << 10, Autoplay: 1 << 11, SpunOut: 1 << 12, Relax2: 1 << 13, Perfect: 1 << 14, Key4: 1 << 15, Key5: 1 << 16, Key6: 1 << 17, Key7: 1 << 18, Key8: 1 << 19, FadeIn: 1 << 20, Random: 1 << 21, Cinema: 1 << 22, Target: 1 << 23, Key9: 1 << 24, KeyCoop: 1 << 25, Key1: 1 << 26, Key3: 1 << 27, Key2: 1 << 28, KeyMod: 521109504, FreeModAllowed: 522171579, ScoreIncreaseMods: 1049662 },
				URLSchemas: { multiplayerMatch: (id, password) => `osu://mp/${id}${password !== undefined ? `/` + password : ``}`, edit: (position, objects) => `osu://edit/${position}${objects !== undefined ? ` ` + objects : ``}`, channel: name => `osu://chan/#${name}`, download: id => `osu://dl/${id}`, spectate: user => `osu://spectate/${user}` },
				Beatmaps: {
					approved: { '-2': `Graveyard`, '-1': `WIP`, '0': `Pending`, '1': `Ranked`, '2': `Approved`, '3': `Qualified`, '4': `Loved` },
					genre: { '0': `Any`, '1': `Unspecified`, '2': `Video Game`, '3': `Anime`, '4': `Rock`, '5': `Pop`, '6': `Other`, '7': `Novelty`, '9': `Hip Hop`, '10': `Electronic` },
					language: { '0': `Any`, '1': `Other`, '2': `English`, '3': `Japanese`, '4': `Chinese`, '5': `Instrumental`, '6': `Korean`, '7': `French`, '8': `German`, '9': `Swedish`, '10': `Spanish`, '11': `Italian` },
					mode: { '0': `Standard`, '1': `Taiko`, '2': `Catch the Beat`, '3': `Mania` }
				},
				Multiplayer: { scoringType: { '0': `Score`, '1': `Accuracy`, '2': `Combo`, '3': `Score v2` }, teamType: { '0': `Head to Head`, '1': `Tag Co-op`, '2': `Team vs`, '3': `Tag Team vs` }, team: { '0': `None`, '1': `Blue`, '2': `Red` } },
				AccuracyMethods: {
					Standard: c => { let total = c[`50`] + c[`100`] + c[`300`] + c.miss; return total === 0 ? 0 : ((c[`300`] * 300 + c[`100`] * 100 + c[`50`] * 50) / (total * 300)) },
					Taiko: c => { let total = c[`100`] + c[`300`] + c.miss; return total === 0 ? 0 : (((c[`300`] + c[`100`] * .5) * 300) / (total * 300)) },
					'Catch the Beat': c => { let total = c[`50`] + c[`100`] + c[`300`] + c.katu + c.miss; return total === 0 ? 0 : ((c[`50`] + c[`100`] + c[`300`]) / total) },
					Mania: c => { let total = c[`50`] + c[`100`] + c[`300`] + c.katu + c.geki + c.miss; return total === 0 ? 0 : ((c[`50`] * 50 + c[`100`] * 100 + c.katu * 200 + (c[`300`] + c.geki) * 300) / (total * 300)) }
				}
			}
		})
	}

    /**
     * Get the module's preset config properties.
     * 
     * @name config
	 * @return {object} An object with the config data.
     */

	get config() { return { notFoundAsError: this.notFoundAsError, completeScores: this.completeScores, parseNumeric: this.parseNumeric } }

    /**
     * Make the API request to the osu! API.
     * 
     * @name apiCall
	 * @param {string} endpoint Which data we are looking for [/user, /beatmap, etc.].
	 * @param {object} options An object with the config data.
	 * @return {object} JSON data from the request.
     */

	async apiCall(endpoint, options) {
		if (!this.token) throw new Error(`token not set`)
		Object.mergify(options, { k: this.token, "User-Agent": `testbot` })
		let url = new URL(`${this.baseUrl}${endpoint}`)
		Object.keys(options).forEach(key => url.searchParams.append(key, options[key]))
		try {
			let resp = await this.fetch(url), body = await resp.json()
			return body
		} catch (error) { throw new Error(error.response || error) }
	}

    /**
     * A not found case.
     * 
     * @name notFound
	 * @param {string} response The error returned by the osu! API.
	 * @return {string} Return string to code rather than throwing an error.
     */

	notFound(response) { if (this.notFoundAsError) throw new Error(`Not found`); return response }

    /**
     * Get beatmap data from the osu! API.
     * 
     * @name getBeatmaps
	 * @param {object} options An object with search query paramters that are sent on the API request.
	 * @return {array} Return array with found beatmap objects.
     */

	async getBeatmaps(options) {
		let resp = await this.apiCall(`/get_beatmaps`, options)
		if (resp.length === 0) return this.notFound(resp)
		return resp.map(bm => new this.sets.Beatmap(this.config, bm))
	}

    /**
     * Get user data from the osu! API.
     * 
     * @name getUser
	 * @param {object} options An object with search query paramters that are sent on the API request.
	 * @return {array} Return array with found user objects.
     */

	async getUser(options) {
		let resp = await this.apiCall(`/get_user`, options)
		if (resp.length === 0) return this.notFound(resp)
		return new this.sets.User(this.config, resp[0])
	}

    /**
     * Get beatmap score data from the osu! API.
     * 
     * @name getScores
	 * @param {object} options An object with search query paramters that are sent on the API request.
	 * @return {array} Return array with found beatmap scores objects.
     */

	async getScores(options) {
		let resp = await this.apiCall(`/get_scores`, options)
		if (resp.length === 0) return this.notFound(resp)
		if (!this.completeScores) return resp.map(sc => new Score(this.config, sc))
		let beatmaps = await this.getBeatmaps({ b: options.b })
		return resp.map(sc => new this.sets.Score(this.config, sc, beatmaps[0]))
	}

    /**
     * Get user best data from the osu! API.
     * 
     * @name getUserBest
	 * @param {object} options An object with search query paramters that are sent on the API request.
	 * @return {array} Return array with found user best objects.
     */

	async getUserBest(options) {
		let resp = await this.apiCall(`/get_user_best`, options)
		if (resp.length === 0) return this.notFound(resp)
		if (!this.completeScores) return resp.map(sc => new Score(this.config, sc))
		let scores = resp.map(sc => new this.sets.Score(this.config, sc))
		for (let score of scores) score.beatmap = (await this.getBeatmaps({ b: score.beatmapId }))[0]
		return scores
	}

    /**
     * Get user recent data from the osu! API.
     * 
     * @name getUserRecent
	 * @param {object} options An object with search query paramters that are sent on the API request.
	 * @return {array} Return array with found user recent objects.
     */

	async getUserRecent(options) {
		let resp = await this.apiCall(`/get_user_recent`, options)
		if (resp.length === 0) return this.notFound(resp)
		if (!this.completeScores) return resp.map(sc => new Score(this.config, sc))
		let scores = resp.map(sc => new this.sets.Score(this.config, sc))
		for (let score of scores) score.beatmap = (await this.getBeatmaps({ b: score.beatmapId }))[0]
		return scores
	}

    /**
     * Get user match data from the osu! API.
     * 
     * @name getMatch
	 * @param {object} options An object with search query paramters that are sent on the API request.
	 * @return {array} Return array with found user match objects.
     */

	async getMatch(options) { let resp = await this.apiCall(`/get_match`, options); if (resp.match === 0) return this.notFound(resp); return new this.sets.Match(this.config, resp) }

    /**
     * Get beatmap replay data from the osu! API.
     * 
     * @name getReplay
	 * @param {object} options An object with search query paramters that are sent on the API request.
	 * @return {array} Return array with found beatmap replay objects.
     */

	async getReplay(options) { return await this.apiCall(`/get_replay`, options) }
}
