const API_URL = "https://dummy-apis.netlify.app/api/quote"; //shoutcase
let quote = document.querySelector("#quote");
let author = document.querySelector("#author");
const btnQuote = document.querySelector("#quote-btn");

function getQuote() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      quote.innerHTML = "";
      author.innerHTML = "";
      quote.innerText = data.quote;
      author.innerText = data.author;
    });
}

btnQuote.addEventListener("click", () => getQuote());
getQuote();

//const promise = fetch(API_URL);
// promise
//   .then((response) => {
//     console.log(response);
//     return response.json();
//   })
//   .then((data) => {
//     quote.innerHTML = "";
//     author.innerHTML = "";
//     quote.innerText = data.quote;
//     author.innerText = data.author;
//   });

// function fetchRandomQuote() {
//   return fetch(API_URL);
// }

// let quote = document.querySelector("quote");

// const promise
// // let quote = {
// //   quote:
// //     "We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.",
// //   author: "Marie Curie",
// // };

// function render() {
//   quote.innerHTML = "";
//   quote.textContent = quote;
// }

// render();
// console.log(fetchRandomQuote());
//===================================================================
// fetch("https://dummy-apis.netlify.app/api/quote")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     document.body.append(document.createTextNode(data.quote));
//   });

// let quote = document.querySelector("#quote");
// let author = document.querySelector("#author");

// const quoteBtn = document.querySelector("#quote-btn");

// quoteBtn.addEventListener("click", () => fetch());
