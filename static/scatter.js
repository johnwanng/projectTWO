
function getAverage(value) {
    }

d3.csv("worldcup_winners_and_ranks.csv").then(function(Data) {

    var x = [], y = [], averages = [0,0,0,0], averageCount = [0,0,0,0];
    var i =0;
    // Cast the relevant data values to number that are  to be plotted on the chart
    Data.forEach(function(data) {
        data.cup_position	= +data.cup_position;
        data.world_ranking = +data.world_ranking;
        data.year = +data.year;

        //row = data[i];
        //console.log(row);
        x.push( data.cup_position);
        y.push( data.world_ranking);

        averages[data.cup_position - 1] = averages[data.cup_position - 1] + data.world_ranking;
        averageCount[data.cup_position - 1] = averageCount[data.cup_position - 1] + 1;
        
        i = i + 1;
    })
    makePlotly( x, y, averages, averageCount );
})

function makePlotly( x, y, averages, averageCount ){
  
    for (i=0;i<averages.length;i++) {
        averages[i] = averages[i] / averageCount[i]
    }
    console.log(x);
    console.log(averages);
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
        title: "Top 4 vs World Rank",
        xaxis: { title: "Top 4" },
        yaxis: { title: "World Rank" }}
      
      Plotly.newPlot('scatter', data, layout); 
};