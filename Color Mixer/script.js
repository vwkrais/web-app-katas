const redSlider = document.querySelector("#red-slider");
const greenSlider = document.querySelector("#green-slider");
const blueSlider = document.querySelector("#blue-slider");
// const colorDisplay = document.querySelector("#color-display");

function colorChange() {
  let redVal = redSlider.value;
  let greenVal = greenSlider.value;
  let blueVal = blueSlider.value;
  colorDisplay.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
}

//${greenVal},${blueVal}
document.querySelector("#color-display").addEventListener("input", () => {
  colorChange();
});
