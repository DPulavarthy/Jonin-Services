/**
 * @file osu! resource sets.
 * 
 * @name sets
 * @see Object.mergify() Found in `services.js`
 */

let osu = require(`./osu.js`)

/**
 * osu! resource: MultiplayerScore.
 * 
 * @name MultiplayerScore
 */

module.exports.MultiplayerScore = class MultiplayerScore extends osu {
	constructor(config, data) {
		super(config, data)
		let num = this.Constants.getNumeric(config.parseNumeric)
		Object.mergify(this, {
			slot: num(data.slot),
			team: this.Constants.Multiplayer.team[data.team],
			userId: data.user_id,
			score: num(data.score),
			maxCombo: num(data.maxcombo),
			rank: null,
			counts: { '300': num(data.count300), '100': num(data.count100), '50': num(data.count50), geki: num(data.countgeki), katu: num(data.countkatu), miss: num(data.countmiss) },
			perfect: data.perfect === `1`,
			pass: data.pass === `1`,
			raw_mods: parseInt(data.enabled_mods || `0`)
		})
	}

	get mods() {
		if (this._mods !== undefined) return this._mods
		this._mods = new Array()
		for (const mod in this.Constants.Mods) if (this.raw_mods & this.Constants.Mods[mod]) this._mods.push(mod)
		return this._mods
	}
}

/**
 * osu! resource: Game.
 * 
 * @name Game
 */

module.exports.Game = class Game extends osu {
	constructor(config, data) {
		super(config, data)
		Object.mergify(this, {
			id: data.game_id,
			raw_start: data.start_time,
			raw_end: data.end_time,
			beatmapId: data.beatmap_id,
			mode: this.Constants.Beatmaps.mode[data.play_mode],
			matchType: data.match_type, // Unknown
			scoringType: this.Constants.Multiplayer.scoringType[data.scoring_type],
			teamType: this.Constants.Multiplayer.teamType[data.team_type],
			raw_mods: parseInt(data.mods),
			scores: data.scores.map(g => new this.MultiplayerScore(config, g))
		})
		for (let prop of [`fetch`, `token`, `Constants`, `baseUrl`, `notFoundAsError`, `completeScores`, `parseNumeric`, `sets`]) delete this[prop]
	}

	get start() { if (this._start !== undefined) return this._start; this._start = new Date(`${this.raw_start} UTC`); return this._start; }

	get end() { if (this._end !== undefined) return this._end; this._end = new Date(`${this.raw_end} UTC`); return this._end; }

	get mods() {
		if (this._mods !== undefined) return this._mods;
		this._mods = new Array();
		for (const mod in this.Constants.Mods) if (this.raw_mods & this.Constants.Mods[mod]) this._mods.push(mod);
		return this._mods;
	}
}

/**
 * osu! resource: Match.
 * 
 * @name Match
 */

module.exports.Match = class Match extends osu {
	constructor(config, data) {
		super(config, data)
		Object.mergify(this, {
			id: data.match.match_id,
			name: data.match.name,
			raw_start: data.match.start_time,
			raw_end: data.match.end_time,
			games: data.games.map(g => new this.Game(config, g))
		})
	}

	get start() { if (this._start !== undefined) return this._start; this._start = new Date(`${this.raw_start} UTC`); return this._start; }

	get end() { if (this._end !== undefined) return this._end; this._end = new Date(`${this.raw_end} UTC`); return this._end; }
}

/**
 * osu! resource: User.
 * 
 * @name User
 */

module.exports.User = class User extends osu {
	constructor(config, data) {
		super(config, data)
		let num = this.Constants.getNumeric(config.parseNumeric)
		Object.mergify(this, {
			id: data.user_id,
			name: data.username,
			counts: { '300': num(data.count300), '100': num(data.count100), '50': num(data.count50), SSH: num(data.count_rank_ssh), SS: num(data.count_rank_ss), SH: num(data.count_rank_sh), S: num(data.count_rank_s), A: num(data.count_rank_a), plays: num(data.playcount) },
			scores: { ranked: num(data.ranked_score), total: num(data.total_score) },
			pp: { raw: num(data.pp_raw), rank: num(data.pp_rank), countryRank: num(data.pp_country_rank) },
			country: data.country,
			level: num(data.level),
			accuracy: num(data.accuracy),
			secondsPlayed: num(data.total_seconds_played),
			raw_joinDate: data.join_date
		})
		for (let prop of [`fetch`, `token`, `Constants`, `baseUrl`, `notFoundAsError`, `completeScores`, `parseNumeric`, `sets`]) delete this[prop]
	}

	get joinDate() { if (this._joinDate !== undefined) return this._joinDate; this._joinDate = new Date(`${this.raw_joinDate} UTC`); return this._joinDate }

	get accuracyFormatted() { return `${parseFloat(this.accuracy).toFixed(2)}%` }
}

