
const searchInput = document.querySelector("#item-search");
const items = document.querySelectorAll("#item-list li");
const itemCount = document.querySelector("#item-count");
const noItems = document.querySelector("#no-items");
const searchForm = document.querySelector("#item-search-form");

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
