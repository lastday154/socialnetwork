## Socialnetwork ##

**Socialnetwork** is a simple web application, using Express RESTful API server
to enable user to add, subscribe, block friends.

The video demo that goes with this project can be found here
  
## Usage ##
Just clone or download and run **npm install** and then **node app** to start

#### User Stories

**1. As a user, I need an API to create a friend connection between two email addresses.**

http://localhost:3000/users/create
The API should receive the following JSON request:

```
{
  "friends":
    [
      "andy@example.com",
      "john@example.com"
    ]
}
```

The API should return the following JSON response on success:

```
{
  "success": true
}
```

**2. As a user, I need an API to retrieve the friends list for an email address.**

http://localhost:3000/users/fetch 
The API should receive the following JSON request:

```
{
  "email": "andy@example.com"
}
```

The API should return the following JSON response on success:

```
{
  "success": true,
  "friends" :
    [
      'john@example.com'
    ],
  "count" : 1   
}
```

**3. As a user, I need an API to retrieve the common friends list between two email addresses.**

http://localhost:3000/users/common

The API should receive the following JSON request:

```
{
  "friends":
    [
      "andy@example.com",
      "john@example.com"
    ]
}
```

The API should return the following JSON response on success:

```
{
  "success": true,
  "friends" :
    [
      'common@example.com'
    ],
  "count" : 1   
}
```

**4. As a user, I need an API to subscribe to updates from an email address.**

http://localhost:3000/users/subscribe

Please note that "subscribing to updates" is NOT equivalent to "adding a friend connection".

The API should receive the following JSON request:

```
{
  "requestor": "lisa@example.com",
  "target": "john@example.com"
}
```

The API should return the following JSON response on success:

```
{
  "success": true
}
```

**5. As a user, I need an API to block updates from an email address.**

http://localhost:3000/users/block

Suppose "andy@example.com" blocks "john@example.com":

- if they are connected as friends, then "andy" will no longer receive notifications from "john"
- if they are not connected as friends, then no new friends connection can be added

The API should receive the following JSON request:

```
{
  "requestor": "andy@example.com",
  "target": "john@example.com"
}
```

The API should return the following JSON response on success:

```
{
  "success": true
}
```

Please propose JSON responses for any errors that might occur.

**6. As a user, I need an API to retrieve all email addresses that can receive updates from an email address.**

http://localhost:3000/users/retrieve

Eligibility for receiving updates from i.e. "john@example.com":
- has not blocked updates from "john@example.com", and
- at least one of the following:
  - has a friend connection with "john@example.com"
  - has subscribed to updates from "john@example.com"
  - has been @mentioned in the update

The API should receive the following JSON request:

```
{
  "sender":  "john@example.com",
  "text": "Hello World! kate@example.com"
}
```

The API should return the following JSON response on success:

```
{
  "success": true
  "recipients":
    [
      "lisa@example.com",
      "kate@example.com"
    ]
}
```

