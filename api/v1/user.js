import Route from '@/src/structures/routes/Route.js'
import fetch from 'node-fetch'

export default class OAuth extends Route {
    constructor(main) {
        super(main);
    }

    get route() {
        return '/user';
    }

    /**
     * @param {Request} request
     */
    async get(request) {
        const authorization = request.getHeader('authorization');
        if (!authorization) return request.reject(403);

        const session = this.modules.sessions.getSession(authorization);
        if (!session) return request.reject(403);

        return request.accept({
            status: 'success',
            data: await session.me()
        });
    }
}
