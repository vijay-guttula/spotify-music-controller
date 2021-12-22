## Install the dependencies

<br>

    $ pip3 install -r requirements.txts

## Setting up spotify envs

> go to [Spotify api](https://developer.spotify.com/dashboard/) and create a project.

> create a file .env in the root folder which contains the settings.py file and add the env vars `CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT_URI`

## Run the backend server

    $ python3 manage.py runserver

<br>

## Run the frontend server

    $ cd frontend

> if first time

    $ npm i && npm run dev

> else

    $ npm run dev
