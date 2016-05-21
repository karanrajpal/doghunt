function DogHunter() {
	function init() {
		/* Create svg part */
		var svg = document.createElement('svg');
		var svgParent = document.getElementById('svgParent');
		svgParent.appendChild(svg);

		var width = 1000;
		var height = 500;
		var margin = {top:50, left:40, bottom:100, right:40};


		/* Get data and setup score variables */
		fetchAndSetupData();
	}

	function fetchAndSetupData() {
		// Read 
	}
	return {
		init: init
	};
}

DogHunter().init();