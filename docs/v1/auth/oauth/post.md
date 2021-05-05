# POST oauth

Upgrade a user code to a session id, internally this code will be exchanged with an access token.

**URL** : `/api/v1/auth/oauth/`

**Method** : `POST`

**Auth required** : `NO`

## Request

**Query**
```
?redirect=http%3A%2F%2Flocalhost%2F
```
**Body**
```json
{
    "code": "gBSkH5LCwIkS7oblW1bB1d6v4uxwhO"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": "success",
    "data": {
        "sessionId": "AUXXrZr+4dxlYSgUKzWIIA=="
    }
}
```

## Failure Response

**Code** : `200 OK`

**Content example**

```json
{
    "status": "fail",
    "data": {
        "error": "invalid_request",
        "error_description": "Invalid \"code\" in request."
    }
}
```
