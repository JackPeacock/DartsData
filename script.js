// Global Variables to keep track of players' scores
var scoreA = 501;
var scoreB = 501;
// Global Variables to keep track of number of legs
var legsA = 0;
var legsB = 0;
// Global Variables which will contain all the darts objects of either player
var arrayA = [];
var arrayB = [];
// Make Tables Available everywhere
var playerATable = document.getElementById("playerATable");
var playerBTable = document.getElementById("playerBTable");

var recordingPlayer = "A";
var aimedAtRecording = "A";

var dartsInTheLegCounter = 0;

var playerAJSON = {
	meta: {
		name:"",
		date: new Date(),
		competition:"World Matchplay 2014",
		round:""
	},
	darts: arrayA
}

var playerBJSON = {
	meta: {
		name:"",
		date: new Date(),
		competition:"World Matchplay 2014",
		round:""
	},
	darts: arrayB
}

// Want these available everywhere for the time being.
var dartboardnumbers = [11,8,16,7,19,3,17,2,15,10,6,13,4,18,1,20,5,12,9,14,11];

// Get the names of the players
var player1 = prompt("Player throwing first?");
var player2 = prompt("Player throwing second?");
var round = prompt("Which round of the competition?")
player1element = document.getElementById("player1");
player2element = document.getElementById("player2");
player1element.innerHTML = player1;
player2element.innerHTML = player2;
playerAJSON.meta.name = player1;
playerBJSON.meta.name = player2;
playerAJSON.meta.round = round;
playerBJSON.meta.round = round;

bounceOut = document.getElementById("bounceOut");
undo = document.getElementById("undo");

//click handlers for canvases
hit.addEventListener("click", recordHitClick, false);
aimedat.addEventListener("click", recordAimedAtClick, false);
bounceOut.addEventListener("click", recordBounceOut, false);
undo.addEventListener("click", undoLastPoint, false);

// dart objector constructor
function dart(bed, dartScore, aimedat) {
		this.bed=bed;
		this.dartScore=dartScore;
		this.aimedat=aimedat;
}

function recordHitClick(e) {
	// Gets r and theta
	var coordinates = getRAndTheta(e, hit);
	// Takes this information and returns a new dart object assuming a triple bed was aimed at
	var newDart = dartboard(coordinates);
	newDart.leg = legsA + legsB + 1;
	// Push this dart to the correct array
	if (recordingPlayer=="A") {
		newDart.sB4Dart = scoreA;
		newDart.sAfDart = scoreA - newDart.dartScore;
		newDart.number = arrayA.length+1;
		arrayA.push(newDart);
		newDart.average = updateAAverage();
		updateVisualsForA();
	}
	else if (recordingPlayer=="B") {
		newDart.sB4Dart = scoreB;
		newDart.sAfDart = scoreB - newDart.dartScore;
		newDart.number = arrayB.length+1;
		arrayB.push(newDart);
		newDart.average = updateBAverage();
		updateVisualsForB();
	}
	updateTurnVariables();
	endOfLegCase();
}

function recordAimedAtClick(e) {
	// Gets r and theta
	var coordinates = getRAndTheta(e, aimedat);
	// Takes this information and returns a new dart object assuming a triple bed was aimed at
	var newDart = dartboard(coordinates);
	window["array"+aimedAtRecording][window["array"+aimedAtRecording].length-1].aimedat = newDart.bed;
	correctTable();
}

function recordBounceOut() {
	var newDart = new dart("bounceout", 0, "t20")
	newDart.leg = legsA + legsB + 1;
	if (recordingPlayer=="A") {
		newDart.sB4Dart = scoreA;
		newDart.sAfDart = scoreA - newDart.dartScore;
		newDart.number = arrayA.length+1;
		arrayA.push(newDart);
		newDart.average = updateAAverage();
		updateVisualsForA();
	}
	else if (recordingPlayer=="B") {
		newDart.sB4Dart = scoreB;
		newDart.sAfDart = scoreB - newDart.dartScore;
		newDart.number = arrayB.length+1;
		arrayB.push(newDart);
		newDart.average = updateBAverage();
		updateVisualsForB();
	}
	updateTurnVariables();
	endOfLegCase();
}

