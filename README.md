# Simple todo app

## Installation

```sh
$ yarn install
```

## MongoDB Docker

```sh
$ docker pull mongo
```

In case you use docker and want an image for MongoDB, just run on port 27017

# REST Api Endpoints

```sh
/user: POST, body: JSON { login: String, password: String }, response: JSON, authentication: none
```

```sh
/login: POST, body: JSON { login: String, password: String }, response: JSON, authentication: none
```

```sh
/post: POST, body: JSON { content: String, date: String (yyyy-mm-dd) }, response: JSON, authentication: Bearer Token
```

```sh
/posts: GET, body: none, queryParam: { content: String, date: String (yyyy-mm-dd), done: String ('true' | 'false' | 'both')},  response: JSON, authentication: none
```

```sh
/post: PUT, body: JSON { content: String, date: String (yyyy-mm-dd), done: Boolean }, queryParam: { id: String }, response: JSON, authentication: Bearer Token
```

```sh
/post: DELETE, body: none, queryParam: { id: String }, response: JSON, authentication: Bearer Token
```

# GraphQL Access

```sh
$ http://localhost:3333/graphql
```
