document.getElementById("start-timer").addEventListener("click", function () {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds > 0) {
    startNewTimer(totalSeconds);
  } else {
    alert("Please enter a valid time.");
  }
});

function startNewTimer(totalSeconds) {
  const timerContainer = document.createElement("div");
  timerContainer.className = "timer";

  const timerDisplay = document.createElement("span");
  timerContainer.appendChild(timerDisplay);

  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop Timer";
  timerContainer.appendChild(stopButton);

  document.querySelector(".active-timers").appendChild(timerContainer);

  let remainingSeconds = totalSeconds;
  const interval = setInterval(() => {
    remainingSeconds--;
    timerDisplay.textContent = formatTime(remainingSeconds);

    if (remainingSeconds <= 0) {
      clearInterval(interval);
      timerDisplay.className = "timer-end";
      timerDisplay.textContent = "Time is up!";
      playAudioAlert();
    }
  }, 1000);

  stopButton.addEventListener("click", function () {
    clearInterval(interval);
    timerContainer.remove();
  });
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `Time left: ${h}h ${m}m ${s}s`;
}

function playAudioAlert() {
  const audio = new Audio("alert.mp3");
  audio.play();
}
