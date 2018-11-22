# Azure DevOps Analytics
Display analytics about your Azure DevOps projects : Builds / Releases / Environments / SonarQube.
It allows you to get a wide insight about state/quality of your projects.

By default, analytics are refresed every ten minutes.

# Run the project locally
Client (http://localhost:3000):
- `cd client`
- `npm start`

Server (http://localhost:3001):
- `cd server`
- `npm start`

# Configuration
The configuration of the application is located at: /server/config
You need to duplicate the production.config.json to development.config.json and edit the configuration. The description is located at /server/config/index.js

# Installation
It is up to you. For example you could host your client as a static website in the cloud (e.g. Amazon S3) or group both client and server on an on-premise server.

Here is an example for the latter:

- Clone repository to your server

Create server package:
- `cd server`
- `npm install`

Create client package:
- `cd client`
- `npm install`
- `npm build`
- Copier `client/build` into `server`.

Hosting:
- `npm install pm2 -g`
- `cd server`
- `pm2 start process.json --env production`

Check:
- Website is running: `pm2 ls`
- Display server logs: `pm2 show [YOUR_APP_ID] logs`
- Website in working: http://localhost:3001

# Limitations
- At the moment there is no authentication implemented, so make sure your URL is not publicly available.
- To list a project you need to create it in Azure DevOps

# TODO list
- Add refresh time to settings
- Add webhooks for Lighthouse integration
- Add Office 365 authentication (client) and authorizatrion (server)
- Add a form allowing to display a custom Analytics page (e.g. full-screen, auto-refresh time, project selection, analytic selection...)
- Display projects not in Azure DevOps
- Create unit tests
