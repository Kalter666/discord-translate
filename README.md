# Yet another translator chat bot for [discord](https://discord.com/).

## About

The main purpose of this is to make a self-hosted option for your discord server to make possible to you use a free translation software.
So feel free to use, fork. Pull-requests with bugfixes or features are welcome.

Project is based on [Nest.js](https://nestjs.com/), [Docker](https://www.docker.com/), [Libretranslate](https://libretranslate.com/). Check them out before asking any questions.

## System requirements

- docker 20.10.7 or newer
- docker compose 1.28.2 or newer
<p>Make sure to keep them up to date</p>

## Installation proccess

1. install docker and docker-compose or docker desktop on windows or mac if you haven't done it yet.
2. give permissions to shell scripts with `chmod +x *.sh` to be able to use handy scripts included.
3. create .env file and specify your discord secret key for the bot like so `DISCORD_SECRET=paste-your-bot-key-here`.
4. add application port to the .env file like so `PORT=3000`, port ain't in use by now but may be in future.
5. add your bot to your server by following [this guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links).
6. run start script with the following command: `./start.sh`.

<p>Now you're ready to go</p>

## Knows issues

- on every start libretranslate loads language packages using volumes doesn't help
- because of the previous issue translation is possible after downloading all language packs until then bot will show errors, so hot reload isn't possible at the moment.

## Environment variables

- DISCORD_SECRET - a private key for bot you can pick it up from [this link](https://discord.com/developers/applications/), select your application or create a new one, go to the bot section and you'll see token section below bot's username which you can also define here.
- PORT - a port for the nest server, required but won't bring any functionality yet.

## Included scripts

In order to not type everytime `docker-compose up/down` etc.
when you want to start/stop your app, there are some scripts included.

- start.sh - start both server and libre translator in production mode
- stop.sh - stops a production container and a libre translator container
- restart.sh - restarts both server and libre translator containers, after an update for example

<p>scripts with the `-dev` postfix do the same but for development purposes with hot reload of the nest server enabled</p>

## Licence

[MIT](https://github.com/Kalter666/discord-translate/blob/master/LICENSE)
