import BaseModule from './structures/BaseModule.js'
import crypto from 'crypto'
import Redis from 'ioredis'
import Session from './structures/Session.js'

export default class Sessions extends BaseModule {
    _sessions = new Map();
    _ready = false;

    constructor(main) {
        super(main);

        this.register(Sessions, {
            name: 'sessions'
        });
    }

    get ready() {
        return this._ready;
    }

    get sessions() {
        return this._sessions;
    }

    /**
     * Returns a unique enough session id string
     * @param {UserSchema} user The UUID of the user to assign the session to.
     */
    createSession(response) {
        let sessionId;

        do {
            sessionId = crypto.randomBytes(16).toString('base64');
        } while (this.sessions.has(sessionId));

        const session = new Session(sessionId, response);
        // Keep a local copy of our sessions
        this.sessions.set(sessionId, session);

        this.publisher.publish('session_created', session.serialize());

        return session;
    }

    /**
     * @param {string} sessionId
     * @returns {Session}
     */
    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }

    init() {
        this.subscriber = new Redis({
            port: this.auth.redis.port,
            host: this.auth.redis.host,
            password: this.auth.redis.password,
        });
        this.publisher = this.subscriber.duplicate();

        this.subscriber.on('connect', this.onConnect.bind(this));
        this.subscriber.on('close', this.onDisconnect.bind(this));
        this.subscriber.on('message', this.onMessage.bind(this));

        this.subscriber.subscribe('session_created');
        this.subscriber.subscribe('session_updated');
        this.subscriber.subscribe('session_revoked');

        return true;
    }

    /**
     * @param {string} sessionId
     * @returns {boolean}
     */
    isSessionValid(sessionId, permLevel) {
        if (!this.ready) return false;

        const session = this.getSession(sessionId);
        if (session) return session.isValid(permLevel);
        return false;
    }

    onConnect() {
        this.log.info('SESSION', 'Connected to redis server');

        this._ready = true;
    }

    onDisconnect() {
        this.log.warn('SESSION', 'Lost connection to redis server');

        this._ready = false;
    }

    onMessage(channel, message) {
        switch (channel) {
            case 'session_created':
                return this.onSessionCreated(message);
            case 'session_revoked':
                return this.onSessionRevoked(message);
        }
    }

    onSessionCreated(data) {
        const session = Session.deserialize(data);
        if (this.sessions.has(session.id)) return;

        this.sessions.set(session.id, session);
    }

    onSessionUpdated(data) {

    }

    onSessionRevoked(sessionIdResolvable) {
        sessionIdResolvable = JSON.parse(sessionIdResolvable);

        for (const sessionId of sessionIdResolvable)
            this.sessions.delete(sessionId);
    }

    /**
     * Removes the session from the local cache and from the database
     * @param {string|Array<string>} sessionIdResolvable
     */
    revokeSession(sessionIdResolvable) {
        if (!sessionIdResolvable instanceof Array) sessionIdResolvable = [sessionIdResolvable];
        this.publisher.publish('session_revoked', JSON.stringify(sessionIdResolvable));
    }
}
