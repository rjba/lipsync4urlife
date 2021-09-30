console.log('Server-side code running');

var express = require("express")
var template = require("./template")
var app = express();
    var axios = require("axios").default;

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

// serve th page of songs artist
app.get('/songsartist', (req, res) => {
    res.sendFile(__dirname + '/view/songartist.html');
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

app.post('/songOfArtist',(req,res) => {
    console.log(req);
    var options = {
          method: 'GET',
          url: 'https://genius.p.rapidapi.com/artists/16775/songs',
          headers: {
            'x-rapidapi-host': 'genius.p.rapidapi.com',
            'x-rapidapi-key': 'e17c302178mshe693526e422e203p1a1cedjsn49af64fb3e36'
          }
        };

        axios.request(options).then(function (response) {
        	console.log(response.data);
        	res.send(response.data);
        	res.sendStatus(200);
        }).catch(function (error) {
        	console.error(error);
        });
});