function getRAndTheta(e, canvas) {
	var x, y;
	if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
    }
    else {
    	x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft+200;
    y -= canvas.offsetTop;
    y = y + 200 - 2*y;

    return {
    	r : Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
    	theta : Math.atan2(y,x)
    }
}

// Simplified version of dartboard function from project.
function dartboard(rAndThetaObject) {
	var segmentcounter =0;

    // dubtripfactor is scaling factor for double/treble beds.
    var dubtripfactor = 1;
    var ring;
    
    // Wire thickness not considered. If a dart lands on the exact position of the wire
    // the darts always comes onto the inside of the circle.

	if (rAndThetaObject.r <= 15) { 
		return new dart("ibull", 50, "ibull")
	}

	else if (rAndThetaObject.r <= 30) {
		if((window["score"+recordingPlayer] - 25 == 32)
		|| (window["score"+recordingPlayer] - 25 == 40)
		|| (window["score"+recordingPlayer] - 25 == 36)
		|| (window["score"+recordingPlayer] - 25 == 16)
		|| (window["score"+recordingPlayer] - 25 == 24)
		|| (window["score"+recordingPlayer] - 25 == 10)) {
			return new dart("obull", 25, "obull");
		}
		else {
			return new dart("obull", 25, "ibull");
		}
	}

	else if (rAndThetaObject.r > 170) {
		dubtripfactor = 0;
		ring = "m"
	}

	else if (rAndThetaObject.r > 150 && rAndThetaObject.r <= 170) {
		dubtripfactor = 2;
		ring = "d";
	}

	else if (rAndThetaObject.r > 100 && rAndThetaObject.r <= 125) {
		dubtripfactor = 3;
		ring = "t";
	}

	else if (rAndThetaObject.r > 125 && rAndThetaObject.r <= 150) {
		ring = "o";
	}

	else if (rAndThetaObject.r > 30 && rAndThetaObject.r <= 125) {
		ring = "i";
	}

	while (rAndThetaObject.theta > -19*Math.PI/20) {
	// theta = 0 is defined as the horizontal line running through 6.
	// Each Number has has an angle of pi/10
	// theta > pi/20 means the coordinates are further anticlockwise than 6.
		rAndThetaObject.theta = rAndThetaObject.theta-(Math.PI/10);
		segmentcounter += 1;
	}

	var number = dartboardnumbers[segmentcounter];

	if (ring == "m" || 2*number*dubtripfactor == window["score"+recordingPlayer]) {
		return new dart(ring+number, number*dubtripfactor, "d"+number)
	}

	if (ring == "d" && number*dubtripfactor == window["score"+recordingPlayer]) {
		return new dart(ring+number, number*dubtripfactor, "d"+number)
	}

	if (ring == "o" &&
		((window["score"+recordingPlayer] - number*dubtripfactor == 32)
		|| (window["score"+recordingPlayer] - number*dubtripfactor == 40)
		|| (window["score"+recordingPlayer] - number*dubtripfactor == 36)
		|| (window["score"+recordingPlayer] - number*dubtripfactor == 16)
		|| (window["score"+recordingPlayer] - number*dubtripfactor == 24)
		|| (window["score"+recordingPlayer] - number*dubtripfactor == 10))) {
			return new dart(ring+number, number*dubtripfactor, ring+number)
	}

	if(window["score"+recordingPlayer]>=70 && (number == 5 || number ==1 || number==20)) {
		return new dart(ring+number, number*dubtripfactor, "t20");
	}

	if(window["score"+recordingPlayer]>80 && (number == 7 || number == 3 || number==19)) {
		return new dart(ring+number, number*dubtripfactor, "t19");
	}

	if(window["score"+recordingPlayer]>80 && (number == 4 || number==18)) {
		return new dart(ring+number, number*dubtripfactor, "t18");
	}

	if(window["score"+recordingPlayer]>80 && (number == 2 || number==17)) {
		return new dart(ring+number, number*dubtripfactor, "t17");
	}

	if(window["score"+recordingPlayer]<80 && (number == 2 || number==17)) {
		return new dart(ring+number, number*dubtripfactor, "o17");
	}

	if(ring == "i" && window["score"+recordingPlayer] ==50) {
		return new dart(ring+number, number*dubtripfactor, "ibull");
	}

	if (number == 10) {
		return new dart(ring+number, number*dubtripfactor, "t10");
	}

	if(ring == "o" && (number == 1 || number == 2 || number == 3 || number == 4 || number == 5 || number == 6)) {
		return new dart(ring+number, number*dubtripfactor, "o"+number);
	}

	if(ring = "o" && number ==18 && window["score"+recordingPlayer] ==38) {
		return new dart(ring+number, number*dubtripfactor, "o18");
	}

	if(number == 15 && window["score"+recordingPlayer] == 85) {
		return new dart(ring+number, number*dubtripfactor, "t15");
	}

	return new dart(ring+number, number*dubtripfactor, "NA");
}

