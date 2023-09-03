# TODO APPLICATION

_This is very basic application, but it is showing the connection between back and front-end_

### To run this project on your device you have to:

- [x] Install java (17)
- [x] Install npm
- [x] Install env's - for api, and react app
- [x] create DB and connect to it (in application.properties file)

Hibernate should create table automatically

#### Hope you enjoy ;D

This is simple app, so there is only one user (saved in memory), user has automatically admin permissions<br/>
User data:
 - username: `user`
 - password: `password`


## TODO

| STATUS | LINKS                          | REQUEST CODE  | RETURN TYPE      | PARAMETERS      | ACCESS |
|--------|--------------------------------|---------------|------------------|-----------------|--------|
| GET    | `/users/{username}/todos`      | 200 (OK)      | `List<Todo>`     | `String`        | USER   |
| POST   | `/users/{username}/todos`      | 201 (Created) | `Todo`           | `Todo`          | USER   |
| PUT    | `/users/{username}/todos/{id}` | 200 (OK)      | `Todo`           | `String`, `int` | USER   |
| DELETE | `/users/{username}/todos/{id}` | 200 (OK)      | `void`           | `String`, `int` | USER   |
| GET    | `/users/{username}/todos/{id}` | 200 (OK)      | `Optional<Todo>` | `String`, `int` | USER   |
