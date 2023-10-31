// make express server
const express = require('express');
const server = express();
const port = 443;
var postEndpoint = '/chatApi'

// allow cors
var cors = require('cors');
server.use(cors());

// parse request json
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
var request = require('request');

// bridge var
var openAiUrl = "https://api.openai.com/v1/chat/completions";
var openAiKey = "yourKey";

// SSL
const https = require('https');
const fs = require('fs');
const privateKey = fs.readFileSync('private-key.pem', 'utf8');
const certificate = fs.readFileSync('certificate.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// server function
server.get('/', (req,res) => {
    res.send(`Post https request to endpoint ${postEndpoint}`);
});

server.post(postEndpoint, (req,res) => {
    var api_req = {
        url: openAiUrl,
        body: JSON.stringify(req.body),
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${openAiKey}`,
            "Content-Type": 'application/json',
        }
    };

    request(api_req, function(error, response){
        res.send(response.body)
    });
});


// start server
const httpsServer = https.createServer(credentials, server);

httpsServer.listen(port, () => {
    console.log(`Server runing at port: ${port}, Post https request to endpoint ${postEndpoint}`);
});