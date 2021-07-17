var Timer;
var TotalSeconds;


function CreateTimer(TimerID, Time) {
	Timer = document.getElementById("clock");
	TotalSeconds = Time;

	UpdateTimer()
	window.setTimeout("Tick()", 1000);
}

function Tick() {
	TotalSeconds -= 1;
	UpdateTimer()
	window.setTimeout("Tick()", 1000);
}

function UpdateTimer() {
	Timer.innerHTML = TotalSeconds;
}