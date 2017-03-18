


var login = function() {
  var db_url = "https://simulator-api.db.com/gw/oidc/authorize?response_type=code&redirect_uri=/authorized.html&client_id=435eb207-29a0-4b46-9083-8309cd28f457&state=/authorized.html";
  fetch(db_url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
