window.onload = function() {
	// This 4 lines grab the canvas and contexts
	hit = document.getElementById("hit");
	hitctx = hit.getContext("2d");
	aimedat = document.getElementById("aimedat");
	aimedatctx = aimedat.getContext("2d");
	
	// These lines translate the 0,0 coordinate to the center of the context.
	aimedatctx.translate(200,200);
	hitctx.translate(200,200);

	// canvas artwork
	drawCircle(170, "red");
	drawCircle(150, "black");
	drawCircle(125, "red");
	drawCircle(100, "black");
	drawCircle(30, "green");
	drawCircle(15, "red");
	drawLines();
	drawNumbers();
}

function drawLines() {
	hitctx.strokeStyle = "blue";
	aimedatctx.strokeStyle = "blue";
	for (var angle = Math.PI/20; angle < Math.PI*(2+1/20); angle+=Math.PI/10) {
	hitctx.beginPath();
	hitctx.moveTo(30*Math.cos(angle), 30*Math.sin(angle));
    hitctx.lineTo(1000*Math.cos(angle), 1000*Math.sin(angle));
    hitctx.stroke();

    aimedatctx.beginPath();
	aimedatctx.moveTo(30*Math.cos(angle), 30*Math.sin(angle));
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

function drawNumbers() {
	hitctx.font="30px";
	hitctx.fillStyle = "white";
	aimedatctx.font="30px";
	aimedatctx.fillStyle = "white";
	for (var angle = 0; angle < 20; angle++) {
		hitctx.fillText(dartboardnumbers[angle], 100*Math.cos(Math.PI - angle*Math.PI/10), 100*Math.sin(Math.PI - angle*Math.PI/10));
		aimedatctx.fillText(dartboardnumbers[angle], 100*Math.cos(Math.PI - angle*Math.PI/10), 100*Math.sin(Math.PI - angle*Math.PI/10));
	}
}