function DogHunter() {
	function init() {
		/* Create svg part */
		var width = "100%";
		var height = 500;
		var margin = {top:50, left:40, bottom:100, right:40};

		var svg = d3.select("#svgParent").append("svg").attr("height", height).attr("width", width).attr("id","svg");
		// .attr("viewBox","0 0 1400 500").attr("preserveAspectRatio","xMidYMid slice").attr("overflow","scroll");
		svg.append("g").attr("id","viewport").attr("height", height).attr("width", width);
		/* Get data and setup score variables */
		fetchAndSetupData();
		$('svg').svgPan('viewport');
	}

	function fetchAndSetupData() {
		var radiusScale = d3.scale.sqrt()
			    .domain([0,1])
			    .range([0, 100]);

		// Read
		d3.csv('data/test.csv',function(err,data) {
			var svg = d3.select('#viewport');
			svg.append('circle')
				.attr('r',radiusScale(1))
				.attr('fill','black')
				.attr('cx',300)
				.attr('cy',100);
			svg.append('text')
				.text("You")
				.attr('fill','white')
				.attr('x',350)
				.attr('y',100);
			data.forEach(function(d,i) {
				svg.append('circle')
				.attr('r',radiusScale(d.score))
				.attr('fill','maroon')
				.attr('cx',70)
				.attr('cy',100*(i+1));

				svg.append('text')
				.text(d.dog)
				.attr('fill','white')
				.attr('x',40)
				.attr('y',100*(i+1));

				console.log(i);

			});
		});
	}
	return {
		init: init
	};
}

DogHunter().init();