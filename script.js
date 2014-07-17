var scoreA = 501;
var scoreB = 501;
var legsA = 0;
var legsB = 0;

var arrayA = [];
var arrayB = [];

// dart objector constructor
function dart(bed, dartScore, aimedat, legScore) {
		this.bed=bed;
		this.dartScore=dartScore;
		this.aimedat=aimedat;
		this.legScore=legScore;
}

window.onload = function() {
	// This 4 lines grab the canvas and contexts
	hit = document.getElementById("hit");
	hitctx = hit.getContext("2d");
	aimedat = document.getElementById("aimedat");
	aimedatctx = aimedat.getContext("2d");
	// This line grabs the undo button
	undo = document.getElementById("undo");

	// These lines translate the 0,0 coordinate to the center of the context.
	aimedatctx.translate(250,250);
	hitctx.translate(250,250);

	// canvas artwork
	drawCircle(220, "green");
	drawCircle(185, "beige");
	drawCircle(150, "green");
	drawCircle(100, "beige");
	drawCircle(50, "green");
	drawCircle(24, "red");
	drawLines();

	var player1 = prompt("Player throwing first?");
	var player2 = prompt("Player throwing second?");
	player1element = document.getElementById("player1");
	player2element = document.getElementById("player2");
	player1element.innerHTML = player1;
	player2element.innerHTML = player2;

	// click handlers for canvases
	hit.addEventListener("click", recordHitClick, false);
	aimedat.addEventListener("click", recordAimedAtClick, false);
	undo.addEventListener("click", undoLastPoint, false);
}


function drawLines() {
	for (var angle = Math.PI/20; angle < Math.PI*(2+1/20); angle+=Math.PI/10) {
	hitctx.beginPath();
	hitctx.moveTo(50*Math.cos(angle), 50*Math.sin(angle));
    hitctx.lineTo(1000*Math.cos(angle), 1000*Math.sin(angle));
    hitctx.stroke();

    aimedatctx.beginPath();
	aimedatctx.moveTo(50*Math.cos(angle), 50*Math.sin(angle));
    aimedatctx.lineTo(1000*Math.cos(angle), 1000*Math.sin(angle));
    aimedatctx.stroke();
	}
}

function drawCircle(radius, colour) {
	hitctx.beginPath();
	hitctx.arc(0,0,radius,0,2*Math.PI);
	hitctx.fillStyle=colour;
	hitctx.fill();

	aimedatctx.beginPath();
	aimedatctx.arc(0,0,radius,0,2*Math.PI);
	aimedatctx.fillStyle=colour;
	aimedatctx.fill();
}

function recordHitClick(e) {
	addDart(e, hit);
}

function addDart(e, canvas) {
	var x, y;
	if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
    }
    else {
    	x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft+250;
    y -= canvas.offsetTop;
    y = y + 250 - 2*y;

    console.log(x, y)

    var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    var theta = Math.atan2(y,x);
    return dartboard(r, theta);
}

// Simplified version of dartboard function from project.
function dartboard(r, theta) {

    // The list of dartboard numbers starting at 6 and moving anticlockwise
    var dartboardnumbers = [11,8,16,7,19,3,17,2,15,10,6,13,4,18,1,20,5,12,9,14,11];
	var segmentcounter =0;

    // dubtripfactor is scaling factor for double/treble beds.
    var dubtripfactor = 1;
    var ring;
    
    // Wire thickness not considered. If a dart lands on the exact position of the wire
    // the darts always comes onto the inside of the circle.

	if (r <= 24) {
		createDartObject("ibull", 50, "ibull");
	}

	else if (r <= 50) {
		createDartObject("obull", 25, "obull");
	}

	else if (r > 220) {
		dubtripfactor = 0;
		ring = "m"
	}

	else if (r > 185 && r <= 220) {
		dubtripfactor = 2;
		ring = "d";
	}

	else if (r > 100 && r <= 150) {
		dubtripfactor = 3;
		ring = "t";
	}

	else if (r > 150 && r <= 185) {
		ring = "o";
	}

	else if (r > 50 && r <= 150) {
		ring = "i";
	}

	while (theta > -19*Math.PI/20) {
	// theta = 0 is defined as the horizontal line running through 6.
	// Each Number has has an angle of pi/10
	// theta > pi/20 means the coordinates are further anticlockwise than 6.
		theta = theta-(Math.PI/10);
		segmentcounter += 1;
	}

	number = dartboardnumbers[segmentcounter];
	//store in private array

	createDartObject(ring + number, number*dubtripfactor, "t"+number);

}

function createDartObject(bed, dartScore, aimedat) {
	if(arrayA.length == arrayB.length) {
		arrayA.push(new dart(bed, dartScore, aimedat, scoreA))
		scoreA -= dartScore;
		updatePlayerA();
	}
	else if (arrayA.length%3!=0) {
		arrayA.push(new dart(bed, dartScore, aimedat, scoreA))
		scoreA -= dartScore;
		updatePlayerA();
	}
	else {
		arrayB.push(new dart(bed, dartScore, aimedat, scoreB))
		scoreB -= dartScore;
		updatePlayerB();
	}
}

function recordAimedAtClick(e) {
	var info = bedAndScore(e, aimedat);
	darts[darts.length-1].aimedat = info.bed;
	updateList();
}

function undoLastPoint(e) {
	darts.splice(darts.length-1, 1);
	updateList();
}

function updateList() {
	var theHTML = "";
	for (var i=0; i < darts.length; i++) {
		theHTML+="<li>aimed at: "+darts[i].aimedat+", hit: "+darts[i].bed+"</li>";
	}
	dartlist.innerHTML = theHTML;
}

function updatePlayerA() {
	var sum = 0;
	for (var i = 0; i < arrayA.length; i++) {
		sum += arrayA[i].dartScore;
	}
	var playerAverage = 3*sum/arrayA.length;
	var averageElement = document.getElementById("playerAAverage");
	averageElement.innerHTML = playerAverage;
	var scoreAElement = document.getElementById("playerALegScore");
	scoreAElement.innerHTML = scoreA;
	var scoreBElement = document.getElementById("playerBLegScore");
	var totalALegs = document.getElementById("totalALegs")
	if (scoreA == 0) {
		legsA++;
		scoreA = 501;
		scoreB = 501;
		scoreAElement.innerHTML = scoreA;
		scoreBElement.innerHTML = scoreB;
		totalALegs.innerHTML = legsA;
	}
}

function updatePlayerB() {
	var sum = 0;
	for (var i = 0; i < arrayB.length; i++) {
		sum += arrayB[i].dartScore;
	}
	var playerAverage = 3*sum/arrayB.length;
	var averageElement = document.getElementById("playerBAverage");
	averageElement.innerHTML = playerAverage;
	var scoreBElement = document.getElementById("playerBLegScore");
	scoreBElement.innerHTML = scoreB;
}