function updateVisualsForA() {
	scoreA -= arrayA[arrayA.length-1].dartScore;
	addDartToTable(arrayA[arrayA.length-1], "A");
	var scoreAElement = document.getElementById("playerALegScore");
	scoreAElement.innerHTML = scoreA;
}

function updateVisualsForB() {
	scoreB -= arrayB[arrayB.length-1].dartScore;
	addDartToTable(arrayB[arrayB.length-1], "B");
	var scoreBElement = document.getElementById("playerBLegScore");
	scoreBElement.innerHTML = scoreB;
}

function updateAAverage() {
	var sum = 0;
	for (var i = 0; i < arrayA.length; i++) {
		sum += arrayA[i].dartScore;
	}
	var playerAverage = Math.round(300*sum/arrayA.length)/100;
	var averageElement = document.getElementById("playerAAverage");
	averageElement.innerHTML = playerAverage;
	return playerAverage;
}

function updateBAverage() {
	var sum = 0;
	for (var i = 0; i < arrayB.length; i++) {
		sum += arrayB[i].dartScore;
	}
	var playerAverage = Math.round(300*sum/arrayB.length)/100;
	var averageElement = document.getElementById("playerBAverage");
	averageElement.innerHTML = playerAverage;
	return playerAverage;
}

function correctTable() {
	var tableString = "player" + aimedAtRecording + "Table";
	window[tableString].deleteRow(1);
	var dartThatNeedsUpdating = window["array"+aimedAtRecording][window["array"+aimedAtRecording].length-1];
	addDartToTable(dartThatNeedsUpdating, aimedAtRecording);
}

///////////////////////////////////
// These undo functions are still fucked if we need to go back a leg

function undoLastPoint() {
	var arrayString = "array" + aimedAtRecording;
	var scoreString = "score" + aimedAtRecording;
	var tableString = "player" + aimedAtRecording + "Table";
	var playerLegScoreString = "player" + aimedAtRecording+ "LegScore";
	window[scoreString] += window[arrayString][window[arrayString].length-1].dartScore;
	window[arrayString].splice(window[arrayString].length-1, 1);
	updateAAverage();
	updateBAverage();
	dartsInTheLegCounter -= 2;
	updateTurnVariables();
	var playerTable = document.getElementById(tableString);
	console.log(tableString);
	playerTable.deleteRow(1);
	var scoreElement = document.getElementById(playerLegScoreString);
	scoreElement.innerHTML = window[scoreString];
}

// I want to pass just a string here I think.
function addDartToTable (dart, table) {
	var tableString = "player" + table + "Table";
	var arrayString = "array" + table;
	var row = window[tableString].insertRow(1);
	var cell1 = row.insertCell(0);
	cell1.innerHTML = window[arrayString].length
	var cell2 = row.insertCell(1);
	cell2.innerHTML = dart.dartScore;
	var cell3 = row.insertCell(2);
	cell3.innerHTML = dart.bed;
	var cell4 = row.insertCell(3);
	cell4.innerHTML = dart.aimedat;
}

