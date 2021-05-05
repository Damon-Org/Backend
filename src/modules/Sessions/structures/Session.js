import fetch from 'node-fetch'

export default class Session {
    /**
     * @param {string} sessionId
     * @param {{
     *  access_token: string,
     *  token_type: string,
     *  expires_in: number,
     *  scope: string
     * }} response
     */
    constructor(sessionId, response) {
        this._id = sessionId;
        this._response = response;

        this._expiry = Date.now() + (response.expires_in * 1e3);
        this._token = response.access_token;
        this._tokenType = response.token_type;
    }

    get id() {
        return this._id;
    }

    get token() {
        return this._token;
    }

    expired() {
        return Date.now() > this._expiry;
    }

    async guilds() {
        if (this.expired()) await this.refresh();

        const res = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                authorization: `${this._tokenType} ${this.token}`
            }
        });

        return res.json();
    }

    async me() {
        if (this.expired()) await this.refresh();

        const res = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${this._tokenType} ${this.token}`
            }
        });

        return res.json();
    }

    async refresh() {

    }

    static deserialize(string) {
        const session = JSON.parse(string);

        return new Session(session.sessionId, session.response);
    }

    serialize() {
        return JSON.stringify({
            sessionId: this.id,
            response: this._response
        });
    }

    verify() {

    }
}
