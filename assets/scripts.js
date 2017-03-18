
$(document).ready(function() {


  var token = getUrlVars();
  console.log(token);

  $.ajax({
    url: "https://simulator-api.db.com:443/gw/dbapi/v1/transactions",
    type: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('Authorization',"Bearer "+token);
    },
    success: function(data) {
      console.log(data);
      var database = [];
      for(var i = 0; i < data.length; i++) {
        var obj = {
          "country" : data[i].bookingDate,
          "expenditure" : Math.abs(data[i].amount),
        }
        database.push(obj);
      }
      var chart = AmCharts.makeChart( "chartdiv", {
        "type": "serial",
        "theme": "light",
        "dataProvider": database,
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [ {
          "balloonText": "[[category]]: <b>[[value]] CHF</b>",
          "fillAlphas": 0.8,
          "lineAlpha": 0.2,
          "type": "column",
          "valueField": "expenditure"
        } ],
        "chartCursor": {
          "categoryBalloonEnabled": false,
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "country",
        "categoryAxis": {
          "gridPosition": "start",
          "gridAlpha": 0,
          "tickPosition": "start",
          "tickLength": 20
        },
        "export": {
          "enabled": true
        }

      } );
    },
  })


});

function getUrlVars()
{
  var vars = [], hash;
  var token = window.location.href.substring(74);
  var tokens = token.split('&')[0];
  return tokens;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
  }
  return vars;
}
