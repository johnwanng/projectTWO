d3.csv("worldcup_winners_and_ranks.csv").then(function(Data) {

    // x holds the cup position to be passed to plotly for charting purposes
    // y holds the world ranking to be passed to plotly for charting purposes
    var x = [], y = [], averages = [0,0,0,0], averageCount = [0,0,0,0];
    var i =0;
    // Cast the relevant data values to number that are  to be plotted on the chart
    Data.forEach(function(data) {
        data.cup_position	= +data.cup_position;
        data.world_ranking = +data.world_ranking;
        data.year = +data.year;

        //Append to the respective arrays 
        x.push( data.cup_position);
        y.push( data.world_ranking);

        //Append to the average arrays to calculate average world rank position for top 4
        //averages[0] will hold all previous world rankings for position 1
        //averages[2] will hold all previous world rankings for position 2 and so forth      
        averages[data.cup_position - 1] = averages[data.cup_position - 1] + data.world_ranking;
        averageCount[data.cup_position - 1] = averageCount[data.cup_position - 1] + 1;
        
        i = i + 1;
    })
    makePlotly( x, y, averages, averageCount );
})


// Function to plot the scatter chart
function makePlotly( x, y, averages, averageCount ){
  
    // calculate average world rank position for top 4
    for (i=0;i<averages.length;i++) {
        averages[i] = averages[i] / averageCount[i]
    }
    //console.log(y);
    //console.log(averages);
    var trace1 = {
        x: x,
        y: y,
        //mode: 'markers+text',
        //text: text,
        mode: 'markers',
        type: 'scatter',
        name: 'Overall Standing',
        marker: { size: 10 }
      };
    
    var trace2 = {
        x: [1, 2, 3,4],
        y: averages,
        //mode: 'markers+text',
        //text: text,
        mode: 'markers',
        type: 'scatter',
        name: 'Average Standing',
        marker: { size: 10 }
    };
    
      var data = [ trace1, trace2];
      
      var layout = {
        xaxis: {
          range: [1, 4]
        },
        yaxis: {
          range: [1, 50]
        },
        title: "Comparison of FIFA Rank against Top 4",
        xaxis: { title: "Top 4" },
        yaxis: { title: "FIFA Rank" }
    }
      
      Plotly.newPlot('scatter', data, layout); 
};