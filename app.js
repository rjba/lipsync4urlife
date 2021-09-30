console.log('Server-side code running');

var express = require("express")
var template = require("./template")
var app = express();

// serve files from the public directory
app.use(express.static('./'));

// start the express web server listening on 3000
app.listen(3000, () => {
  console.log('listening on 3000');
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/clicked', (req, res) => {
  var time = template.createResponse();
	/*just to see if I send the data that I want
  console.log(time.heure);
  console.log(time.minute);
	console.log(time);*/
	res.send(time)
	res.sendStatus(201);
});
