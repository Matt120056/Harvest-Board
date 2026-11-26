# Applied Activity 5: Harvest Board (Individual)

**Name:** Matt Pheaton
**GitHub username:** Matt120056
**Repository URL:** https://github.com/Matt120056/Harvest-Board

> This report is my own individual work. I built my own repository, my own code and my own report.

---

## Mission 0: Set Up and Open the Case

```text
(git config --global -l)
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
user.name=Matt Pheaton
user.email=matthew.pheaton16@gmail.com
credential.helper=store
init.defaultbranch=main
```

```text
(git remote -v)
(base) ➜  harvest-board-starter git:(main) git remote -v
origin  https://github.com/Matt120056/Harvest-Board.git (fetch)
origin  https://github.com/Matt120056/Harvest-Board.git (push)
```

```text
(git log --oneline : 2 commits)
6f714c2 (HEAD -> feature/harvest-board, main) Add README for Harvest Board
65a758c (origin/main) First commit
```

- Issue #1: https://github.com/...

## Mission 1: The Live Item Finder

```text
(the finder part of script.js: cat script.js)

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



```

```text
(Console answers for each row of the test table: load, rice, CANNED, zzz, three spaces, my own item)
Type Rice: Expected: "1 items listed" and true. | Typed CANNED: Expected: "2 items listed" and true. | Typed zzz: Expected: "0 items listed" and false. | Type three spaces: Expected: "7 items listed" and true. | Typed yorkshire pudding: Expected: "1 items listed" and true.
```

```text
(git log --oneline)
ef57078 (HEAD -> feature/harvest-board) Add no results message and Enter key support
f4ff673 Add live item filtering
68c5d17 Add seventh food item and link finder script
6f714c2 (main) Add README for Harvest Board
65a758c (origin/main) First commit
```

**Explain (why does an empty search box show every item?):** An empty search box shows every item because an empty string matches every item name. Since there is nothing to search for, no items are filtered out and all seven remain visible.

**Checkpoint 1 (git log --oneline | wc -l, expect 5):**

(base) ➜  harvest-board-starter git:(feature/harvest-board) ✗ git log --oneline | wc -l
       5

## Mission 2: The Pledge Form

```text
(the donation part of script.js)
const donationForm = document.querySelector("#donation-form");
const donorName = document.querySelector("#donor-name");
const donationQty = document.querySelector("#donation-qty");
const donationMessage = document.querySelector("#donation-message");

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
```

```text
(options.length, and the #donation-message text after abc, 501 and 2.5)
Quantity must be a whole number from 1 to 500.
```

```text
(#donation-list text after my own pledge and after the <b>Ana</b> pledge)
Matt Pheaton: 12 x Yorkshire pudding<b>Ana</b>: 3 xYorkshire pudding
```

```text
(git log --oneline)

81b6a49 (HEAD -> feature/harvest-board) Finished script
8bf9476 Added donation script
ef57078 Add no results message and Enter key support
f4ff673 Add live item filtering
68c5d17 Add seventh food item and link finder script
6f714c2 (main) Add README for Harvest Board
65a758c (origin/main) First commit
```

**Explain (why trim() before checking the name, and why textContent and not innerHTML?):** Use trim() to remove extra spaces so someone cannot submit a name that only contains spaces. I use textContent instead of innerHTML to make sure names are displayed as plain text rather than being treated as HTML code.

**Checkpoint 2 (expect 7):**

```text
I indeed got 7
```

## Mission 3: Tick It Off and Count It

```text
(the tick box and tally part of script.js)
// Update both pledge tallies
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

// Start the tallies at zero
updateTallies();

// Create the pledge row
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

// Update the row and tallies when checked or unchecked
checkbox.addEventListener("change", function() {
  pledge.classList.toggle("done");
  updateTallies();
});

donationList.appendChild(pledge);
updateTallies();
```

```text
(#total-pledged and #received-count after tests 1, 2, 3 and 4)
T1
#total-pledged:
"Total pledged: 0 items"

#received-count:
"Received: 0 of 0 pledges"
T2
#total-pledged:
"Total pledged: 20 items"

#received-count:
"Received: 0 of 2 pledges"
T3
#total-pledged:
"Total pledged: 20 items"

#received-count:
"Received: 1 of 2 pledges"
T4
#total-pledged:
"Total pledged: 20 items"

#received-count:
"Received: 0 of 2 pledges"


```

