const btnSearchArtiste = document.getElementById('btnSearchArtist');
const searchBarArtist = document.getElementById('searchArtists');

btnSearchArtist.addEventListener('click',function(e){
    console.log(searchBarArtist.value);
    var idArtist = '16775';
    let todo = {
        artistId: idArtist
    };
    fetch('/songOfArtist', {method: 'POST'
                            body: idArtist)
            .then(function(response) {
                        if(response.ok) {
                          console.log('Click was recorded');

                          return response.json();
                        }
                        throw new Error('Request failed.');
            })
            .then(function(data){
                            console.log(data);
              })
            .catch(function(error) {
                            console.log(error);
     });
});