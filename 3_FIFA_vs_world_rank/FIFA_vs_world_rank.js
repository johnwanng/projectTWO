$(document).ready(function()	{
	
	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 40
	}, width = 725 - margin.left - margin.right, height = 600 - margin.top - margin.bottom;

	var x = d3.scale.linear()
		.range([0, width]);
	
	var y = d3.scale.linear()
		.range([height, 0]);

	var formatCurrency = d3.format(",");

	var div = d3.select("body")
		.append("div")
			.attr("cup_position", "world_ranking")
			.style("opacity", 0);

	//var color = d3.scale.category10();
	var color = d3.scale.ordinal()
		.domain([1, 2, 3])
		.range(["rgb(53,135,212)", "rgb(77, 175, 74)", "rgb(228, 26, 28)"]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var svg = d3.select("#chart")
		.append("svg")
			.attr("class", "chart")
			.attr("viewBox", "0 0 725 600")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("worldcup_winners_and_ranks.csv", function(error, data) {

		x.domain([0, 50]).nice();
		y.domain([0, 5]).nice();

		//x axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
				.attr("class", "label")
				.attr("x", width)
				.attr("y", -6)
				.style("text-anchor", "end")
				.text("FIFA Rank before World Cup");

		//y axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
				.attr("class", "label")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Finishing position after World Cup")

		//legend y position
		var LYP = 300, 
			LXP = 570;
			
		svg.append("text").attr("class", "label").attr("x", LXP - 5).attr("y", LYP).text("Institution Type").style("font-weight", "bold");

		//color legend
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 20).attr("r", 12).style("fill", "rgb(53, 135, 212)").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 25).style("text-anchor", "start").text(function(d) {
			return "1";
		});
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 50).attr("r", 12).style("fill", "rgb(77, 175, 74)").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 55).style("text-anchor", "start").text(function(d) {
			return "2";
		});
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80).attr("r", 12).style("fill", "rgb(228, 26, 28)").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 85).style("text-anchor", "start").text(function(d) {
			return "3";
		});
		svg.append("text").attr("class", "label").attr("x", LXP - 5).attr("y", LYP + 110).text("Enrollment").style("font-weight", "bold");

		//size legend
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 30 + 110).attr("r", 20).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 140).style("text-anchor", "start").text("27,000");
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 60 + 110).attr("r", 15).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 170).style("text-anchor", "start").text("18,000+");
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80 + 110).attr("r", 9).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 190).style("text-anchor", "start").text("9,000+");
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 93 + 110).attr("r", 4).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 210).style("text-anchor", "start").text("100+");


		//circles
		svg.selectAll(".dot")
			.data(data.sort(
				function(a, b) {
					return b.TotalEnrollment - a.TotalEnrollment;
				}))
			.enter()
			.append("circle")
				.attr("class", "dot")
				.attr("r", 
					function(d) {
						return (4 + (d.TotalEnrollment * .0006));
					})//gave it a base 3.4 plus a proportional amount to the enrollment
				.attr("cx", 
					function(d) {
						return x(d.TF9900);
					})
				.attr("cy", 
					function(d) {
						return y(d.loan9900);
					})
				.style("fill", 
					function(d) {
						if (d.type == 3) {
							return "rgb(228, 26, 28)";
						} else if (d.type == 2) {
							return "rgb(77, 175, 74)";
						} else {
							return "rgb(53, 135, 212)";
						}
					});
				
		var running = false;
		var timer;
		
		$("button").on("click", function() {
		
			var duration = 3000,
				maxstep = 2014,
				minstep = 1994;
			
			if (running == true) {
			
				$("button").html("Play");
				running = false;
				clearInterval(timer);
				
			} 
			/*
else if (running == true && $("#slider").val() == maxstep) {
				 running = true;
				 $("button").html("Play1");
				 
			
			} 
*/
			else if (running == false) {
			
				$("button").html("Pause");
				
				sliderValue = $("#slider").val();
				
				timer = setInterval( function(){
						if (sliderValue < maxstep){
							sliderValue++;
							$("#slider").val(sliderValue);
							$('#range').html(sliderValue);
						}
						$("#slider").val(sliderValue);
						update();
					
				}, duration);
				running = true;
				
				
			}

		});
	
		$("#slider").on("change", function(){
			update();
			$("#range").html($("#slider").val());
			clearInterval(timer);
			$("button").html("Play");
		});
	
		update = function() {
		
			d3.selectAll(".dot")
				.transition()
				.duration(1000)
				.attr("cy", function(d) {
			
					switch ($("#slider").val()) {
						case "1994":
							return y(d.loan9900);
							break;
						case "1998":
							return y(d.loan0001);
							break;
						case "2002":
							return y(d.loan0102);
							break;
						case "2006":
							return y(d.loan0203);
							break;
						case "2010":
							return y(d.loan0304);
							break;
						case "2014":
							return y(d.loan0405);
							break;
						
					}
				})
				.transition()
				.duration(1000)
				.attr("cx", function(d) {
					switch ($("#slider").val()) {
						case "1994":
							return x(d.TF9900);
							break;
						case "1998":
							return x(d.TF0001);
							break;
						case "2002":
							return x(d.TF0102);
							break;
						case "2006":
							return x(d.TF0203);
							break;
						case "2010":
							return x(d.TF0304);
							break;
						case "2014":
							return x(d.TF0405);
							break;
						
					}
				});
		};
		
	});

});