/**
 * osu! resource: Beatmap.
 * 
 * @name Beatmap
 */

module.exports.Beatmap = class Beatmap extends osu {
	constructor(config, data) {
		super(config, data)
		let num = this.Constants.getNumeric(config.parseNumeric)
		Object.mergify(this, {
			id: data.beatmap_id,
			beatmapSetId: data.beatmapset_id,
			hash: data.file_md5,
			title: data.title,
			creator: data.creator,
			version: data.version,
			source: data.source,
			artist: data.artist,
			genre: this.Constants.Beatmaps.genre[data.genre_id],
			language: this.Constants.Beatmaps.language[data.language_id],
			rating: num(data.rating),
			bpm: num(data.bpm),
			mode: this.Constants.Beatmaps.mode[data.mode],
			tags: data.tags.split(` `),
			approvalStatus: this.Constants.Beatmaps.approved[data.approved],
			raw_submitDate: data.submit_date,
			raw_approvedDate: data.approved_date,
			raw_lastUpdate: data.last_update,
			maxCombo: num(data.max_combo),
			objects: { normal: num(data.count_normal), slider: num(data.count_slider), spinner: num(data.count_spinner) },
			difficulty: { rating: num(data.difficultyrating), aim: num(data.diff_aim), speed: num(data.diff_speed), size: num(data.diff_size), overall: num(data.diff_overall), approach: num(data.diff_approach), drain: num(data.diff_drain) },
			length: { total: num(data.total_length), drain: num(data.hit_length) },
			counts: { favorites: num(data.favourite_count), favourites: num(data.favourite_count), plays: num(data.playcount), passes: num(data.passcount) },
			hasDownload: data.download_unavailable === `0`,
			hasAudio: data.audio_unavailable === `0`
		})
		for (let prop of [`fetch`, `token`, `Constants`, `baseUrl`, `notFoundAsError`, `completeScores`, `parseNumeric`, `sets`]) delete this[prop]
	}

	get submitDate() { if (this._submitDate !== undefined) return this._submitDate; this._submitDate = new Date(`${this.raw_submitDate} UTC`); return this._submitDate }

	get approvedDate() { if (this._approvedDate !== undefined) return this._approvedDate; this._approvedDate = this.raw_approvedDate ? new Date(`${this.raw_approvedDate} UTC`) : null; return this._approvedDate }

	get lastUpdate() { if (this._lastUpdate !== undefined) return this._lastUpdate; this._lastUpdate = new Date(`${this.raw_lastUpdate} UTC`); return this._lastUpdate }
}

/**
 * osu! resource: Score.
 * 
 * @name Score
 */

module.exports.Score = class Score extends osu {
	constructor(config, data, beatmap) {
		super(config, data, beatmap)
		let num = this.Constants.getNumeric(config.parseNumeric)
		Object.mergify(this, {
			score: num(data.score),
			user: { name: data.username || null, id: data.user_id },
			beatmapId: data.beatmap_id || (beatmap ? beatmap.id : null),
			counts: { '300': num(data.count300), '100': num(data.count100), '50': num(data.count50), geki: num(data.countgeki), katu: num(data.countkatu), miss: num(data.countmiss) },
			maxCombo: num(data.maxcombo),
			perfect: data.perfect === `1`,
			raw_date: data.date,
			rank: data.rank,
			pp: num(data.pp || null),
			hasReplay: data.replay_available === `1`,
			raw_mods: parseInt(data.enabled_mods),
			_beatmap: beatmap
		})
		for (let prop of [`fetch`, `token`, `Constants`, `baseUrl`, `notFoundAsError`, `completeScores`, `parseNumeric`, `sets`]) delete this[prop]
	}

	get beatmap() { return this._beatmap }

	set beatmap(beatmap) { Object.mergify(this, { beatmapId: beatmap.id, _beatmap: beatmap }) }

	get date() { if (this._date !== undefined) return this._date; this._date = new Date(`${this.raw_date} UTC`); return this._date }

	get mods() {
		if (this._mods !== undefined) return this._mods
		this._mods = new Array()
		for (const mod in this.Constants.Mods) if (this.raw_mods & this.Constants.Mods[mod]) this._mods.push(mod)
		return this._mods
	}

	get accuracy() {
		if (!this.beatmap) return undefined
		if (this._accuracy !== undefined) return this._accuracy
		let intCounts = {}
		for (let c in this.counts) intCounts[c] = parseInt(this.counts[c], 10)
		this._accuracy = this.Constants.AccuracyMethods[this.beatmap.mode](intCounts)
		return this._accuracy
	}
}
