// xp-script.js

let dragging = false;
let offsetX, offsetY;
const xpWindow = document.getElementById("xp-window");
const startMenu = document.getElementById("xp-start-menu");
const clock = document.getElementById("xp-clock");

function openWindow(title) {
  const titleBar = document.getElementById("xp-window-title");
  titleBar.textContent = title;
  xpWindow.classList.remove("hidden");
  xpWindow.style.left = "100px";
  xpWindow.style.top = "100px";
}

function closeWindow() {
  xpWindow.classList.add("hidden");
}

function toggleStartMenu() {
  startMenu.classList.toggle("hidden");
}

function startDrag(e) {
  dragging = true;
  const rect = xpWindow.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
}

function drag(e) {
  if (dragging) {
    xpWindow.style.left = `${e.clientX - offsetX}px`;
    xpWindow.style.top = `${e.clientY - offsetY}px`;
  }
}

function stopDrag() {
  dragging = false;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  const hoursStr = hours.toString().padStart(2, '0');

  clock.textContent = `${hoursStr}:${minutes} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();
