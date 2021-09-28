console.log('Client-side code running');

// event listeners
const searchButton = document.getElementById('searchBtn');
if(searchButton){
  searchButton.addEventListener('click', function(e) {
    var searchInput = document.getElementById('searchItem');

    fetch('/search-song/'+ searchInput.value , {method: 'get'})
      .then(function(response) {
        if(response.ok) {
          console.log('ok');
          return response.json();
        }
        throw new Error('Request failed.');
      })
      .then(function(data){
        console.log(data.response.hits);
        var searchResults = data.response.hits;
        var searchResultsDiv = document.getElementById('results');
        searchResultsDiv.innerHTML = "";
        for(let searchResult in searchResults){
          if(searchResults[searchResult].type === "song"
          && searchResults[searchResult].result.lyrics_state === "complete"){

            console.log(searchResults[searchResult]);
            var songID = searchResults[searchResult].result.id;

            var songTitle = searchResults[searchResult].result.title;
            var songArtistName = searchResults[searchResult].result.primary_artist.name;
            var songImg = searchResults[searchResult].result.song_art_image_url;

            var url = "/info-on-song?" + songID;

            searchResultsDiv.innerHTML = searchResultsDiv.innerHTML
            + "<a href="+ url + "><div class=\"search-result\">"
            + "<img class=\"resultImg\" src=" + songImg +" alt=\"\">"
            + "<div class=\"sear-result-description\">"
            + "<h4>" + songTitle + "</h4>"
            + "<h6>" + songArtistName + "</h6></div></div></a>";
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });

}

// funcions
function getSongInfo(){
  var songID = window.location.search.substr(1);

  console.log(songID);

  fetch('/get-info-on-song/'+ songID, {method: 'get'})
    .then(function(response) {
      if(response.ok) {
        console.log('ok');
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(function(data){
      console.log(data);
      var songNameOutput = document.getElementById('songTitle');
      var artistNameOutput = document.getElementById('songArtist');
      var songImgOutput = document.getElementById('songImg');
      var songLyricsOutput = document.getElementById('songLyrics');

      var songName = data.data.response.song.title;
      var artistName = data.data.response.song.primary_artist.name;
      var songImg = data.data.response.song.song_art_image_url;
      var songLyrics = data.song_lyrics;

      var artistID = data.data.response.song.primary_artist.id;

      var url_to_artist_info = "/artist?" + artistID
      songNameOutput.innerText = songName;

      artistNameOutput.innerHTML = "<a href=" + url_to_artist_info + ">"
      + artistName + "</a>";

      songImgOutput.src = songImg;

      if(songLyrics !== ""){
        songLyricsOutput.innerText = songLyrics
      }else{
        songLyricsOutput.innerText = "Aucunes paroles trouvées pour cette chanson" ;
      }

    })
    .catch(function(error) {
      console.log(error);
    });
}

function getArtistInfo(){
  var artistID = window.location.search.substr(1);

  console.log(artistID);
}
