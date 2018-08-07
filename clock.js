// start drawing the clock
window.requestAnimationFrame(drawClock);

/**
 * Draws the clock
 */
function drawClock() {  
    var currentTime = new Date();  
	var ctx = document.getElementById('canvas').getContext('2d');
	ctx.save();
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.fillStyle = 'white';
	ctx.arc(0, 0, 200, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.save();	

	generateHourMarkers(ctx);
	generateMinuteMarkers(ctx);
    generateHourHand(ctx, currentTime);
    generateMinuteHand(ctx, currentTime);
    generateSecondHand(ctx, currentTime)

    ctx.restore();
    window.requestAnimationFrame(drawClock);
}

/**
 * Generates the hour markers
 *
 * @param {Object} context
 */
function generateHourMarkers(context) {
	for (var i = 0; i < 12; i++) {
		context.beginPath();
		context.rotate(Math.PI / 6);
		context.moveTo(150, 0);
		context.lineTo(190, 0);
		context.lineWidth = 11;
		context.stroke();
	}
	context.restore();
	context.save();	
}

/**
 * Generates the minute markers
 *
 * @param {Object} context
 */
function generateMinuteMarkers(context) {
	for (i = 1; i < 61; i++) {	
	  context.beginPath();
	  context.rotate(Math.PI / 30);
	  context.moveTo(170, 0);
	  context.lineTo(185, 0);
	  context.lineWidth = 5;
      
      // display only in between hour markers
	  if (i !== Math.ceil(i / 5) * 5) {
       context.stroke();
	  }
	}
	context.restore();
}

/**
 * Generates the hour hand
 *
 * @param {Object} context
 * @param {Object} currentTime
 */
function generateHourHand(context, currentTime) {
	context.save();
	context.rotate(getCurrentHours(currentTime) * (Math.PI / 6) + 
		(Math.PI / 360) * getCurrentMinutes(currentTime) + (Math.PI / 21600) * getCurrentSeconds(currentTime));
	context.lineWidth = 14;
	context.fillStyle = 'black';
	context.beginPath();
	context.lineWidth = 1;
	context.moveTo(-40, -12);
	context.lineTo(120, -8);
	context.lineTo(120, 8);
	context.lineTo(-40, 12);
	context.fill();
	context.restore();
}

/**
 * Generates the minute hand
 *
 * @param {Object} context
 * @param {Object} currentTime
 */
function generateMinuteHand(context, currentTime) {
    context.save();
	context.rotate((Math.PI / 30) * getCurrentMinutes(currentTime) + (Math.PI / 1800) * getCurrentSeconds(currentTime));
	context.lineWidth = 10;
	context.fillStyle = 'black';
	context.beginPath();
	context.lineWidth = 1;
	context.moveTo(-40, -9);
	context.lineTo(175, -7);
	context.lineTo(175, 7);
	context.lineTo(-40, 9);
	context.fill();
	context.restore();
}

/**
 * Generates the second hand
 *
 * @param {Object} context
 * @param {Object} currentTime
 */
function generateSecondHand(context, currentTime) {
    context.save();
    context.rotate(getCurrentSeconds(currentTime) * Math.PI / 30);
	context.strokeStyle = '#D40000';
	context.fillStyle = '#D40000';
	context.lineWidth = 6;
	context.beginPath();
	context.moveTo(-80, 0);
	context.lineTo(110, 0);
	context.stroke();
	context.beginPath();
	context.arc(126, 0, 17, 0, Math.PI * 2, true);
	context.fill();
	context.restore();
}

/**
 * Gets the current hours
 *
 * @param {Object} currentTime
 * @param {Number}
 */
function getCurrentHours(currentTime) {
	var hour  = currentTime.getHours() - 3;
	return hour >= 12 ? hour - 12 : hour;
}

/**
 * Gets the current minutes
 *
 * @param {Object} currentTime
 * @param {Number}
 */
function getCurrentMinutes(currentTime) {
	return currentTime.getMinutes() - 15;
}

/**
 * Gets the current seconds
 *
 * @param {Object} currentTime
 * @param {Number}
 */
function getCurrentSeconds(currentTime) {
	return currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;
}