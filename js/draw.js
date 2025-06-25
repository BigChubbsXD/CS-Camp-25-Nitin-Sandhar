let colorPicker, brushSlider;
let saveButton, loadInput, clearButton;
let currentColor = '#000000';
let currentBrushSize = 4;
let canvas;
let loadedImage;
let bgGraphics, drawGraphics;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent('drawing-section');
  
  bgGraphics = createGraphics(400, 400);     // holds the background image
  drawGraphics = createGraphics(400, 400);   // persistent drawing layer

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
  saveButton.mousePressed(() => saveCanvas(drawGraphics, 'drawing', 'png')); // Save drawing only
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
    bgGraphics.clear();
    drawGraphics.clear();
  });
  clearButton.parent('control-panel');
}

function draw() {
  background(255);
  image(bgGraphics, 0, 0);
  image(drawGraphics, 0, 0);

  if (mouseIsPressed && mouseY <= height && mouseY >= 0 && mouseX >= 0 && mouseX <= width) {
    drawGraphics.stroke(currentColor);
    drawGraphics.strokeWeight(currentBrushSize);
    drawGraphics.line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function handleFile(file) {
  if (file.type === 'image') {
    loadImage(file.data, img => {
      loadedImage = img;
      bgGraphics.image(img, 0, 0, width, height);
    });
  } else {
    alert('Only image files are supported!');
  }
}
