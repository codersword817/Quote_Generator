const API_URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
let quotes = [];
const btn = document.querySelector(".generate-btn");
const tweet_btn = document.querySelector(".tweet-btn");
const quote_container = document.querySelector(".quote-container");
const quote_text = document.querySelector("#quote");
const author = document.querySelector("#author");
const loader = document.querySelector(".loader");
const fetchQuotesData = async () => {
  showLoadingSpinner();
  try {
    const data = await fetch(API_URL);
    let jsonData = await data.json();
    quotes = jsonData;
    getRandomQuote();
  } catch (err) {
    console.log(err);
  }
};

fetchQuotesData();

function showLoadingSpinner() {
  loader.hidden = false;
  quote_container.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quote_container.hidden = false;
}

function getRandomQuote() {
  showLoadingSpinner();
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  if (quote.text.length < 120) {
    quote_text.classList.add("long-text");
  } else {
    quote_text.classList.remove("long-text");
  }
  quote_text.innerHTML = quote?.text;
  author.innerHTML = quote?.author;
  removeLoadingSpinner();
}

function getTweet() {
  const twitterURL = `https://x.com/intent/post?text=${quote_text.innerHTML} - ${author.innerHTML}`;
  window.open(twitterURL, "_blank");
}

btn.addEventListener("click", getRandomQuote);
tweet_btn.addEventListener("click", getTweet);
