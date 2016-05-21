/**
Assumptions made:

1. Purpose passes the dog type as input ex: terrier, hound etc.
2. Income - <60k passes -1 as input. >60k passes any value greater than 0 as input.
**/

var dogTypes = ["terrier", "hound", "sporting", "herding", "working", "non-sporting", "toy"];
var dogScore = [];
var dogData = [];
index = -1;

d3.csv("Data/dog_data.csv", function(error, dog_data) {
var dogObjectCreator = function(d) {
				index = index + 1;
				return {
					breed : d.DogBreed,
					purpose : d.Purpose,
					cost : d.AnnualCost,
					child : d.ChildSuitable,
					size : d.Size,
					popularity: ((1/87) * index)
				};
			};

dogData = dog_data.map(dogObjectCreator);

});

function getDogScores(inputPurpose, income, numKids, houseSize) {

	dogScore = [];

	// Sort in ascending order of cost of dog
	if (income < 0) {
		dogData.sort(function(a,b) {
			return parseFloat(a.cost) - parseFloat(b.cost);
		});
	}

	for (var i = 0; i < dogData.length; i++) {

		purposeScore = getPurposeScore(inputPurpose, dogData[i]["purpose"]);
		

		// If income is greater than 60k, costScore is always 1
		costScore = 1;
		// If income is less than 60k, costScore is based on cost of dog
		if (income < 0) {
			costScore = getCostScore(i);
		}

		childFriendlyScore = getChildFriendlyScore(numKids, dogData[i]["child"]);
		sizeScore = getSizeScore(houseSize, dogData[i]["size"]);
		popularityScore = dogData[i]["popularity"];
		finalScore = getFinalScore(purposeScore, costScore, childFriendlyScore, sizeScore, popularityScore);

		dogObject = {
			purposeScore: purposeScore,
			costScore: costScore,
			childFriendlyScore: childFriendlyScore,
			sizeScore: sizeScore,
			popularity: popularityScore,
			finalScore: finalScore
		}

		dogScore.push(dogObject);
	}

	dogScore.sort(function(a,b) {
			return parseFloat(b.finalScore) - parseFloat(a.finalScore);
		});
}

function getPurposeScore(input, dogPurpose) {
	var inputIndex = dogTypes.indexOf(input);
	var dogIndex = dogTypes.indexOf(dogPurpose);
	return 1 - (Math.abs(inputIndex-dogIndex) * (1/7));
}

function getCostScore(index) {
	return 1 - (index*(1/dogData.length));
}

function getChildFriendlyScore(numKids, child) {
	if (numKids == 0) {
		return 1;
	} else if (numKids == 1) {
		if (child == 1) {
			return 1;
		} else if(child == 2) {
			return 0.6;
		} else {
			return 0.2;
		}
	} else {
		if (child == 1) {
			return 1;
		} else if(child == 2) {
			return 0.3;
		} else {
			return 0;
		}
	}
}

function getSizeScore(houseSize, dogSize) {
	if (houseSize == "Apartment") {
		if (dogSize == "small") {
			return 1;
		} else if (dogSize == "medium") {
			return 0.5;
		} else {
			return 0;
		}
	} else if (houseSize == "House") {
		if (dogSize == "small") {
			return 1;
		} else if (dogSize == "medium") {
			return 1;
		} else {
			return 0.3;
		}
	} else {
		if (dogSize == "small") {
			return 0.5;
		} else if (dogSize == "medium") {
			return 0.6;
		} else {
			return 1;
		}
	}
}

function getFinalScore(purposeScore, costScore, childFriendlyScore, sizeScore, popularityScore) {
	return 3*purposeScore + 2*costScore + 2*childFriendlyScore + 2*sizeScore + 1*popularityScore;
}