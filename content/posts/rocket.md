---
title: Rocket.rs
date: "2024-05-24T13:00:00+00:00"
lang: en
tags:
  - Rust
  - Frameworks
  - Frontend
  - Backend
  - React
---

In this article I will be going to explore Rocket.rs starting with the basics

## Intro ##

In this article I will be going to explore Rocket.rs starting with the basics

## What is Rocket.rs ##

A web framework for Rust gear Rust that makes it simple to write fast, type-safe, secure web applications with incredible usability, productivity and performance

## Requirements ##

Lets start by setting up rust

```bash
rustup default stable
```

Lets create the new project

```bash
cargo  new  hello-rocket  --bin
cd hello-rocket
```

Now, add Rocket as a dependency in your `Cargo.toml`

```toml
[dependencies]
rocket = "0.5.0"
```

Change the `src/main.rs` file with the following code:

```rust
#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}
```

One can execute the following command to compile and run the application

```bash
cargo run
```

That's it rocket is now running and you can access it through <http://127.0.0.1:8000>

And our Hello World is done.

## Rust CRUD API ##

Now that we done the Hello World application lets spike a bit and create a API based on the following [article](https://codevoweb.com/build-a-simple-api-with-rust-and-rocket)

This article will teach you how to build a simple CRUD API with Rust using the Rocket framework. We’ll create a RESTful API that runs on a Rocket HTTP server and persists data in an in-memory database. (Check the original article if you want to deep dive)

## Setup ##

Lets start by instantiating a rust project to create our API

```bash
mkdir simple-api-rocket
cd simple-api-rocket
cargo init
```

Let's add required packages

```bash
cargo add rocket@0.5.0-rc.2 --features json
cargo add serde --features derive
cargo add chrono --features serde
cargo add uuid --features v4
```

* **rocket** – A web framework for Rust (nightly).
* **serde** – A generic serialization/deserialization framework.
* **chrono** – Date and time library for Rust.
* **uuid** – A library to generate and parse UUIDs in Rust.

Replace the src/main.rs file with the following content:

```rust
use rocket::{get, http::Status, serde::json::Json};
use serde::Serialize;

#[macro_use]
extern crate rocket;

#[derive(Serialize)]
pub struct GenericResponse {
    pub status: String,
    pub message: String,
}

#[get("/healthchecker")]
pub async fn health_checker_handler() -> Result<Json<GenericResponse>, Status> {
    const MESSAGE: &str = "Build Simple CRUD API with Rust and Rocket";

    let response_json = GenericResponse {
        status: "success".to_string(),
        message: MESSAGE.to_string(),
    };
    Ok(Json(response_json))
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/api", routes![health_checker_handler,])
}
```

One can execute the following command `cargon run` and access the following endpoint

* <http://127.0.0.1:8000/api/healthchecker>

For this exercise we will use a in-memory database available to all the route handlers,
we’ll use Rust’s smart pointer called [Arc](https://doc.rust-lang.org/std/sync/struct.Arc.html) along with the [Mutex](https://doc.rust-lang.org/std/sync/struct.Mutex.html).

### Create the Model ###

Create the file `model.rs` file and add the following code:

```rust
use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

#[allow(non_snake_case)]
#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Todo {
    pub id: Option<String>,
    pub title: String,
    pub content: String,
    pub completed: Option<bool>,
    pub createdAt: Option<DateTime<Utc>>,
    pub updatedAt: Option<DateTime<Utc>>,
}

pub struct AppState {
    pub todo_db: Arc<Mutex<Vec<Todo>>>,
}

impl AppState {
    pub fn init() -> AppState {
        AppState {
            todo_db: Arc::new(Mutex::new(Vec::new())),
        }
    }
}

#[allow(non_snake_case)]
#[derive(Debug, Deserialize)]
pub struct UpdateTodoSchema {
    pub title: Option<String>,
    pub content: Option<String>,
    pub completed: Option<bool>,
}

```

This code created a Todo struct and added Serde’s macros on top of it.

The **Deserialize** and **Serialize** macros will allow us to convert the struct to and from JSON

### Create the API Response Structs ###

Here, let’s create structs that implement the [derive(Serialize)] macro to enable us to convert structs into JSON objects before returning them to the client.

So, create a `response.rs` file in the src directory and add the following structs:

```rust
use crate::model::Todo;
use serde::Serialize;

#[derive(Serialize)]
pub struct GenericResponse {
    pub status: String,
    pub message: String,
}

#[derive(Serialize, Debug)]
pub struct TodoData {
    pub todo: Todo,
}

#[derive(Serialize, Debug)]
pub struct SingleTodoResponse {
    pub status: String,
    pub data: TodoData,
}

#[derive(Serialize, Debug)]
pub struct TodoListResponse {
    pub status: String,
    pub results: usize,
    pub todos: Vec<Todo>,
}
```

### Implement the CRUD API ###

* [`get("/healthchecker")`] – This route will return a simple health checker JSON object.
* [`get("/todos?<page>&<limit>")`] – This route will return a selected or paginated list of Todo items.
* [`post("/todos", data = "<body>")`] – This route will add a new Todo item to the data store.
* [`get("/todos/<id>")`] – This route will retrieve a single Todo item from the in-memory database and return it to the client.
* [`patch("/todos/<id>", data = "<body>")`] – This route will edit the fields of a Todo item in the data store.
* [`delete("/todos/<id>")`] – This route will delete a Todo item from the in-memory database.

First things first, create a `handler.rs` file in the src folder and add the following crates and dependencies.

```rust
use crate::{
    model::{AppState, Todo, UpdateTodoSchema},
    response::{GenericResponse, SingleTodoResponse, TodoData, TodoListResponse},
};
use chrono::prelude::*;
use rocket::{
    delete, get, http::Status, patch, post, response::status::Custom, serde::json::Json, State,
};
use uuid::Uuid;

#[get("/healthchecker")]
pub async fn health_checker_handler() -> Result<Json<GenericResponse>, Status> {
    const MESSAGE: &str = "Build Simple CRUD API with Rust and Rocket";

    let response_json = GenericResponse {
        status: "success".to_string(),
        message: MESSAGE.to_string(),
    };
    Ok(Json(response_json))
}

#[get("/todos?<page>&<limit>")]
pub async fn todos_list_handler(
    page: Option<usize>,
    limit: Option<usize>,
    data: &State<AppState>,
) -> Result<Json<TodoListResponse>, Status> {
    let vec = data.todo_db.lock().unwrap();

    let limit = limit.unwrap_or(10);
    let offset = (page.unwrap_or(1) - 1) * limit;

    let todos: Vec<Todo> = vec.clone().into_iter().skip(offset).take(limit).collect();

    let json_response = TodoListResponse {
        status: "success".to_string(),
        results: todos.len(),
        todos,
    };
    Ok(Json(json_response))
}

#[post("/todos", data = "<body>")]
pub async fn create_todo_handler(
    mut body: Json<Todo>,
    data: &State<AppState>,
) -> Result<Json<SingleTodoResponse>, Custom<Json<GenericResponse>>> {
    let mut vec = data.todo_db.lock().unwrap();

    for todo in vec.iter() {
        if todo.title == body.title {
            let error_response = GenericResponse {
                status: "fail".to_string(),
                message: format!("Todo with title: '{}' already exists", todo.title),
            };
            return Err(Custom(Status::Conflict, Json(error_response)));
        }
    }

    let uuid_id = Uuid::new_v4();
    let datetime = Utc::now();

    body.id = Some(uuid_id.to_string());
    body.completed = Some(false);
    body.createdAt = Some(datetime);
    body.updatedAt = Some(datetime);

    let todo = body.to_owned();

    vec.push(body.into_inner());

    let json_response = SingleTodoResponse {
        status: "success".to_string(),
        data: TodoData {
            todo: todo.into_inner(),
        },
    };

    Ok(Json(json_response))
}

#[get("/todos/<id>")]
pub async fn get_todo_handler(
    id: String,
    data: &State<AppState>,
) -> Result<Json<SingleTodoResponse>, Custom<Json<GenericResponse>>> {
    let vec = data.todo_db.lock().unwrap();

    for todo in vec.iter() {
        if todo.id == Some(id.to_owned()) {
            let json_response = SingleTodoResponse {
                status: "success".to_string(),
                data: TodoData { todo: todo.clone() },
            };

            return Ok(Json(json_response));
        }
    }

    let error_response = GenericResponse {
        status: "fail".to_string(),
        message: format!("Todo with ID: {} not found", id),
    };
    Err(Custom(Status::NotFound, Json(error_response)))
}

#[patch("/todos/<id>", data = "<body>")]
pub async fn edit_todo_handler(
    id: String,
    body: Json<UpdateTodoSchema>,
    data: &State<AppState>,
) -> Result<Json<SingleTodoResponse>, Custom<Json<GenericResponse>>> {
    let mut vec = data.todo_db.lock().unwrap();

    for todo in vec.iter_mut() {
        if todo.id == Some(id.clone()) {
            let datetime = Utc::now();
            let title = body.title.to_owned().unwrap_or(todo.title.to_owned());
            let content = body.content.to_owned().unwrap_or(todo.content.to_owned());
            let payload = Todo {
                id: todo.id.to_owned(),
                title: if !title.is_empty() {
                    title
                } else {
                    todo.title.to_owned()
                },
                content: if !content.is_empty() {
                    content
                } else {
                    todo.content.to_owned()
                },
                completed: if body.completed.is_some() {
                    body.completed
                } else {
                    todo.completed
                },
                createdAt: todo.createdAt,
                updatedAt: Some(datetime),
            };
            *todo = payload;

            let json_response = SingleTodoResponse {
                status: "success".to_string(),
                data: TodoData { todo: todo.clone() },
            };
            return Ok(Json(json_response));
        }
    }

    let error_response = GenericResponse {
        status: "fail".to_string(),
        message: format!("Todo with ID: {} not found", id),
    };

    Err(Custom(Status::NotFound, Json(error_response)))
}

#[delete("/todos/<id>")]
pub async fn delete_todo_handler(
    id: String,
    data: &State<AppState>,
) -> Result<Status, Custom<Json<GenericResponse>>> {
    let mut vec = data.todo_db.lock().unwrap();

    for todo in vec.iter_mut() {
        if todo.id == Some(id.clone()) {
            vec.retain(|todo| todo.id != Some(id.to_owned()));
            return Ok(Status::NoContent);
        }
    }

    let error_response = GenericResponse {
        status: "fail".to_string(),
        message: format!("Todo with ID: {} not found", id),
    };
    Err(Custom(Status::NotFound, Json(error_response)))
}

```

You can now start the  application with the following command

```bash
cargo run
```

And test the API accessing the following url: <http://localhost:8000/api/todos?page=1&limit=10>

You can also use the following [json file](https://raw.githubusercontent.com/wpcodevo/simple-api-rocket/master/Todo.postman_collection.json) to test with Postman

Make sure to check the original article which has more detailed information on the this setup

Now we just need some React FrontEnd Application to interact with this service.

### Create FrontEnd Application ###

Now similar to my previous [post](https://rramos.github.io/2024/02/04/strapi/) related with Strapi lets create a frontend application with react.

On a different folder run the following command (Require [bun.sh](bun.sh) )

```bash
bunx create-react-app todo-frontend
```

Next create the following two files for the environment variables:

* `.env.development`

```text
REACT_APP_BACKEND=http://localhost:1337/
```

* `.env.production`

```text
REACT_APP_BACKEND=/
```

You can run the frontend application with the following command

```sh
bun run start
```

I'm not an expert in Frontend development and I did manage to get the **create** operation working, but the listing however didn't populate although I could see on the console the data was refreshed and as the article is already long, I decided to stop here.

If you manage to get the react component working let me know so that I can update the article.

### Cargo Watch ###

In Rust we have a library called `cargo-watch` which watches the source code for changes
and hot-reloads the server when required files change. Lets install it

```bash
cargo install cargo-watch
```

With that out of the way, run this command to start the Rocket HTTP server and restart the server when any file in the src directory changes.

```bash
cargo watch -q -c -w src/ -x run
```

## Conclusion ##

Rust is gaining quite a lot popularity, implementing APIs with Rocket seems fast. This mix of React and Rust in the near future should be mixture that you would will see more.

The performance os Rust allied to the flexibility from the frontend component is something that I need to explore more.

## References ##

* <https://rocket.rs/>
* <https://rocket.rs/v0.5/guide/getting-started/>
* <https://codevoweb.com/build-a-simple-api-with-rust-and-rocket/>
* <https://doc.rust-lang.org/std/sync/struct.Arc.html>
* <https://doc.rust-lang.org/std/sync/struct.Mutex.html>
* <https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/>
