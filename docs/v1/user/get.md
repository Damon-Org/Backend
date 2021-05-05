# GET user

Get the user object returned by Discord.

**URL** : `/api/v1/user/`

**Method** : `GET`

**Auth required** : `YES`

## Request Body

`Empty`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "id": "243072972326305798",
    "username": "Yimura",
    "avatar": "a_04caac5a65ba312a05999d1476e69c44",
    "discriminator": "6969",
    "public_flags": 131136,
    "flags": 131136,
    "locale": "en-GB",
    "mfa_enabled": true,
    "premium_type": 2,
    "email": "email@example.com",
    "verified": true
}
```
