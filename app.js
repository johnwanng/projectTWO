// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 30},
    svgWidth = 460 - margin.left - margin.right,
    svgHeight = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("scored_conceded")
  .append("svg")
    .attr("width", svgWidth + margin.left + margin.right)
    .attr("height", svgHeight + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("worldcup_all_countries_goals_scored_and_conceded.csv", function(scoresData,status) {
  alert("Status: " + status);
  console.log(scoresData);

//scoresData.forEach(function(data) {
  //data.goals = +data.avg_goals_per_world_cup;
  //data.conceded = +data.avg_conceded_goals_per_world_cup;
});

  // Add X axis
  var x = d3.scaleLinear()
    .domain([-1, 20])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.group; }))
    .padding(1);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Lines
  svg.selectAll("myline")
    .data(data)
    .enter()
    .append("line")
      .attr("x1", function(d) { return x(d.value1); })
      .attr("x2", function(d) { return x(d.value2); })
      .attr("y1", function(d) { return y(d.group); })
      .attr("y2", function(d) { return y(d.group); })
      .attr("stroke", "grey")
      .attr("stroke-width", "1px");

  // Circles of variable 1
  svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.value1); })
      .attr("cy", function(d) { return y(d.group); })
      .attr("r", "6")
      .style("fill", "#69b3a2");

  // Circles of variable 2
  svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.value2); })
      .attr("cy", function(d) { return y(d.group); })
      .attr("r", "6")
      .style("fill", "#4C4082")

   // Add a title   
  svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .text("Goals Scored Against Goals Conceded")
;
