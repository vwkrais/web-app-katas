let counter1 = document.querySelector("#counter-number");
let counter = 0;
let activator = document.querySelector("#listener");
const btnReset = document.querySelector("#btn-reset");
let bkgdGrowth = document.querySelector("#background-growth");

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    if (counter === 100) {
      counter = -1;
    }
    counter++;
    counter1.innerHTML = counter;
    bkgdGrowth.style.width = counter + "%";
  }
});

activator.addEventListener("click", () => {
  if (counter === 100) {
    counter = -1;
  }
  counter++;
  counter1.innerHTML = counter;
  bkgdGrowth.style.width = counter + "%";
});

btnReset.addEventListener("click", () => {
  counter = 0;
  counter1.innerText = counter;
  bkgdGrowth.style.width = 0;
});
// const inputElA = document.querySelector("#input-a");
// const total = add(inputElA.value, inputElB.value);
// resultEl.innerHTML = total;

// let btnLightSwitch = document.querySelector("#lightSwitch");
// let bodyDay = document.querySelector("#mainBackground");

// btnLightSwitch.addEventListener("click", () => {
//   btnLightSwitch.classList.toggle("buttonDay");
//   bodyDay.classList.toggle("bodyDay1");
// });
