function DogHunter() {
	function init() {
		/* Create svg part */
		var svg = document.createElement('svg');
		var svgParent = document.getElementById('svgParent');
		svgParent.appendChild(svg);

		var width = 900;
		var height = 520;
		var margin = {top:50, left:40, bottom:100, right:40};


		/* Get data and setup score variables */
		fetchAndSetupData();
	}

	function fetchAndSetupData() {
		// Read 
	}
}