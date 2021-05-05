import Route from '@/src/structures/routes/Route.js'
import fetch from 'node-fetch'

export default class OAuth extends Route {
    constructor(main) {
        super(main);
    }

    get route() {
        return '/oauth';
    }

    /**
     * @param {Request} request
     */
    get(request) {
        const searchParams = new URLSearchParams(request.searchParams);
        const redirect_uri = searchParams.get('redirect');
        if (!redirect_uri) return request.reject(400);

        const url = new URL('https://discord.com/api/oauth2/authorize');
        url.search = new URLSearchParams(Object.assign({ redirect_uri }, this.auth.oauth.authorization));

        request.writeHead(301, {
            'Content-Type': 'text/html',
            'Location': url.toString()
        });
        request.end(`<a href="${url}">Login</a>`);

        return true;
    }

    /**
     * @param {Request} request
     */
    async post(request) {
        const searchParams = new URLSearchParams(request.searchParams);
        const redirect_uri = searchParams.get('redirect');
        if (!redirect_uri) return request.reject(400);

        const { code } = await request.json();

        const body = new URLSearchParams(Object.assign({ code, redirect_uri }, this.auth.oauth.token, ))

        const res = await fetch('https://discord.com/api/oauth2/token', {
            body: body.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST'
        });

        const response = await res.json();

        if (!res.ok) return request.accept({
            status: "fail",
            data: response
        });

        const session = this.modules.sessions.createSession(response);

        return request.accept({
            status: 'success',
            data: {
                sessionId: session.id
            }
        });
    }
}
