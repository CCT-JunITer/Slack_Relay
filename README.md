# Slack Relay

This is a very simple server designed to relay slack messages between closed (private) channels or even different workgroups. A possible example of application is making an certain subgroup (eg Server Maintenance) aware of something in their private chat without being part of it or needing a dedicated public channel for this sort of thing.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The server requires node to run as well as 'express', 'request' and 'body-parser'.
Install them via npm (node package manager).

example:
```
npm install express
```
You need to define a slack Webhook into every group that shall be linked and note down its URL.

It is then necessary to define the addresses of the Slack Webhooks to in a file called slack_relay_secrets.json in the same directory.

define them like so:

```
 "addresses" : {
        "<relay-descriptor>" : "<webhook-url>",
        "<relay-descriptor>" : "<webhook-url>",
        ...
    }
```

client_id and client_secret do not need to be defined.

You also need to create an App for your Slack Workgroup (in SlackApi) that has a Slash-Command for every link containing the url of the server as follows:


```
      http://<url and port of server>/<relay-descriptor>"
```

### Installing

Start the server in its directory with node (and in some cases possibly sudo)

```
node server.js 
```
The server should now run (by default on Port 4390)

You can now keep it running in the bash or better a screen or even better as a system service.


## Authors

* **Maximilian Eissler** - *Initial work* - [Github Page](https://github.com/mx-e)
* **Tim Korjakow** - *some material improvements* - [Github Page](https://github.com/wittenator)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.


