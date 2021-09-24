console.log('Client-side code running');
//
// const button = document.getElementById('myButton');
// button.addEventListener('click', function(e) {
//   console.log('button was clicked');
//
//
// });
function searchItem(){
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
      console.log(data)
      // var timeToDisplay = "It's "+ data.heure + " : " + data.minute
      //h1.innerHTML = data;
    })
    .catch(function(error) {
      console.log(error);
    });
}
