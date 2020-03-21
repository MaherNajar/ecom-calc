var costElem = getById("cost");
var sellElem = getById("sell");
var profitElem = getById("profit");
var rateElem = getById("rate");
var productElem = getById("product");

function getById(id) {
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {
  initialize();

  costElem.addEventListener("input", () => {
    chrome.storage.sync.set({ cost: costElem.value }, () => {
      calculateProfit();
    });
  });

  sellElem.addEventListener("input", () => {
    chrome.storage.sync.set({ sell: sellElem.value }, () => {
      calculateProfit();
    });
  });

  productElem.addEventListener("click", () => {
    let url = productElem.getAttribute("href");
    chrome.tabs.create({ url });
  });
});

function initialize() {
  chrome.storage.sync.get("cost", ({ cost }) => {
    costElem.value = !cost ? 0 : cost;
  });
  chrome.storage.sync.get("sell", ({ sell }) => {
    sellElem.value = !sell ? 0 : sell;
  });
  calculateProfit();
}

function calculateProfit() {
  chrome.storage.sync.get("fees", ({ fees }) => {
    let cost = costElem.value;
    let sell = sellElem.value;

    let ebay = sell * fees.ebay;
    let paypal = sell * fees.paypal;
    let profit = Math.round(sell - cost - ebay - paypal);

    profitElem.innerText = profit;
    rateElem.innerText = Math.round((profit / sell) * 100);
  });
}
