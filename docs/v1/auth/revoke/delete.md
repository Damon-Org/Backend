# DELETE revoke

This endpoint will attempt to revoke any session that is feeded to it, assuming that if you know the session ID it's safe to revoke these.

**URL** : `/api/v1/auth/revoke/`

**Method** : `DELETE`

**Auth required** : `NO`

## Request Body

```json
{
    "sessionId": "<sessionId>"
}
```

## Success Response

**Code** : `202 ACCEPTED`

**Content example**

Empty response body.

This endpoint will always return 202 if it is succesful or not.
