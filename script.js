
const searchInput = document.querySelector("#item-search");
const items = document.querySelectorAll("#item-list li");
const itemCount = document.querySelector("#item-count");
const noItems = document.querySelector("#no-items");
const searchForm = document.querySelector("#item-search-form");
const donationForm = document.querySelector("#donation-form");
const donorName = document.querySelector("#donor-name");
const donationQty = document.querySelector("#donation-qty");
const donationMessage = document.querySelector("#donation-message");

function filterItems() {
  let search = searchInput.value.toLowerCase(); 
  let count = 0;

  items.forEach(function(item) {
    let name = item.querySelector("h3").textContent.toLowerCase();

    if (name.includes(search)) {
      item.classList.remove("hidden");
      count++;
    } else {
      item.classList.add("hidden");
    }
  });

  itemCount.textContent = count + " items listed";

  if (count === 0) {
    noItems.classList.remove("hidden");
  } else {
    noItems.classList.add("hidden");
  }
}

searchInput.addEventListener("input", filterItems);

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  filterItems();
});


const donationItem = document.querySelector("#donation-item");

items.forEach(function(item) {
  let option = document.createElement("option");
  option.textContent = item.querySelector("h3").textContent;
  donationItem.appendChild(option);
});

donationForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let name = donorName.value.trim();
  let quantityText = donationQty.value.trim();
  let quantity = Number(quantityText);

  if (name === "") {
    donationMessage.textContent = "Please type your name.";
  } else if (quantityText === "") {
    donationMessage.textContent = "Please type a quantity.";
  } else if (!Number.isInteger(quantity) || quantity < 1 || quantity > 500) {
    donationMessage.textContent = "Quantity must be a whole number from 1 to 500.";
  } else {
    donationMessage.textContent = "";

    let pledge = document.createElement("li");
    pledge.textContent = name + ": " + quantity + " x " + donationItem.value;

    const donationList = document.querySelector("#donation-list");
    donationList.appendChild(pledge);

    donorName.value = "";
    donationQty.value = "";
    donorName.focus();
  }
});

