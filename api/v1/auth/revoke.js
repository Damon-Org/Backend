import Route from '@/src/structures/routes/Route.js'

export default class SessionRevoke extends Route {
    constructor(main) {
        super(main);
    }

    get route() {
        return '/revoke';
    }

    /**
     * Revoke a session ID
     * @param {Request} request
     */
    async delete(request) {
        const body = await request.json();

        if (body.sessionId)
            this.modules.sessions.revokeSession(body.sessionId);

        // HTTP 202 ACCEPTED
        return request.accept('', 202);
    }
}
