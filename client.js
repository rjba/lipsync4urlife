console.log('Client-side code running');

const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/clicked', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');

        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(function(data){
      console.log(data)
      var timeToDisplay = "It's "+ data.heure + " : " + data.minute
      document.getElementById('hourDisplay').innerHTML = timeToDisplay;
    })
    .catch(function(error) {
      console.log(error);
    });
});
const btnArtiste = document.getElementById('btnArtiste');

btnArtiste.addEventListener('click',function(e){
    console.log("test");
    fetch('/songOfArtist', {method: 'POST'})
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
