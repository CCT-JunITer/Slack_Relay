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
    console.log(`Relay listening on port ${PORT}`);
});

//Ressort Endpoint
// req.gruppe is the url path parameter
app.post('/:gruppe', urlencodedParser, function(req, res) {
  if (Object.keys(secrets.addresses).includes(req.params.gruppe)) {
    sendMessageToSlack(req.params.gruppe, buildMessageBody(req.body))
    sendAcknowledgement(res,req,req.params.gruppe)
  }
  else {
    res.send(`relay for ${req.param.gruppe} has not been configured yet`)
       .status(200)
       .end()
    console.log(`did not relay from ${req.body.user_name} to in : ${req.body.text}`)
  }
});

//setting up message
function buildMessageBody(request){
  return {'text': `relayed from ${request.user_name} : ${request.text}` }
}

function sendAcknowledgement(res,req,dest) {
  res.send(`relayed message to ${dest} :+1:`)
     .status(200)
     .end()
  console.log(`did relay from ${req.body.user_name} to  ${dest} : ${req.body.text}`)
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