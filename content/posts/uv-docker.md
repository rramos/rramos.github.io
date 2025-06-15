---
title: Dockerized Flask with uv
date: "2025-06-15T16:00:00+00:00"
lang: en
tags:
  - Docker
  - Bootstrap
  - Flask
---
In this article, we will set up a Flask application using `uv`, enhance its appearance with Bootstrap, and finalize the project by containerizing it with Docker.

## Intro ##

In this article, we’ll build a Flask application using uv as the dependency manager, render an HTML template styled with Bootstrap for a modern look, and set up Docker configuration to containerize the app  

### Setup

In order to prepare the python environment for this work lets use `uv` and install flask

```sh
uv init
uv venv
uv pip install flask
source .venv/bin/activate
```

### Flask

Flask is a lightweight WSGI web application framework. It is designed to make getting started quick and easy, with the ability to scale up to complex applications.

The `app.py` code implements a simple web application using Flask framework. The app allows users to trigger the execution of a Python script (`your_script.py`) through a web interface and displays the script's output on the page as default renders the `index.html` template.


```python
from flask import Flask, render_template, request
import subprocess

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    output = None
    if request.method == 'POST':
        # Replace 'your_script.py' with your actual Python script
        result = subprocess.run(['python3', 'your_script.py'], capture_output=True, text=True)
        output = result.stdout or result.stderr
    return render_template('index.html', output=output)

if __name__ == '__main__':
    app.run(debug=True)
```

And create a sample template:

```sh
mkdir templates
echo "Hello World" > templates/index.html
```

In order to test one can execute:

```sh
uv run app.py
```

And access <http://127.0.0.1:5000>

Now lets enhance a bit the interface with bootstrap.


### Bootstrap

Bootstrap is a powerful, feature-packed frontend toolkit

We are going to change our previous `index.html` with 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Flask Example App</title>
    <!-- Bootstrap 5 CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <form method="post" class="text-center">
            <div class="card shadow p-4">
                <div class="card-body">
                    <h1 class="card-title mb-4 text-center">Flask App</h1>
                </div>

                <div class="hstack">
                
                <div class="card m-2" style="width: 18rem; height: 30rem;">
                    <svg xmlns='http://www.w3.org/2000/svg' width='100%' viewBox='0 0 200 200'><rect fill='#2169EE' width='200' height='200'/><defs><linearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'><stop offset='0' stop-color='#000' stop-opacity='0'/><stop offset='1' stop-color='#000' stop-opacity='1'/></linearGradient><linearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'><stop offset='0' stop-color='#000' stop-opacity='0'/><stop offset='1' stop-color='#000' stop-opacity='1'/></linearGradient></defs><g fill='#0058d9' fill-opacity='0.6'><rect x='100' width='100' height='100'/><rect y='100' width='100' height='100'/></g><g fill-opacity='0.5'><polygon fill='url(#a)' points='100 30 0 0 200 0'/><polygon fill='url(#b)' points='100 100 0 130 0 100 200 100 200 130'/></g></svg>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Description of the execution.</p>
                        <button type="submit" class="btn btn-primary btn-lg">Run Script</button>
                    </div>
                </div>

                <div class="card m-2" style="width: 18rem; height: 30rem;">
                    <svg xmlns='http://www.w3.org/2000/svg'  width='100%' viewBox='0 0 200 200'><rect fill='#FFFFFF' width='200' height='200'/><g fill-opacity='1'><polygon  fill='#003ca9' points='100 57.1 64 93.1 71.5 100.6 100 72.1'/><polygon  fill='#1e49ba' points='100 57.1 100 72.1 128.6 100.6 136.1 93.1'/><polygon  fill='#003ca9' points='100 163.2 100 178.2 170.7 107.5 170.8 92.4'/><polygon  fill='#1e49ba' points='100 163.2 29.2 92.5 29.2 107.5 100 178.2'/><path  fill='#3A58CC' d='M100 21.8L29.2 92.5l70.7 70.7l70.7-70.7L100 21.8z M100 127.9L64.6 92.5L100 57.1l35.4 35.4L100 127.9z'/><polygon  fill='#0055a2' points='0 157.1 0 172.1 28.6 200.6 36.1 193.1'/><polygon  fill='#0067b7' points='70.7 200 70.8 192.4 63.2 200'/><polygon  fill='#257ACC' points='27.8 200 63.2 200 70.7 192.5 0 121.8 0 157.2 35.3 192.5'/><polygon  fill='#0067b7' points='200 157.1 164 193.1 171.5 200.6 200 172.1'/><polygon  fill='#0055a2' points='136.7 200 129.2 192.5 129.2 200'/><polygon  fill='#257ACC' points='172.1 200 164.6 192.5 200 157.1 200 157.2 200 121.8 200 121.8 129.2 192.5 136.7 200'/><polygon  fill='#0055a2' points='129.2 0 129.2 7.5 200 78.2 200 63.2 136.7 0'/><polygon  fill='#257ACC' points='200 27.8 200 27.9 172.1 0 136.7 0 200 63.2 200 63.2'/><polygon  fill='#0067b7' points='63.2 0 0 63.2 0 78.2 70.7 7.5 70.7 0'/><polygon  fill='#257ACC' points='0 63.2 63.2 0 27.8 0 0 27.8'/></g></svg>
                    <div class="card-body">
                        <h5 class="card-title">Card title 2</h5>
                        <p class="card-text">Description of the execution 2.</p>
                        <button type="submit" class="btn btn-primary btn-lg">Run Script</button>
                    </div>
                </div>
                </div>
                    {% if output %}
                        <div class="alert alert-info mt-4" role="alert">
                            <h5>Script Output:</h5>
                            <pre>{{ output }}</pre>
                        </div>
                    {% endif %}
                </div> <!-- card-shadow -->
                
            </form>
        </div>
    </div>
