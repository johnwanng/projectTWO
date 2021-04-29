d3.csv("worldcup_winning_coaches.csv").then(function(Data) {

  var x1 = [], y1 = [], x2 = [], y2 = [], x3 = [], y3 = [],x4 = [], y4 = [];

  // Cast the relevant data values to number that are  to be plotted on the chart
  Data.forEach(function(data) {
    data.cup_position = +data.cup_position;

    if (data.cup_position == 1) {
      x1.push( data.coach_country);
      y1.push( data.cup_position);
    }
    if (data.cup_position == 2) {
      x2.push( data.coach_country);
      y2.push( data.cup_position);
    }
    if (data.cup_position == 3) {
      x3.push( data.coach_country);
      y3.push( data.cup_position);
    }
    if (data.cup_position == 4) {
      x4.push( data.coach_country);
      y4.push( data.cup_position);
    }    
  })

  var trace1 = {
    x: x1,
    y: y1,
    name: 'Winner',
    type: 'bar'
  };

  var trace2 = {
    x: x2,
    y: y2,
    name: 'Runner Up',
    type: 'bar'
  };

  var trace3 = {
    x: x3,
    y: y3,
    name: 'Third',
    type: 'bar'
  };

  var trace4 = {
    x: x4,
    y: y4,
    name: 'Fourth',
    type: 'bar'
  };

  var coachdata = [trace1, trace2, trace3,trace4];

  console.log(coachdata);


  var layout = {title: 'Frequency of nationality of coach finishing in Top 4', barmode: 'stack'};

  Plotly.newPlot('stackedbar', coachdata, layout);

})
