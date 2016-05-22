function DogHunter() {
	var radiusScale = d3.scale.sqrt()
	    .domain([0,10])
	    .range([0, 50]);

    var opacityScale = d3.scale.sqrt()
	    .domain([100,750])
	    .range([1, 0]);
	function init() {
		/* Create svg part */
		var width = 1600;
		var height = 1200;

		var svg = d3.select("#svgParent").append("svg").attr("height", height).attr("width", width).attr("id","svg");
		// .attr("viewBox","0 0 1400 500").attr("preserveAspectRatio","xMidYMid slice").attr("overflow","scroll");
		svg.append("g").attr("id","viewport").attr("height", height).attr("width", width);
		var svgParent = document.getElementById("svgParent");
		svgParent.scrollTop = height/4;
		svgParent.scrollLeft = 170;
		/* Get data and setup score variables */
		fetchAndSetupData();
		// $("svg").svgPan("viewport");
	}

	function fetchAndSetupData() {
		// Read
			var svg = d3.select("#viewport");
			var youX = 800;
			var youY = 600;
			svg.append("circle")
				.attr("r",radiusScale(20))
				.attr("fill","black")
				.attr("cx",youX)
				.attr("cy",youY);

			svg.append("text")
				.text("You")
				.attr("fill","white")
				.attr("x",youX-12)
				.attr("y",youY+3);

			dagScore.forEach(function(d,i) {
				var circleParams = getCircleParams(youX, youY, i);
				svg.append("circle")
				.attr("r",radiusScale(d.finalScore))
				.attr("fill","maroon")
				.style("opacity",circleParams.opacity)
				.attr("cx",circleParams.x)
				.attr("cy",circleParams.y);

				svg.append("text")
				.text(i)
				.attr("fill","white")
				.attr("x",circleParams.x)
				.attr("y",circleParams.y);
			});
	}

	function getCircleParams(youX,youY,rank) {
		var angle = Math.random() * Math.PI * 2;
		var intervals = [0,5,15,25,50,87];
		var allowedCircles = 0;
		var radius = 0;
		for (var i = 0; i < intervals.length; i++) {
			if(rank<intervals[i]) {
				allowedCircles = intervals[i]-intervals[i-1];
				break;
			}
		}
		// angle = (rank-intervals[i-1])/allowedCircles*6.3;
		angle = (rank-intervals[i-1])/allowedCircles*360;
		angle = angle * Math.PI / 180;
		// console.log(rank + " and "+angle);
		if(rank<5) {
			radius = 150;
		} else if(rank<15) {
			radius = 270;
		} else if(rank<25) {
			radius = 370;
		} else if(rank<50) {
			radius = 470;
		} else {
			radius = 550;
		}
		return {
	        x: youX + Math.cos(angle) * radius,
	        y: youY + Math.sin(angle) * radius,
	        opacity: opacityScale(radius)
	    };
	}

	return {
		init: init
	};
}

DogHunter().init();