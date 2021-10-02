console.log('Client-side code running');

// event listeners
const searchButton = document.getElementById('searchBtn');
if(searchButton){
  searchButton.addEventListener('click', function(e) {
    var searchInput = document.getElementById('searchItem');

    fetch('/search-song/'+ searchInput.value , {method: 'get'})
      .then(function(response) {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Request failed.');
      })
      .then(function(data){
        var searchResults = data.response.hits;
        var searchResultsDiv = document.getElementById('results');
        searchResultsDiv.innerHTML = "";
        for(let searchResult in searchResults){
          if(searchResults[searchResult].type === "song"
          && searchResults[searchResult].result.lyrics_state === "complete"){

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
        return error;
      });
  });

}

// funcions
function getSongInfo(){
  var songID = window.location.search.substr(1);

  fetch('/get-info-on-song/'+ songID, {method: 'get'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(function(data){
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
      return error;
    });
}

function getArtistInfo(){
  var artistID = window.location.search.substr(1);
var url = "./songs-of-artist?" + artistID;
  var divLinkSongs = document.getElementById('linkSongOfArtist');
  divLinkSongs.innerHTML = "<a href="+ url + ">La liste de leurs sons</a>";

  fetch('/get-artist/' + artistID, {method: 'get'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(function(data){

      var artistImgOutput = document.getElementById('artistImg');
      var artistAlternateNamesOutput = document.getElementById('artistAlternateNames');
      var artistNameOutput = document.getElementById('artistName');
      var descriptionOutput = document.getElementById('description');
      var descriptionFullOutput = document.getElementById('description-full');
      var instagramOutput = document.getElementById('instagram');
      var twitterOutput = document.getElementById('twitter');
      var facebookOutput = document.getElementById('facebook');

      var artistImg = data.data.response.artist.image_url;
      var artistName = data.data.response.artist.name;
      var artistAlternateNames = data.data.response.artist.alternate_names;
      var description = data.data.response.artist.description.dom.children;
      var instagram = data.data.response.artist.instagram_name;
      var twitter = data.data.response.artist.twitter_name;
      var facebook = data.data.response.artist.facebook_name;

      var descriptionStockage = "";
      artistImgOutput.src = artistImg;
      artistAlternateNamesOutput.innerText = artistAlternateNames.join(", \n ");
      artistNameOutput.innerText = artistName;
      for(var i = 0; i < description.length; i++) {
        if(description[i] != "") var sous_description = description[i].children;
        for(var j = 0; j < sous_description.length; j++) {
            if (typeof sous_description[j] === 'string' || sous_description[j] instanceof String) {
              descriptionStockage = descriptionStockage + sous_description[j];
            } else {
              if (typeof sous_description[j].children[0] === "string" || sous_description[j].children[0] instanceof String)
                descriptionStockage = descriptionStockage + sous_description[j].children[0];
              else
                descriptionStockage = descriptionStockage + sous_description[j].children[0].children[0];
            }
        }
      }
      descriptionOutput.innerText = descriptionStockage.substring(0,600) + "...";
      descriptionFullOutput.value = descriptionStockage;

      instagramOutput.innerHTML = "<a href=\"https://instagram.com/" + instagram + "\" class=\"fa fa-instagram\"> Son instagram </a>";
      twitterOutput.innerHTML = "<a href=\"https://twitter.com/" + twitter + "\" class=\"fa fa-twitter\"> Son twitter </a>";
      facebookOutput.innerHTML = "<a href=\"https://facebook.com/" + facebook + "\" class=\"fa fa-facebook\"> Son facebook </a>";

      return data;
    })
    .catch(function(error) {
      return error;
    });
}


function getSongsArtist(){
    var artistID = window.location.search.substr(1);
    console.log(artistID);

      fetch('/get-song-artist/' + artistID, {method: 'get'})
        .then(function(response) {
          if(response.ok) {
            return response.json();
          }
          throw new Error('Request failed.');
        })
        .then(function(data){
                    var listSongsArtist = data.data.response.songs;
                    var searchResultsDiv = document.getElementById('list-songs');
                    searchResultsDiv.innerHTML = "";
                    for(let indexSong in listSongsArtist){

                        console.log(listSongsArtist[indexSong]);
                       var songID = listSongsArtist[indexSong].id;

                        var songTitle = listSongsArtist[indexSong].title;
                        var songArtistName = listSongsArtist[indexSong].primary_artist.name;
                        var songImg = listSongsArtist[indexSong].song_art_image_url;


                        searchResultsDiv.innerHTML = searchResultsDiv.innerHTML
                        + "<div class=\"search-result\">"
                        + "<img class=\"resultImg\" src=" + songImg +" alt=\"\">"
                        + "<div class=\"sear-result-description\">"
                        + "<h4>" + songTitle + "</h4>"
                        + "<h6>" + songArtistName + "</h6></div></div>";
                    }
        }
        )
        .catch(function(error) {
            return error;
        });
}
