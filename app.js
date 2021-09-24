console.log('Server-side code running');

var express = require("express")
var app = express();
var axios = require("axios").default;

// serve files from the public directory
app.use(express.static('./'));

// start the express web server listening on 3000
app.listen(3000, () => {
  console.log('listening on 3000');
});

// routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/search-song/:searchedItem', (req, res) => {
  console.log("ok");
  console.log(req.params.searchedItem);

  var searchedItem = req.params.searchedItem;

  var options = {
    method: 'GET',
    url: 'https://genius.p.rapidapi.com/search',
    params: {q: searchedItem},
    headers: {
      'x-rapidapi-host': 'genius.p.rapidapi.com',
      'x-rapidapi-key': 'e17c302178mshe693526e422e203p1a1cedjsn49af64fb3e36'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    res.send(response.data)
    res.sendStatus(201);
  }).catch(function (error) {
    console.error(error);
  });
});
