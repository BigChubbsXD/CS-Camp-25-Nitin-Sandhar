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