```text
(git log --oneline)

00c05c6 (HEAD -> feature/harvest-board) Add pledge checkboxes and live tallies
81b6a49 Finished script
8bf9476 Added donation script
ef57078 Add no results message and Enter key support
f4ff673 Add live item filtering
68c5d17 Add seventh food item and link finder script
6f714c2 (main) Add README for Harvest Board
65a758c (origin/main) First commit
```

**Explain (why is the total a let while the element variables are const?):**
The total is a let because its value changes as pledges are added. The element variables are const because they always refer to the same HTML elements, even when the text inside those elements changes.

**Checkpoint 3 (expect 8):**

```text
(base) ➜  harvest-board-starter git:(feature/harvest-board) ✗ git log --oneline | wc -l 
       8
```

## Mission 4: Rescue the Sign-Up Page

**bug-report.md (paste the whole table):**

# Mission 4: Rescue the Sign-Up Page

| # | What I saw | Where I found it | Cause | Fix |
|---|---|---|---|---|
| 1 | The JavaScript could not find the volunteer form when the page loaded. | volunteer.html, line 7 | The script was loading before the HTML elements existed. | Moved the script tag to just before the closing body tag. |
| 2 | The volunteer counter crashed when trying to increase the number of sign-ups. | volunteer.js, line 12 | The filled variable was declared using const and could not be reassigned. | Changed const to let. |
| 3 | Entering `<b>Ana</b>` displayed the name as bold instead of plain text. | volunteer.js, line 16 | innerHTML interpreted the volunteer's name as HTML. | Replaced innerHTML with textContent. |
| 4 | An empty name was not correctly checked. | volunteer.js, line 23 | A single equals sign assigned a value instead of comparing it. | Changed = to ===. |
| 5 | The page reloaded after submitting the form and cleared the messages. | volunteer.js, line 20 | The default form submission was not prevented. | Added event.preventDefault(). |
| 6 | A sixth volunteer could register even when five spots were already filled. | volunteer.js, line 28 | The condition used > instead of >=. | Changed the condition to filled >= maxSpots. |


```text
(one red Console message I saw)
5 of 5 spots filled
```

**Breakpoint (one sentence: what did I see in the Scope panel, for example the values of filled and maxSpots, and what did it tell me?):**
When I paused at the spots limit condition and pressed F10, the Scope panel showed filled = 5 and maxSpots = 5. This confirmed that all five volunteer spots were taken and the sixth sign-up should be blocked.

```text
(#volunteer-count and #volunteer-list text after the final test)
Matt Pheaton (Driver)<b>Ana</b> (Sorter)Carter S (Greeter)Rishabh S (Sorter)REZA S (Driver)
```

```text
(git log --oneline)
b0cb28d (HEAD -> feature/harvest-board) Add Mission 4 volunteer bug report
bf4fbf7 Enforce five volunteer sign-up limit
12129af Prevent volunteer form page reload
8258ac5 Fix empty volunteer name validation
b0e2a71 Prevent HTML injection in volunteer names
e843305 Fix volunteer counter variable declaration
3c7d29b Fix volunteer page script loading order
00c05c6 Add pledge checkboxes and live tallies
81b6a49 Finished script
8bf9476 Added donation script
ef57078 Add no results message and Enter key support
f4ff673 Add live item filtering
68c5d17 Add seventh food item and link finder script
```

**Explain (which bug gave no red message, and how did I find it?):**
The empty-name validation bug gave no red Console message because the code used = instead of ===. I found it by testing the form with an empty name and inspecting the if condition in volunteer.js, where I noticed the incorrect comparison operator.

**Checkpoint 4 (expect 15):**

```text
(base) ➜  harvest-board-starter git:(feature/harvest-board) ✗ git log --oneline | wc -l   
      15
```

## Mission 5: Publish and Release

```text
(validator result for index.html and volunteer.html)
```

```text
(git push -u origin feature/harvest-board)
```

```text
(git log --oneline --graph | head, then git log --oneline | wc -l : expect 16)
```

- Repository: https://github.com/...
- Issue #1 (closed): https://github.com/...
- Merged Pull Request: https://github.com/...
- Release v1.0.0: https://github.com/...

**Explain (what did Closes #1 do?):**

**Explain (git pull is a shortcut for which two commands?):**

## Mission 6: Reflection

1. **Events (my own analogy):**
2. **Validation:**
3. **Reading errors:**
4. **Pick the right tool:** (a) ... (b) ... (c) ... (d) ... (e) ...
5. **Beyond class:**

## Bonus (optional): Level Up

```text
(challenge, code and Console proof)
```