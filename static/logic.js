// Default select year
var currentSelectedYear = 2014;
// Store the index
var ind = 0;              

var worldCupData = {};
var hostmarker;
var marker1;
var marker2;
var marker3;
var marker4;
var allMarkers = {};

// function to remove circle marker 
function removeMarker(marker)
{
  if (marker != undefined) {
    myMap.removeLayer(marker);
  };
}

// function to return host color - blue if the given country happens to be the host of that world
function hostColor(hostCountry,currentCountry,currentColor)
{
  usedColor = currentColor;
  if (hostCountry == currentCountry)
    usedColor = "blue";
  return usedColor;
}

// function to return Host Nation string if the given country happens to be the host of that world
function hostCountry(hostCountry,currentCountry)
{
  usedText = '';
  if (hostCountry == currentCountry)
    usedText = "Host Nation - ";
  return usedText;
}

// function to draw the circle markers for Top 4 and Host nation of that world cup 
function setCircleMarker(index)
 {
  
    i = index;
    // Remove all previous circle markers 
    removeMarker(hostmarker)
    removeMarker(marker1)
    removeMarker(marker2)
    removeMarker(marker3)
    removeMarker(marker4)

    // Draw circle marker for Host nation
    hostmarker = L.circleMarker([worldCupData[i].host_country_lat,worldCupData[i].host_country_long], {
      fillOpacity: 0.75,
      color: "blue",
      fillColor: "blue",
      radius: 12 
    }).bindPopup("<h1>" + worldCupData[i].host + "(" + worldCupData[i].year + ")</h1> <hr> <h3>Host Nation</h3>").addTo(myMap);;
   
    // Draw circle marker for Champion
    marker1 = L.circleMarker([worldCupData[i].cup_country_lat,worldCupData[i].cup_country_long], {
      fillOpacity: 0.75,
      color: hostColor(worldCupData[i].host,worldCupData[i].country,"Red"),
      fillColor: "Red",
      radius: 12 
    }).bindPopup("<h1>" + worldCupData[i].country + "(" + worldCupData[i].year + ")</h1> <hr> <h3>" + hostCountry(worldCupData[i].host,worldCupData[i].country) + "Position: " + worldCupData[i].cup_position + "</h3>").addTo(myMap);;
   
    i = index + 1;

    // Draw circle marker for runner up
    marker2 = L.circleMarker([worldCupData[i].cup_country_lat,worldCupData[i].cup_country_long], {
      fillOpacity: 0.75,
      color: hostColor(worldCupData[i].host,worldCupData[i].country,"Orange"),
      fillColor: "Orange",
      radius: 12 
    }).bindPopup("<h1>" + worldCupData[i].country + "(" + worldCupData[i].year + ")</h1> <hr> <h3>" + hostCountry(worldCupData[i].host,worldCupData[i].country) + "Position: " + worldCupData[i].cup_position + "</h3>").addTo(myMap);;
   

    i = index + 2;

    // Draw circle marker for third 
    marker3 = L.circleMarker([worldCupData[i].cup_country_lat,worldCupData[i].cup_country_long], {
      fillOpacity: 0.75,
      color: hostColor(worldCupData[i].host,worldCupData[i].country,"yellow"),
      fillColor: "yellow",
      radius: 12 
    }).bindPopup("<h1>" + worldCupData[i].country + "(" + worldCupData[i].year + ")</h1> <hr> <h3>" + hostCountry(worldCupData[i].host,worldCupData[i].country) + "Position: " + worldCupData[i].cup_position + "</h3>").addTo(myMap);;

    i = index + 3;

    // Draw circle marker for fourth
    marker4 = L.circleMarker([worldCupData[i].cup_country_lat,worldCupData[i].cup_country_long], {
      fillOpacity: 0.75,
      color: hostColor(worldCupData[i].host,worldCupData[i].country,"green"),
      fillColor: "green",
      radius: 12 
    }).bindPopup("<h1>" + worldCupData[i].country + "(" + worldCupData[i].year + ")</h1> <hr> <h3>" + hostCountry(worldCupData[i].host,worldCupData[i].country) + "Position: " + worldCupData[i].cup_position + "</h3>").addTo(myMap);;
}



//Function to detect a change in the list item
function optionChanged(selectedYear) { 
  currentSelectedYear = selectedYear;

  //Find the index of the id array matching the value of the selectedYear
  ind = worldCupData.findIndex(x => x.year === parseInt(selectedYear));
  // Draw circle markers
  setCircleMarker(ind);
    
}


// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 2
}); 

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1Ijoiam9obndhbm5nIiwiYSI6ImNrbmZ2bDJ0djBkNGkydW80MDJvamxseWgifQ.g75LmRVVSBno-2OLw9L1Vw"
}).addTo(myMap);

/*Legend specific*/
var legend = L.control({ position: "topleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>World Cup Winners</h4>";
  div.innerHTML += '<i style="background: Red"></i><span>1st</span><br>';
  div.innerHTML += '<i style="background: Orange"></i><span>2nd</span><br>';
  div.innerHTML += '<i style="background: Yellow"></i><span>3rd</span><br>';
  div.innerHTML += '<i style="background: Green"></i><span>4th</span><br>';
  div.innerHTML += '<i style="background: Blue"></i><span>Host</span><br>';
  return div;
};

legend.addTo(myMap); 

// Read the country_lat_long file for country specific latitude and longitude information.
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
      
    // populate distinct world cup year into the dropdown
    d3.select("#selDataset")
    .selectAll(null)
    .data(d3.map(Data, function(d){return d.year;}).keys()) //Return unqiue years
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // value kept in the menu

    // Populate the default year - 2014 when it is first loaded
    optionChanged(currentSelectedYear);
    
  }).catch(function(error) {
    console.log(error);
  });