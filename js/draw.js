let colorPicker, brushSlider;
let saveButton, loadInput, clearButton;
let currentColor = '#000000';
let currentBrushSize = 4;
let canvas;
let loadedImage;
let bgGraphics;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent('drawing-section');
  background(255);

  bgGraphics = createGraphics(400, 400); // To hold background image

  // Color Picker
  colorPicker = createColorPicker('#000000');
  colorPicker.input(() => currentColor = colorPicker.value());
  colorPicker.parent('control-panel');

  // Brush Size Slider
  brushSlider = createSlider(1, 20, 4);
  brushSlider.parent('control-panel');
  brushSlider.input(() => currentBrushSize = brushSlider.value());

  // Save Button
  saveButton = createButton('Save');
  saveButton.mousePressed(() => saveCanvas(canvas, 'drawing', 'png'));
  saveButton.parent('control-panel');

  loadInput = createFileInput(handleFile);
  loadInput.elt.title = "Choose an image file";
  loadInput.elt.setAttribute("style", "opacity: 0; position: absolute; left: -9999px;");
  loadInput.parent('control-panel');

  let loadButton = createButton('Load');
  loadButton.mousePressed(() => loadInput.elt.click());
  loadButton.parent('control-panel');

  clearButton = createButton('Clear');
  clearButton.mousePressed(() => {
    loadedImage = null;
    bgGraphics.clear(); // Clear background
    clear();
    background(255);
  });
  clearButton.parent('control-panel');
}

function draw() {
  background(255);
  image(bgGraphics, 0, 0, width, height); // draw background layer
  stroke(currentColor);
  strokeWeight(currentBrushSize);
  if (mouseIsPressed && mouseY <= height) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, img => {
      loadedImage = img;
      bgGraphics.image(img, 0, 0, width, height); // Draw to background layer
    });
  } else {
    alert('Only image files are supported!');
  }
}
