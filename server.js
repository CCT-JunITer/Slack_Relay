var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var secrets = require('../slack_relay_secrets');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// settings for this instance
const PORT = 4390;
var clientId = process.env.CLIENT_ID || secrets.clientId;
var clientSecret = process.env.CLIENT_SECRET || secrets.clientSecret;

// Starts server
app.listen(PORT, function () {
    console.log("Relay listening on port " + PORT);
});

//Juniter Endpoint
app.post('/juniter', urlencodedParser, function(req, res) {
  //relay message
  const dest = 'juniter'
  const message = buildMessageBody(req.body)
  sendMessageToSlack(dest, message)
  //send acknowledgement
  sendAcknowledgement(res,req,dest)
});

//Vorstand Endpoint
app.post('/vorstand', urlencodedParser, function(req, res) {
  const dest = 'vorstand'
  sendMessageToSlack(dest, buildMessageBody(req.body))
  sendAcknowledgement(res,req,dest)
});

//RL-Runde Endpoint
app.post('/rlrunde', urlencodedParser, function(req, res) {
  const dest = 'rl-runde'
  sendMessageToSlack(dest, buildMessageBody(req.body))
  sendAcknowledgement(res,req,dest)
});

//HR-Endpoint
app.post('/hr', urlencodedParser, function(req, res) {
  const dest = 'hr'
  sendMessageToSlack(dest, buildMessageBody(req.body))
  sendAcknowledgement(res,req,dest)
});

//IN-Endpoint
app.post('/in', urlencodedParser, function(req, res) {
  const dest = 'in'
  //const message = buildMessageBody(req.body)
  //sendMessageToSlack('vorstand', message)
  //send acknowledgement
  res.send("relay for IN has not been configured yet")
  res.status(200).end()
  console.log("did not relay from " + req.body.user_name +" to in : " + req.body.text)
});

//QM-Endpoint
app.post('/qm', urlencodedParser, function(req, res) {
  //relay message
  const dest = 'juniter'
  //const message = buildMessageBody(req.body)
  //sendMessageToSlack('vorstand', message)
  //send acknowledgement
  res.send("relay for QM has not been configured yet")
  res.status(200).end()
  console.log("did not relay from " + req.body.user_name +" to qm : " + req.body.text)
});

//RM-Endpoint
app.post('/rm', urlencodedParser, function(req, res) {
  //relay message
  const dest = 'rm'
  //const message = buildMessageBody(req.body)
  //sendMessageToSlack('vorstand', message)
  //send acknowledgement
  res.send("relay for RM has not been configured yet")
  res.status(200).end()
  console.log("did not relay from " + req.body.user_name +" to rm : " + req.body.text)
});

//PR-Endpoint
app.post('/pr', urlencodedParser, function(req, res) {
  //relay message
  const dest = 'pr'
  //const message = buildMessageBody(req.body)
  //sendMessageToSlack('vorstand', message)
  //send acknowledgement
  res.send("relay for PR has not been configured yet")
  res.status(200).end()
  console.log("did not relay from " + req.body.user_name +" to pr : " + req.body.text)
});

//setting up message
function buildMessageBody(request){
  return { "text": "relayed from " + request.user_name + " : " + request.text }
}

function sendAcknowledgement(res,req,dest) {
  res.send("relayed message to " + dest + " :+1:")
  res.status(200).end()
  console.log("did relay from " + req.body.user_name +" to "+ dest +" : " + req.body.text)
}

// setting up Post request for relaying message
function sendMessageToSlack(channel, JSONmessage){
  const responseURL = secrets.addresses[channel]
  var postOptions = {
      uri: responseURL,
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      json: JSONmessage
  }

  request(postOptions, (error, response, body) => {
      if (error){
          console.log(error)
      }
  })
}