---
title: Strapi and React TODO Application
date: "2024-02-04T15:00:00+00:00"
lang: en
tags:
  - React
  - Frontend
  - Backend
---

In this article I will build a Todo App with Strapi for the backend component and React as frontend.

## Intro ##

In this article I will build a Todo App with Strapi for the backend component and React as frontend. The guide was originally written by Chigozie Oduah check the references links as he as some very interesting articles about Strapi.

## What is Strapi ##

The leading open-source headless CMS. 100% JavaScript / TypeScript and fully customizable.

## Setup backend with Strapi ##

I will be using [bun](https://bun.sh/) to setup packages due to improved performance checkout their page if you want to know more.

Let's start by creating our backend with the command

```bash
bunx create-strapi-app todo-list --quickstart
```

This should have created a new folder `todo-list` you can run the following command on that folder to start your development

You should now access the browser to <http://localhost:1337/admin> and create you admin account so that we can start create a new collection.

If you need to restart the development environment you can enter the todo-list folder and run

```bash
bun run develop
```

### Building the Backend ###

Now for our TODO application lets create a collection.

 1. Navigate to **Content-Type Builder**
 1. Select **Create new collection type**
 1. Call it **Todo**

 Strapi uses this name to reference this collection within our application. Strapi automatically uses the display name to fill the rest of the text boxes.

Create the following fields:

* item : Type ( Text )

And hit **Save**, as our application will be a simple Todo list application that single field will do the job.

### Add test entries ###

After the collection is created, we add some test entries.

 1. Go to **content Manager**
 1. select the Todo collection and choose **Create New entry**
 1. After filling the item information you can **Save** and **Publish**

Repeat the previous step to have more entries.

### Create API Endpoint for our collection ###

We create API endpoints for our frontend using the Todo collection. These endpoints allows a frontend to interact with our collection.

 1. Navigate to **Settings**
 1. Click on **Roles** under **user permission & roles**.
 1. Click on **public** to open the permissions given to the public.
 1. Toggle the **Todo** dropdown under *Permissions* and **Select all** to allow public access to our collection without auth.
 1. Hit **Save**

After performing the following steps you should be able to access the API

* <http://localhost:1337/api/todos>

You should have a working APIs

* **Find (`/api/todos GET`)**: We use this endpoint to get all the items in our Todo collection
* **Create (`/api/todos POST`)**: We use this endpoint to create a new item in our to-do collection.
* **Find one (`/api/todos/ GET`)**: We use this endpoint to get an item in our Todo collection.
* **Update (`/api/todos/ PUT`)**: We use this endpoint to update an item in our Todo collection
* **Delete (`/api/todos/ DELETE`)**: We use this endpoint to delete an item in our Todo collection.

Great that was easy, now lets setup our frontend React application to interact with this API endpoints.

## Setup frontend React App ##

Now lets start the frontend application on the parent folder run the following command

```bash
bunx create-react-app todo-frontend
```

Next create the following two files for the environment variables:

* .env.development

```text
REACT_APP_BACKEND=http://localhost:1337/
```

* .env.production

```bash
REACT_APP_BACKEND=/
```

You can run the frontend application with the following command

```bash
bun run start
```

And access the browser at <http://localhost:3000> which will hold an empty react application.

Lets replace the `App.js` file the following content

```javascript
    import { useState, useEffect } from 'react';
    import TodoItem from './TodoItem';
    import './App.css';
    
    function App() {
      const [todos, setTodos] = useState([]);
      const [newTodo, setNewTodo] = useState("");
    
      useEffect(() => {
        // update update the list of todos
        // when the component is rendered for the first time
        update();
      }, []);
    
      // This function updates the component with the
      // current todo data stored in the server
      function update() {
        fetch(`${process.env.REACT_APP_BACKEND}api/todos`)
          .then(res => res.json())
          .then(todo => {
            setTodos(todo.data);
          })
      }
    
      // This function sends a new todo to the server
      // and then call the update method to update the
      // component
      function addTodo(e) {
        e.preventDefault();
        let item = newTodo;
        let body = {
          data: {
            item
          }
        };
     
        fetch(`${process.env.REACT_APP_BACKEND}api/todos`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(() => {
            setNewTodo("");
            update();
          })
      }
    
      return (
        <div className="app">
          <main>
            {/* we centered the "main" tag in our style sheet*/}
    
            {/* This form collects the item we want to add to our todo, and sends it to the server */}
            <form className="form" onSubmit={addTodo}>
              <input type="text" className="todo_input" placeholder="Enter new todo" value={newTodo} onChange={e => setNewTodo(e.currentTarget.value) }/>
              <button type="submit" className="todo_button">Add todo</button>
            </form>
    
            {/* This is a list view of all the todos in the "todo" state variable */}
            <div>
              {
                todos.map((todo, i) => {
                  return <TodoItem todo={todo} key={i} update={update} />
                })
              }
            </div>
    
          </main>
        </div>
      )
    }
    export default App;
```

Create the following file `TodoItem.jsx` with the following content:

```javascript
    import { useState } from "react";
    import './App.css';
    
    function TodoItem({ todo, update }) {
     
      // Our component uses the "edit" state
      // variable to switch between editing
      // and viewing the todo item
      const [edit, setEdit] = useState(false);
      const [newTodo, setNewTodo] = useState("");
    
      // This function changes the to-do that
      // is rendered in this component.
      // This function is called when the
      // form to change a todo is submitted
      function changeTodo(e) {
        e.preventDefault();
        let item = newTodo;
        let pos = todo.id;
        let body = {
          data: {
            item
          }
        };
    
        fetch(`${process.env.REACT_APP_BACKEND}api/todos/${pos}`, {
          method: "PUT",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(() => {
            setEdit(false);
            update();
          })
      }
    
      // This function deletes the to-do that
      // is rendered in this component.
      // This function is called when the
      // form to delete a todo is submitted
      function deleteTodo(e) {
        e.preventDefault();
        let pos = todo.id;
     
        fetch(`${process.env.REACT_APP_BACKEND}api/todos/${pos}`, {
          method: "DELETE"
        })
          .then(() => {
            update();
          })
      }
    
      return <div className="todo">
        {/*
          The below toggles between two components
          depending on the current value of the "edit"
          state variable
        */}
        { !edit
            ? <div className="name">{todo.attributes.item}</div>
            : <form onSubmit={changeTodo}>
                <input className="todo_input" type="text" placeholder="Enter new todo" value={newTodo} onChange={e => setNewTodo(e.currentTarget.value)} />
                <button className="todo_button" type="submit">Change todo</button>
              </form>
        }
        <div>
          <button className="delete" onClick={deleteTodo}>delete</button>
          <button className="edit" onClick={() => {
            // this button toggles the "edit" state variable
            setEdit(!edit)
    
            // we add this snippet below to make sure that our "input"
            // for editing is the same as the one for the component when
            // it is toggled. This allows anyone using it to see the current
            // value in the element, so they don't have to write it again
            setNewTodo(todo.attributes.item)
          }}>edit</button>
        </div>
      </div>
    }
    
    export default TodoItem;
```

Also replace App.css file with the following content:

```css
    .app {
      display: flex;
      justify-content: center;
      text-align: center;
    }
    
    .todo_input {
      height: 16px;
      padding: 10px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      border: 2px solid blueviolet;
    }
    
    .todo_button {
      border: 2px solid blueviolet;
      background-color: transparent;
      height: 40px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    
    .todo {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      font-weight: 700;
      margin-bottom: 5px;
      min-width: 340px;
    }
    
    .edit {
      width: 66px;
      font-weight: 700;
      background: blueviolet;
      border: none;
      border-top-right-radius: 5px;
      height: 33px;
      border-bottom-right-radius: 5px;
      color: white;
      font-size: medium;
    }
    
    .delete {
      width: 66px;
      font-weight: 700;
      background: white;
      border: 2px solid blueviolet;
      border-top-left-radius: 5px;
      height: 33px;
      color: blueviolet;
      border-bottom-left-radius: 5px;
      font-size: medium;
    }
    
    .form {
      padding-top: 27px;
      padding-bottom: 27px;
    }
    
    .name {
      max-width: 190.34px;
      text-align: left;
    }
```

After the last update you should have a workable todo app <http://localhost:3000/>

## Deployment ##

I've seen several articles where developers bundle the frontend application on the public folder to keep a single server installation, but according to Strapi is not a good practice.  

## Conclusion ##

In this article we have setup Strapi to setup the backend for a Todo list application and a react frontend that would take advantage of the provided APIs using a [headless architecture](https://vuestorefront.io/blog/headless-architecture).

Strapi allows to quickly setup APIs for Collections that can be defined and managed through a provided UI. Very useful if one would like to decouple the development process, or if you don' t won' t to implement from scratch backend functionalities.

Regarding the level of customization would require extensive exploration. The backoffice allows to create auth tokens, webhooks, SSO, internationalization and also has a marketplace area to include more functionalities.

Also worth mention that if you can leverage [Strapi Cloud](https://strapi.io/cloud) to deploy your Production applications

## References ##

* <https://docs.strapi.io/>
* <https://strapi.io/blog/how-to-build-a-to-do-list-application-with-strapi-and-react-js>
* <https://bun.sh>
