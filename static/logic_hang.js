// Default select year
var currentSelectedYear = 2014;
// Store the index
var ind = 0;              

var worldCupData = {};
var marker1;
var marker2;
var marker3;
var marker4;
var allMarkers = {};


function removeMarker()
{
  for (i = 0; i < index + 4 ; i++) {
    if (allMarkers[i] != undefined) {
      myMap.removeLayer(allMarkers[i]);
    };
  }  
}

function setCircleMarker(index)
 {
  
//removeMarker();

j = 0;

for (i = index; i < index + 4 ; i++) {
    
    marker1 = L.circleMarker([worldCupData[i].cup_country_lat,worldCupData[i].cup_country_long], {
      fillOpacity: 0.75,
      color: "yellow",
      fillColor: "yellow",
      // Adjust radius
      radius: (get_radius(worldCupData[i].cup_position))
      //radius: (worldCupData[i].cup_position / 0.02) * 1500
    }).bindPopup("<h1>" + worldCupData[i].country + "(" + worldCupData[i].year + ")</h1> <hr> <h3>Position: " + worldCupData[i].cup_position + "</h3>").addTo(myMap);;
   
    allMarkers[j] = marker1;

  }

}

function get_radius(i)
{
  if (i == 1) return 10;
  else if (i == 2) return 7;
  else if (i == 3) return 5;
  else if (i == 4) return 3;
}


//Function to detect a change in the list item
function optionChanged(selectedYear) {
 
  currentSelectedYear = selectedYear;
  
  
  
  //Find the index of the id array matching the value of the selectedYear
  ind = worldCupData.findIndex(x => x.year === parseInt(selectedYear));

  setCircleMarker(ind,true);

  /* for (i = ind; i < ind + 4 ; i++) {
    L.circleMarker([worldCupData[i].cup_country_lat,worldCupData[i].cup_country_long], {
      fillOpacity: 0.75,
      color: "#ffffff00",
      fillColor: "#ffffff00",
      radius: (get_radius(worldCupData[i].cup_position))
      // Adjust radius
      //radius: (worldCupData[i].cup_position / 0.02) * 1500
    }).bindPopup("<h1>" + worldCupData[i].country + "(" + worldCupData[i].year + ")</h1> <hr> <h3>Position: " + worldCupData[i].cup_position + "</h3>").addTo(myMap);
  } */
    
}


// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1Ijoiam9obndhbm5nIiwiYSI6ImNrbmZ2bDJ0djBkNGkydW80MDJvamxseWgifQ.g75LmRVVSBno-2OLw9L1Vw"
}).addTo(myMap);


d3.csv("static/country_lat_long.csv").then(function(Data) {

  worldCupData = Data;
  // Cast the relevant data values to number that are  to be plotted on the chart
  Data.forEach(function(data) {
    data.year	= +data.year;
    data.cup_position	= +data.cup_position;
    data.cup_country_lat = +data.cup_country_lat;
    data.cup_country_long	= +data.cup_country_long;
    data.host_country_lat	= +data.host_country_lat;
    data.host_country_long = +data.host_country_long;
   })
      
    d3.select("#selDataset")
    .selectAll(null)
    .data(d3.map(Data, function(d){return d.year;}).keys()) //Return unqiue years
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // value kept in the menu

    optionChanged(currentSelectedYear);
    
  }).catch(function(error) {
    console.log(error);
  });