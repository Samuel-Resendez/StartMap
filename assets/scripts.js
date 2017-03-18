
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
      var piechartdb = [];
      var saved_piece = {
        "country" : "Amount Saved",
        "size" : 0,
      }
      var spent_piece = {
        "country" : "Amount Spent",
        "size" : 0,
      }
      for(var i = 0; i < data.length; i++) {
        var obj = {
          "country" : data[i].bookingDate,
          "expenditure" : data[i].amount,
        }
        if(data[i].amount < 0) {
          spent_piece.size += Math.abs(data[i].amount);
        }
        else {
          saved_piece.size += data[i].amount;
        }
        database.push(obj);
      }
      piechartdb.push(saved_piece);
      piechartdb.push(spent_piece);
      var pieChart = AmCharts.makeChart("piechart", {
        "type": "pie",
        "theme": "light",
        "titles": [ {
          "text": "Visitors countries",
          "size": 16
        } ],
        "dataProvider": piechartdb,
      "valueField": "visits",
      "titleField": "country",
      "startEffect": "elastic",
      "startDuration": 2,
      "labelRadius": 15,
      "innerRadius": "50%",
      "depth3D": 10,
      "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
      "angle": 15,
      "export": {
        "enabled": true
      }
    }
  );
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