function endOfLegCase() {
	if (scoreA==0) {
		scoreA = 501;
		scoreB = 501;
		legsA += 1;
		var legsACell = document.getElementById("totalALegs");
		legsACell.innerHTML = legsA;
		var scoreAElement = document.getElementById("playerALegScore");
		scoreAElement.innerHTML = scoreA;
		var scoreBElement = document.getElementById("playerBLegScore");
		scoreBElement.innerHTML = scoreB;
		dartsInTheLegCounter = -1;
		updateTurnVariables();
		localStorage.setItem("playerA", JSON.stringify(playerAJSON));
		localStorage.setItem("playerB", JSON.stringify(playerBJSON));
	}
	else if (scoreA<0 || scoreA == 1) {
		var dartsThrownBeforeBust = dartsInTheLegCounter%3;
		if (dartsThrownBeforeBust==0) {
			dartsThrownBeforeBust=3;
		}
		for (var i = 1; i <= dartsThrownBeforeBust; i++) {
			scoreA += arrayA[arrayA.length-i].dartScore;
		}
		var scoreAElement = document.getElementById("playerALegScore");
		scoreAElement.innerHTML = scoreA;
		dartsInTheLegCounter += (2-dartsThrownBeforeBust);
		updateTurnVariables();
	}
	else if (scoreB==0) {
		scoreA = 501;
		scoreB = 501;
		legsB += 1;
		var legsBCell = document.getElementById("totalBLegs");
		legsBCell.innerHTML = legsB;
		var scoreAElement = document.getElementById("playerALegScore");
		scoreAElement.innerHTML = scoreA;
		var scoreBElement = document.getElementById("playerBLegScore");
		scoreBElement.innerHTML = scoreB;
		dartsInTheLegCounter = -1;
		updateTurnVariables();
		localStorage.setItem("playerA", JSON.stringify(playerAJSON));
		localStorage.setItem("playerB", JSON.stringify(playerBJSON));
	}
	else if (scoreB <0  || scoreB == 1) {
		var dartsThrownBeforeBust = dartsInTheLegCounter%3;
		if (dartsThrownBeforeBust==0) {
			dartsThrownBeforeBust=3;
		}
		for (var i = 1; i <= dartsThrownBeforeBust; i++) {
			scoreB += arrayB[arrayB.length-i].dartScore;
		}
		var scoreBElement = document.getElementById("playerBLegScore");
		scoreBElement.innerHTML = scoreB;
		dartsInTheLegCounter += (2-dartsThrownBeforeBust);
		updateTurnVariables();
	}
}

// New test function for updateTurnVariables
function updateTurnVariables() {
	dartsInTheLegCounter += 1;
	if ((legsA+legsB)%2==0) {
		if (dartsInTheLegCounter%6==0 || dartsInTheLegCounter%6==1 || dartsInTheLegCounter%6==2) {
			recordingPlayer="A";
		}
		else {
			recordingPlayer="B";
		}
		if (dartsInTheLegCounter%6==0 || dartsInTheLegCounter%6==4 || dartsInTheLegCounter%6==5) {
			aimedAtRecording="B";
		}
		else {
			aimedAtRecording="A";
		}
	}
	else if ((legsA+legsB)%2==1) {
		if (dartsInTheLegCounter%6==0 || dartsInTheLegCounter%6==1 || dartsInTheLegCounter%6==2) {
			recordingPlayer="B";
		}
		else {
			recordingPlayer="A";
		}
		if (dartsInTheLegCounter%6==0 || dartsInTheLegCounter%6==4 || dartsInTheLegCounter%6==5) {
			aimedAtRecording="A";
		}
		else {
			aimedAtRecording="B";
		}
	}
	var recordingPlayerCell = document.getElementById("recordingPlayerCell");
	recordingPlayerCell.innerHTML = recordingPlayer;
	var aimedatPlayerCell = document.getElementById("aimedatPlayerCell");
	aimedatPlayerCell.innerHTML = aimedAtRecording;
	var dartsInTheLegCell = document.getElementById("dartsInTheLegCell");
	dartsInTheLegCell.innerHTML = dartsInTheLegCounter;
}
