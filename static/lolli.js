
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 130},
    svgWidth = 460 - margin.left - margin.right,
    svgHeight = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#lolli")
  .append("svg")
    .attr("width", svgWidth + margin.left + margin.right)
    .attr("height", svgHeight + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
 

// Parse the Data
d3.csv("worldcup_best_perfomers_goals_scored_and_conceded.csv").then(function(Data) {
    //console.log(Data);

    Data.forEach(function(data) {
        data.avg_goals_per_world_cup = +data.avg_goals_per_world_cup;
        data.avg_conceded_goals_per_world_cup = +data.avg_conceded_goals_per_world_cup;
    })
 
  // Add X axis
  var x = d3.scaleLinear()
    .domain([-1, 20])
    .range([ 0, svgWidth]);
  svg.append("g")
    .attr("transform", "translate(0," + svgHeight + ")")
    .call(d3.axisBottom(x));

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, svgHeight ])
    .domain(Data.map(function(d) { return d.country; }))
    .padding(1);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Lines
  svg.selectAll("myline")
    .data(Data)
    .enter()
    .append("line")
      .attr("x1", function(d) { return x(d.avg_goals_per_world_cup); })
      .attr("x2", function(d) { return x(d.avg_conceded_goals_per_world_cup); })
      .attr("y1", function(d) { return y(d.country); })
      .attr("y2", function(d) { return y(d.country); })
      .attr("stroke", "grey")
      .attr("stroke-width", "1px");

  // Circles of variable 1
  svg.selectAll("mycircle")
    .data(Data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.avg_goals_per_world_cup); })
      .attr("cy", function(d) { return y(d.country); })
      .attr("r", "6")
      .style("fill", "green");

  // Circles of variable 2
  svg.selectAll("mycircle")
    .data(Data)
    .enter()
    .append("circle")
      .attr("cx", function(d) { return x(d.avg_conceded_goals_per_world_cup); })
      .attr("cy", function(d) { return y(d.country); })
      .attr("r", "6")
      .style("fill", "red")
      
})

