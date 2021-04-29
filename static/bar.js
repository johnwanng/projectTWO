var hostPerformance = ["Winner", "Runner Ups", "Third", "Fourth"];

// Use d3.csv() to fetch data from samples.csv file
// Incoming data is internally referred to as incomingData
d3.csv("worldcup_host_winners.csv").then(function(Data) {

    // Cast the relevant data values to number that are  to be plotted on the chart
    Data.forEach(function(data) {
      data.host_is_winner = +data.host_is_winner;
      data.host_is_second = +data.host_is_second;
      data.host_is_third = +data.host_is_third;
      data.host_is_fourth = +data.host_is_fourth;
      data.not_first_second_third_fourth = +data.not_first_second_third_fourth;
     })

     hostfrequency = [Data[0].host_is_winner,Data[0].host_is_second,Data[0].host_is_third,Data[0].host_is_fourth];

     // Create the Trace
     var trace1 = {
       x: hostPerformance,
       y: hostfrequency,
       type: "bar"
     };
     
     // Create the data array for the plot
     var data = [trace1];
     
     // Define the plot layout
     var layout = {
       title: "Host Country vs Frequency in Top 4",
       xaxis: { title: "Host Performance" },
       yaxis: { title: "Frequency" }
     };
     
     // Plot the chart to a div tag with id "bar-plot"
     Plotly.newPlot("bar", data, layout);

}) 