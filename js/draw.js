let colorPicker;
let saveButton, loadInput, clearButton;
let currentColor = '#000000';
let canvas;
let loadedImage;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent('drawing-section');
  background(255);

  // Color Picker
  colorPicker = createColorPicker('#000000');
  colorPicker.input(() => currentColor = colorPicker.value());
  colorPicker.parent('control-panel');

  // Save Button
  saveButton = createButton('Save');
  saveButton.mousePressed(() => saveCanvas(canvas, 'drawing', 'png'));
  saveButton.parent('control-panel');

loadInput = createFileInput(handleFile);
loadInput.elt.title = "Choose an image file";
loadInput.elt.setAttribute("style", "opacity: 0; position: absolute; left: -9999px;");
loadInput.parent('control-panel');

// Create a custom "Load" button that triggers the file input
let loadButton = createButton('Load');
loadButton.mousePressed(() => loadInput.elt.click());
loadButton.parent('control-panel');


  // ✅ Clear Button
  clearButton = createButton('Clear');
  clearButton.mousePressed(() => {
    loadedImage = null;
    clear();         // clears canvas
    background(255); // reset white background
  });
  clearButton.parent('control-panel');
}

function draw() {
  if (loadedImage) {
    image(loadedImage, 0, 0, width, height);
  }

  stroke(currentColor);
  strokeWeight(4);
  if (mouseIsPressed && mouseY <= height) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    loadedImage = loadImage(file.data, () => {
      image(loadedImage, 0, 0, width, height);
    });
  } else {
    alert('Only image files are supported!');
  }
}


const konamiCode = [
  /*
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
  */
 "e"
];

let userInput = [];

function activateSecretFeature() {
  document.body.classList.add("golden");

  for (let i = 0; i < 50; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.animationDuration = `${1 + Math.random() * 2}s`;
    document.body.appendChild(sparkle);
  }

  setTimeout(() => {
    document.body.classList.remove("golden");
    document.querySelectorAll('.sparkle').forEach(el => el.remove());
  }, 10000);
}

document.addEventListener("keydown", (e) => {
  const input = prompt("Enter the secret command:");

  if (input && input.toLowerCase() === "e") {
    activateSecretFeature();
  }
});
