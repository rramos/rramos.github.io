---
title: Echo
date: '2025-03-26T20:00:00+00:00'
lang: en
draft: false
tags:
    - Go
    - Framework
    - Web Development
---

In this article we will go through echo framework and create a CRUD server based on the labstack.com cookbook

## Intro ##

### What is echo ? ###

The Echo project is a powerful and versatile web framework for building scalable and high-performance web applications in the Go programming language. It follows the principles of simplicity, flexibility, and performance to provide developers with an efficient toolkit for building robust web applications.

## Features ##

* **Fast and Lightweight**: Echo is designed for speed and efficiency, ensuring minimal overhead and high performance for handling HTTP requests and responses.
* **Routing**: The framework offers a flexible and intuitive routing system that allows developers to define routes with parameters, query strings, and custom handlers.
* **Middleware Support**: Echo provides extensive middleware support, enabling developers to easily implement cross-cutting concerns such as logging, authentication, error handling, and more.
* **Context-based Request Handling**: With its context-based request handling, Echo offers easy access to request-specific data and parameters, simplifying the development of web applications.
* **Powerful Template Rendering**: Echo includes a powerful template rendering engine that supports various template languages, allowing developers to generate dynamic HTML content effortlessly.
* **Validation and Binding:** The framework provides robust validation and data binding capabilities, making it straightforward to validate incoming request data and bind it to Go structs.
* **Extensibility**: Echo is highly extensible, with support for custom middleware, template engines, and other components, enabling developers to tailor the framework to their specific needs.
* **Community and Ecosystem**: The Echo project benefits from a vibrant and active community that contributes libraries, plugins, and extensions, fostering an ecosystem of reusable components.

## CRUD Application ##

This application will run on port 1323 and route requests to Create/Replace/Update/Delete users. It will include labstack middleware for improved logs and recover from panics anywhere in the chain.

You can check the full version on the following cookbook repo [echo-cookbook](https://github.com/rramos/echo-cookbook/tree/main/crud).

### Interpretation ###

The main function would look like

```go
func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes
	e.GET("/users", getAllUsers)
	e.POST("/users", createUser)
	e.GET("/users/:id", getUser)
	e.PUT("/users/:id", updateUser)
	e.DELETE("/users/:id", deleteUser)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
```

We start by creating a echo object and assign the respective routing methods and the function that would deal with each.
It ends by starting the server on the port `1323`.

We will check each handler individually, but first lets review the imports used

```go
package main

import (
	"net/http"
	"strconv"
	"sync"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)
```

* [net/http](https://pkg.go.dev/net/http) - Package http provides HTTP client and server implementations.
  * Required for the http handling  
* [strconv](https://pkg.go.dev/strconv) - Package strconv implements conversions to and from string representations of basic data types.
  * Required for string conversion
* [sync](https://pkg.go.dev/sync) - Package sync provides basic synchronization primitives such as mutual exclusion locks.
  * Required for simple locks

The following ones are required to use the echo framework and the middleware component

```sh
  	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
```    

We will use the following structure to store **Users** data with `ID` and `Name` attributes

```go
type (
	user struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	}
)
```

Also we will use the following variable to store in memory the list of `users`. The `seq` variable is used to define a unique user identifier and `lock` to manage race conditions. 

```go
var (
	users = map[int]*user{}
	seq   = 1
	lock  = sync.Mutex{}
)
```

Now lets review the handlers

#### CreateUser ####

This handle creates a new user:
1. Activate lock
2. Create user struct with available ID from seq
3. Tries to bind the request with the struct user
4. Add the new user to the array of users
5. increment the seq of IDs
6. Return the http status

```go
func createUser(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()
	u := &user{
		ID: seq,
	}
	if err := c.Bind(u); err != nil {
		return err
	}
	users[u.ID] = u
	seq++
	return c.JSON(http.StatusCreated, u)
```

> **NOTE**: The `defer` statement postpones the execution of a function until the surrounding function completes. This ensures that the specified code executes after the lock is released. This is used in multiple handlers to maintain consistency and prevent race conditions.

#### getUser ####

1. By using `c.Param("id")` it retrieves the id parameter from the `GET` request and retrieve the respective user from the array `users`.
2. Returns the user object as JSON

```go
func getUser(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()
	id, _ := strconv.Atoi(c.Param("id"))
	return c.JSON(http.StatusOK, users[id])
}
```

#### updateUser ####

1. Creates a new user object and binds it with params from the request
2. Converts id to `int` from `string`
3. Update the user object at index `id` with the new `Name`
4. return the new user `u` as JSON 

```go
func updateUser(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()
	u := new(user)
	if err := c.Bind(u); err != nil {
		return err
	}
	id, _ := strconv.Atoi(c.Param("id"))
	users[id].Name = u.Name
	return c.JSON(http.StatusOK, users[id])
}
```

#### deleteUser ####

1. Obtain the index value from the provided `c.Param("id")` and convert it to int
2. delete from `users` in the provided index
3. return the Http status 204 (*StatusNoContent*)

```go
func deleteUser(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()
	id, _ := strconv.Atoi(c.Param("id"))
	delete(users, id)
	return c.NoContent(http.StatusNoContent)
}
```

#### getAllUsers ####

1. Returns the array of `users` converted to JSON

```go
func getAllUsers(c echo.Context) error {
	lock.Lock()
	defer lock.Unlock()
	return c.JSON(http.StatusOK, users)
}
```

## Conclusion ##

This is a simple example and by no means consider this for Production use. The clear nature of GoLang syntax allows a quick path on the language 

The clear and concise syntax of GoLang provides a smooth learning curve, enabling developers to quickly grasp the language. This is a basic example and should not be considered for production use. Security aspects, scalability, and a stateful storage solution have been intentionally omitted.

The available middleware components in Echo, combined with its ease of use, make it a powerful tool to have in your portfolio.

Additionally, its well-structured documentation and comprehensive examples enable a quick learning curve for developers new to the stack.


## Resources and Documentation ##

To learn more about the Echo project, you can refer to the following resources:

* Official Website: <https://echo.labstack.com>
* GitHub Repository: <https://github.com/labstack/echo>
* Documentation: <https://echo.labstack.com/docs>
* Community Forum: <https://github.com/labstack/echo/discussions>

## References ##

* <https://github.com/rramos/echo-cookbook>
* <https://echo.labstack.com>
* <https://echo.labstack.com/docs/quick-start>
* <https://echo.labstack.com/docs/cookbook/crud>
* <https://pkg.go.dev/github.com/labstack/echo/v4>
* <https://pkg.go.dev/net/http>
* <https://pkg.go.dev/sync>
