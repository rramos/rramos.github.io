---
title: FastAPI
date: '2025-03-27T00:00:20+00:00'
lang: en
draft: false
tags:
    - Backend
    - Framework
    - Python
---

In this article we will go through the creation of a simple API using FastAPI and generation of Interactive API docs

## Intro ##

### What is FastAPI ###

FastAPI is a modern, fast (high-performance), web framework for building APIs with Python based on standard Python type hints.

If you'd like to explore a similar topic in GoLang, check out the following [article](https://rramos.github.io/2025/03/26/echo/).


### Features ###

The key features are:

* **Fast**: Very high performance, on par with NodeJS and Go (thanks to Starlette and Pydantic). One of the fastest Python frameworks available.
* **Fast to code**: Increase the speed to develop features by about 200% to 300%.
* **Fewer bugs**: Reduce about 40% of human (developer) induced errors.
* **Intuitive**: Great editor support. Completion everywhere. Less time debugging.
* **Easy**: Designed to be easy to use and learn. Less time reading docs.
* **Short**: Minimize code duplication. Multiple features from each parameter declaration. Fewer bugs.
* **Robust**: Get production-ready code. With automatic interactive documentation.
* **Standards-based**: Based on (and fully compatible with) the open standards for APIs: OpenAPI (previously known as Swagger) and JSON Schema.

### Requirements ###

FastAPI is build with the following:

* [Starlette](https://www.starlette.io) for the web parts.
* [Pydantic](https://docs.pydantic.dev/latest) for the data parts.

## Testing ##

### Setup ###

Lets start by preparing the python environment

```sh
python -m venv venv
source venv/bin/activate

pip install "fastapi[standard]"
```

### Create main.py ###

Then create the following file `main.py` with the content

```python
from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

```

### Run it ###

One can test with the following command `fastapi dev main.py`

It will will start a development server and one can access:
* <http://127.0.0.1:8000> the root level of our API
* <http://127.0.0.1:8000/docs> OpenAPI autogenerated interface 
* <http://127.0.0.1:8000/redoc> New Doc version based on [Redoc](https://redocly.com/redoc)

### Test GET ###

If you open the browser at <http://127.0.0.1:8000/items/5?q=somequery>, you will get the following JSON response:

```json
{"item_id": 5, "q": "somequery"}
```

### Recap ###

In this example you created an API that:

* Receives HTTP requests in the paths `/` and `/items/{item_id}`.
* Both paths take `GET` operations (also known as HTTP methods).
* The path `/items/{item_id}` has a path parameter `item_id` that should be an `int`.
* The path `/items/{item_id}` has an optional `str` query parameter `q`.

### Add PUT method ###

Now lets modify `main.py` to receive a body from a `PUT` request including the additional import

```python
from pydantic import BaseModel
```

We declare a new class to store the API data as

```python
class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None
```

And a new handler for `PUT` requests

```python
@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}
```

If you reload <http://127.0.0.1:8000/docs> you can see the API was automatically updated

## Database ##

Now lets spice this a bit and use a Relational database following the [tutorial](https://fastapi.tiangolo.com/tutorial/sql-databases/)

We need to add another package to our environment

```sh
pip install sqlmodel
```

Replace your previous `main.py` file with the following

```python
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    age: int | None = Field(default=None, index=True)
    secret_name: str


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/heroes/")
def create_hero(hero: Hero, session: SessionDep) -> Hero:
    session.add(hero)
    session.commit()
    session.refresh(hero)
    return hero


@app.get("/heroes/")
def read_heroes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Hero]:
    heroes = session.exec(select(Hero).offset(offset).limit(limit)).all()
    return heroes


@app.get("/heroes/{hero_id}")
def read_hero(hero_id: int, session: SessionDep) -> Hero:
    hero = session.get(Hero, hero_id)
    if not hero:
        raise HTTPException(status_code=404, detail="Hero not found")
    return hero


@app.delete("/heroes/{hero_id}")
def delete_hero(hero_id: int, session: SessionDep):
    hero = session.get(Hero, hero_id)
    if not hero:
        raise HTTPException(status_code=404, detail="Hero not found")
    session.delete(hero)
    session.commit()
    return {"ok": True}
```

### SQLModel ###

Lets review the `SQLModel` :

```python
class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    age: int | None = Field(default=None, index=True)
    secret_name: str
```

* `table=True` tells SQLModel that this is a table model, it should represent a table in the SQL database, it's not just a data model.

* `Field(primary_key=True)` tells SQLModel that the id is the primary key in the SQL database

* By having the type as `int | None`, SQLModel will know that this column should be an `INTEGER` in the SQL database and that it should be `NULLABLE`.

* `Field(index=True)` tells SQLModel that it should create a SQL index for this column, that would allow faster lookups in the database when reading data filtered by this column.

* SQLModel will know that something declared as `str` will be a SQL column of type `TEXT` (or `VARCHAR`, depending on the database).

### SQL Engine ###

A SQLModel `engine` (underneath it's actually a **SQLAlchemy** engine) is what holds the connections to the database, which in this case is SQLite.

```python
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

```

### Create the Tables ###

The function `SQLModel.metadata.create_all(engine)` is used to create the tables for all the table models.

```python
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
```

### Create a Session Dependency ###

A Session is what stores the objects in memory and keeps track of any changes needed in the data, then it uses the engine to communicate with the database.

We will create a FastAPI dependency with `yield` that will provide a new Session for each request. This is what ensures that we use a single session per request. 🤓

Then we create an Annotated dependency `SessionDep` to simplify the rest of the code that will use this dependency.

```python
def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]
```

### Create Database Tables on Startup ###

We will create the database tables when the application starts.

```python
app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
```

### Create a Hero ###

Because each SQLModel model is also a Pydantic model, you can use it in the same type annotations that you could use Pydantic models.

For example, if you declare a parameter of type Hero, it will be read from the JSON body.

```python
@app.post("/heroes/")
def create_hero(hero: Hero, session: SessionDep) -> Hero:
    session.add(hero)
    session.commit()
    session.refresh(hero)
    return hero
```
Here we use the `SessionDep` dependency (a `Session`) to add the new `Hero` to the `Session` instance, commit the changes to the database, refresh the data in the `hero`, and then return it

### Read Heroes ###

We can read Heroes from the database using a `select()`. We can include a `limit` and `offset` to paginate the results.

```python
@app.get("/heroes/")
def read_heroes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Hero]:
    heroes = session.exec(select(Hero).offset(offset).limit(limit)).all()
    return heroes
```

## Extend ##

If you would like to extend this, I strongly recommend to follow th original [tutorial](https://fastapi.tiangolo.com/tutorial/sql-databases/#update-the-app-with-multiple-models) for several models

## Conclusion ##

In this article, we explored two tutorials to quickly get started with FastAPI. We identified its key features, built a sample API with autogenerated OpenAPI documentation, and extended it by integrating SQLModel to create a CRUD API for managing heroes.

The framework is incredibly easy to use, making it a great starting point if you want to extend your Python project with backend endpoints.

I do have some concerns about its performance in a production environment, but the following [article](https://fastapi.tiangolo.com/benchmarks) addresses these points to clear up any doubts. That said, I highly recommend trying it out for yourself.

The documentation is extensive and well-organized—one of the best I've seen in a while.

I’ll definitely keep an eye on this framework for future Python projects.


## References ##

* <https://fastapi.tiangolo.com/>
* <https://docs.pydantic.dev>
* <https://fastapi.tiangolo.com/tutorial/>
* <https://fastapi.tiangolo.com/tutorial/sql-databases/>
