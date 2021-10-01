
var express = require("express");
var app = express();
var axios = require("axios").default;

//special node module installed to get lyrics
const Genius = require("genius-lyrics");
const Client = new Genius.Client("u14zRI3-FNvsIqw0QIIMDx9V7R0y8NkQGXha69ZSxs8jzzR3kx7ZRnHcLSUjVIus");


// serve files from the public directory
app.use(express.static('./'));

// start the express web server listening on 3000
app.listen(3000, () => {
  console.log('Server listening on 3000');
});

// routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/info-on-song', (req, res) => {
  res.sendFile(__dirname + '/views/info_on_song.html');
});

app.get('/artist', (req, res) => {
  res.sendFile(__dirname + '/views/artist.html');
});




// api requests
/*
  search request to api to get search result
*/
app.get('/search-song/:searchedItem', (req, res) => {
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
    res.send(response.data)
    res.sendStatus(201);
  }).catch(function (error) {
    res.sendStatus(404);
  });
});

/*
  api call that gets all infos on a song by its id
*/
app.get('/get-info-on-song/:songID', (req, res) => {
  var songID = req.params.songID;

  var options = {
    method: 'GET',
    url: 'https://genius.p.rapidapi.com/songs/' + songID,
    headers: {
      'x-rapidapi-host': 'genius.p.rapidapi.com',
      'x-rapidapi-key': 'e17c302178mshe693526e422e203p1a1cedjsn49af64fb3e36'
    }
  };

  axios.request(options).then(async function (response) {
    var songID = response.data.response.song.id

    var lyrics = await getLyrics(songID);

    if(lyrics !== ""){
      res.send({
        data: response.data,
        song_lyrics: lyrics
      });
      res.sendStatus(201);
    }else{
      res.send({
        data: response.data,
        song_lyrics: ""
      });
      res.sendStatus(201);
    }
  }).catch(function (error) {
    res.sendStatus(404);
  });
});

app.get('/get-artist/:artistID', (req, res) => {
  var artistID = req.params.artistID;

  var options = {
    method: 'GET',
    url: 'https://genius.p.rapidapi.com/artists/' + artistID,
    headers: {
      'x-rapidapi-host': 'genius.p.rapidapi.com',
      'x-rapidapi-key': 'e17c302178mshe693526e422e203p1a1cedjsn49af64fb3e36'
    }
  };

  axios.request(options).then(async function (response) {
    res.send({
      data: response.data
    });
    res.sendStatus(200);
  }).catch(function (error) {
    res.sendStatus(404);
  });
});

async function getLyrics(songID){
  const song = await Client.songs.get(songID);
  const lyrics = await song.lyrics().then(function(response){
    return response;
  }).catch(function(error){
    return "";
  });
  return lyrics;
}

module.exports = app;
