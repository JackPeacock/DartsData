window.onload = function() {
	// This 4 lines grab the canvas and contexts
	hit = document.getElementById("hit");
	hitctx = hit.getContext("2d");
	aimedat = document.getElementById("aimedat");
	aimedatctx = aimedat.getContext("2d");
	
	// These lines translate the 0,0 coordinate to the center of the context.
	aimedatctx.translate(200,200);
	hitctx.translate(200,200);

	drawBedShape(30,100, "Beige", "black", "aimedatctx");
	drawBedShape(100, 125, "green", "red", "aimedatctx");
	drawBedShape(125,150, "Beige", "black", "aimedatctx");
	drawBedShape(150, 170, "green", "red", "aimedatctx");
	drawBedShape(30,100, "Beige", "black", "hitctx");
	drawBedShape(100, 125, "green", "red", "hitctx");
	drawBedShape(125,150, "Beige", "black", "hitctx");
	drawBedShape(150, 170, "green", "red", "hitctx");
	drawCircle(30, "green");
	drawCircle(15, "red");
	drawLines();
	drawNumbers();
}

function drawLines() {
	hitctx.strokeStyle = "black";
	aimedatctx.strokeStyle = "black";
	for (var angle = Math.PI/20; angle < Math.PI*(2+1/20); angle+=Math.PI/10) {
	hitctx.beginPath();
	hitctx.moveTo(170*Math.cos(angle), 170*Math.sin(angle));
    hitctx.lineTo(1000*Math.cos(angle), 1000*Math.sin(angle));
    hitctx.stroke();

    aimedatctx.beginPath();
	aimedatctx.moveTo(170*Math.cos(angle), 170*Math.sin(angle));
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

function drawBedShape(innerRadius, outerRadius, colour1, colour2, ctx) {
	window[ctx].beginPath();
	window[ctx].arc(0,0,innerRadius, Math.PI/20, 39*Math.PI/20, true);
	window[ctx].lineTo(outerRadius*Math.cos(39*Math.PI/20), outerRadius*Math.sin(39*Math.PI/20));
	window[ctx].arc(0,0,outerRadius, 39*Math.PI/20, Math.PI/20, false);
	window[ctx].lineTo(innerRadius*Math.cos(Math.PI/20), innerRadius*Math.sin(Math.PI/20));
	window[ctx].fillStyle = colour1;
	window[ctx].fill();

	for (var i = 0; i < 20; i++) {
		window[ctx].beginPath();
		window[ctx].arc(0,0,innerRadius, i*Math.PI/10 + Math.PI/20, i*Math.PI/10 + 3*Math.PI/20, false);
		window[ctx].lineTo(outerRadius*Math.cos(i*Math.PI/10 + 3*Math.PI/20), outerRadius*Math.sin(i*Math.PI/10 + 3*Math.PI/20));
		window[ctx].arc(0,0,outerRadius, i*Math.PI/10 + 3*Math.PI/20, i*Math.PI/10 + Math.PI/20, true);
		window[ctx].lineTo(innerRadius*Math.cos(i*Math.PI/10 + Math.PI/20), innerRadius*Math.sin(i*Math.PI/10 + Math.PI/20))
		if(i%2==0) {
			window[ctx].fillStyle = colour2;
		}
		else {
			window[ctx].fillStyle = colour1;
		}
		window[ctx].fill();
	}
	
}

function drawNumbers() {
	hitctx.font="30px";
	aimedatctx.font="30px";
	aimedatctx.fillStyle = "white";
	hitctx.fillStyle = "white";
	for (var angle = 0; angle < 20; angle++) {
		hitctx.fillText(dartboardnumbers[angle], 115*Math.cos(Math.PI - angle*Math.PI/10), 115*Math.sin(Math.PI - angle*Math.PI/10));
		aimedatctx.fillText(dartboardnumbers[angle], 115*Math.cos(Math.PI - angle*Math.PI/10), 115*Math.sin(Math.PI - angle*Math.PI/10));
	}
}