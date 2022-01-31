function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let colorChangeInterval = null;
stopButton.disabled = true;

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);

function startColorChange() {
    colorChangeInterval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        startButton.disabled = true;
        stopButton.disabled = false;
    }, 1000);
};

function stopColorChange() {
    clearInterval(colorChangeInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
};
