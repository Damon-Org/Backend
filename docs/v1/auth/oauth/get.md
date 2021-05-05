# GET oauth

This endpoint can be used to properly redirect a user to the Discord login page.

**URL** : `/api/v1/auth/oauth/`

**Method** : `GET`

**Auth required** : `NO`

## Request

**Query**
```
?redirect=http%3A%2F%2Flocalhost%2F
```

## Redirect

**Code** : `301 PERMANENT REDIRECT`
