# API Docs

Trailing slashes can be omitted when targetting endpoints.

## Open Endpoint

Open endpoints require no Authentication header.

- [Auth](v1/auth/)
    - [`GET /api/v1/auth/oauth/`](v1/auth/oauth/get.md)
    - [`POST /api/v1/auth/oauth/`](v1/auth/oauth/post.md)
    - [`DELETE /api/v1/auth/revoke/`](v1/auth/revoke/delete.md)

## Closed Endpoints

Closed endpoints **require** Authentication.

- [User](v1/users/) `/api/v1/user`
    - [`GET`](v1/user/get.md)
