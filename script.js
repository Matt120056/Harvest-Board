
const searchInput = document.querySelector("#item-search");
const items = document.querySelectorAll("#item-list li");
const itemCount = document.querySelector("#item-count");
const noItems = document.querySelector("#no-items");
const searchForm = document.querySelector("#item-search-form");

const donationForm = document.querySelector("#donation-form");
const donorName = document.querySelector("#donor-name");
const donationQty = document.querySelector("#donation-qty");
const donationMessage = document.querySelector("#donation-message");
const donationList = document.querySelector("#donation-list");
const totalPledged = document.querySelector("#total-pledged");
const receivedCount = document.querySelector("#received-count");
const donationItem = document.querySelector("#donation-item");

function filterItems() {
  let search = searchInput.value.trim().toLowerCase();
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

items.forEach(function(item) {
  let option = document.createElement("option");
  option.textContent = item.querySelector("h3").textContent;
  donationItem.appendChild(option);
});

function updateTallies() {
  let total = 0;
  let received = 0;

  const pledges = donationList.querySelectorAll("li");

  pledges.forEach(function(pledge) {
    total += Number(pledge.dataset.quantity);

    if (pledge.classList.contains("done")) {
      received++;
    }
  });

  totalPledged.textContent = "Total pledged: " + total + " items";
  receivedCount.textContent = "Received: " + received + " of " + pledges.length + " pledges";
}

updateTallies();

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
    pledge.dataset.quantity = quantity;

    let label = document.createElement("label");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let pledgeText = document.createElement("span");
    pledgeText.textContent = name + ": " + quantity + " x " + donationItem.value;

    label.appendChild(checkbox);
    label.appendChild(pledgeText);
    pledge.appendChild(label);

    checkbox.addEventListener("change", function() {
      pledge.classList.toggle("done");
      updateTallies();
    });

    donationList.appendChild(pledge);

    updateTallies();

    donorName.value = "";
    donationQty.value = "";
    donorName.focus();
  }
});
