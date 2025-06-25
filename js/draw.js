
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

  // Color Picker container
  const colorContainer = createDiv();
  colorContainer.parent('control-panel');
  colorContainer.style('display', 'flex');
  colorContainer.style('align-items', 'center');
  colorPicker = createColorPicker('#000000');
  colorPicker.input(() => currentColor = colorPicker.value());
  colorPicker.parent(colorContainer);

  // Brush Size Slider container
  const brushContainer = createDiv();
  brushContainer.parent('control-panel');
  brushContainer.style('display', 'flex');
  brushContainer.style('align-items', 'center');
  brushSlider = createSlider(1, 20, 4);
  brushSlider.parent(brushContainer);
  brushSlider.input(() => currentBrushSize = brushSlider.value());

 // Save Button
saveButton = createButton('Save');
saveButton.class('glow'); // Add glow class
saveButton.mousePressed(() => {
  const combined = createGraphics(width, height);
  combined.image(bgGraphics, 0, 0);
  combined.image(drawGraphics, 0, 0);
  save(combined, 'drawing_with_bg', 'png');
});
saveButton.parent('control-panel');

  // Load Button Setup
  loadInput = createFileInput(handleFile);
  loadInput.elt.title = "Choose an image file";
  loadInput.elt.setAttribute("style", "opacity: 0; position: absolute; left: -9999px;");
  loadInput.parent('control-panel');
// Load Button
const loadButton = createButton('Load');
loadButton.class('glow'); // Add glow class
loadButton.mousePressed(() => loadInput.elt.click());
loadButton.parent('control-panel');

// Clear Button
clearButton = createButton('Clear');
clearButton.class('glow'); // Add glow class
clearButton.mousePressed(() => {
  loadedImage = null;
  bgGraphics.clear();
  drawGraphics.clear();
});
clearButton.parent('control-panel');
/*you suck*/

// Color Picker & Slider (if you want hover glow for those too)
colorPicker.class('glow');
brushSlider.class('glow');
}

function draw() {
  background(255);
  image(bgGraphics, 0, 0);
  image(drawGraphics, 0, 0);

  if (
    mouseIsPressed &&
    mouseY >= 0 && mouseY <= height &&
    mouseX >= 0 && mouseX <= width
  ) {
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
