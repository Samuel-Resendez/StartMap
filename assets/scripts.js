
$(document).ready(function() {


  var vars = getUrlVars();

  $.ajax({
    url: "https://simulator-api.db.com:443/gw/dbapi/v1/transactions",
    type: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization',"Bearer "+vars.id_token);
    },
    success: function(data) {
      console.log(data);
    },
  })


});

function getUrlVars()
{
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
  }
  return vars;
}
