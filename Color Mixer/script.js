const API_URL = "https://dummy-apis.netlify.app/api/color";

const redSlider = document.querySelector("#red-slider");
const greenSlider = document.querySelector("#green-slider");
const blueSlider = document.querySelector("#blue-slider");
const btnRandom = document.querySelector("#random-btn");
const colorDisplay = document.querySelector("#color-display");
const slider = document.querySelectorAll(".slider");

function colorChange() {
  let redVal = redSlider.value;
  let greenVal = greenSlider.value;
  let blueVal = blueSlider.value;
  colorDisplay.style.backgroundColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
}

slider.forEach((sliderElement) => {
  sliderElement.addEventListener("input", () => {
    colorChange();
  });
});

function randomColor() {
  fetch(API_URL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      colorDisplay.style.backgroundColor = `rgb(${data.rgb.r}, ${data.rgb.g}, ${data.rgb.b})`;
      console.log(data);
      redSlider.value = data.rgb.r;
      greenSlider.value = data.rgb.g;
      blueSlider.value = data.rgb.b;
    });
}
btnRandom.addEventListener("click", () => {
  randomColor();
});

randomColor();