</div>
<!-- Bootstrap JS (optional, for advanced components) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

To use Bootstrap, you need to include the required library. There are several ways to do this, but in this case, we’re using a CDN reference. In the previous example, we included two cards. For more examples and reusable components, visit the following URL, which contains a variety of useful snippets.

* <https://getbootstrap.com/docs/5.3/examples>

### Docker

In order to have the application running in a docker container, let's start by creating our `Dockerfile` 

```docker
FROM python:3.12-slim-bookworm
COPY --from=ghcr.io/astral-sh/uv:0.7.13 /uv /uvx /bin/

EXPOSE 5000

# Copy the project into the image
ADD . /app

# Sync the project into a new environment, asserting the lockfile is up to date
WORKDIR /app

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-dev

# Place executables in the environment at the front of the path
ENV PATH="/app/.venv/bin:$PATH"

# Reset the entrypoint, don't invoke `uv`
ENTRYPOINT []

# Run the Flask application by default
CMD ["flask", "run","--host=0.0.0.0"]
```

This Dockerfile builds a lightweight Python environment for running a Flask web application, using `uv` as a dependency manager. Let's break it down step by step:

* Starts from a slimmed-down official Python 3.12 image based on Debian Bookworm.
* Copies the `uv` binary tools from the official uv image into `/bin` of this image.
* Declares that the container will listen on port `5000`
* Adds the entire current project directory `.` into the container at `/app`.
* Sets the working directory to `/app` for all following commands
* Installs dependencies using the lockfile `uv.lock`
* Adds the virtual environment's `bin` folder to the system `PATH`
* Resets the entrypoint. Prevents `uv` or any default entrypoint from running when the container starts.
* Default the start flask command to be accessible outside the container

Next step we are going to create a `docker-compose.yaml` with the following content

```docker
---
services:
  flask-app:
    ports:
      - "5000:5000"
    build: .

    # ...

    develop:
      # Create a `watch` configuration to update the app
      #
      watch:
        # Sync the working directory with the `/app` directory in the container
        - action: sync
          path: .
          target: /app
          # Exclude the project virtual environment
          ignore:
            - .venv/

        # Rebuild the image on changes to the `pyproject.toml`
        - action: rebuild
          path: ./pyproject.toml
```

You can start the container by executing `docker-compose up -d` and access the application <http://127.0.0.1:5000>

## Repo 

You can use the following repository that has this code `https://github.com/rramos/uv-flask`

## Conclusion

In this article, we walked through the process of setting up a Flask application with uv as the dependency manager. We then updated the index template using Bootstrap for a cleaner, more modern look. Finally, we created a Dockerfile and a docker-compose configuration to containerize the application.

The shared repository can serve as a starter skeleton for quick Python experiments or as a ready-to-use Docker setup to easily share your project with others.

## References ##

* <https://getbootstrap.com/docs/5.3/examples>
* <https://flask.palletsprojects.com/en/stable>
* <https://docs.astral.sh/uv/guides/integration/docker>
* <https://github.com/rramos/uv-flask>
