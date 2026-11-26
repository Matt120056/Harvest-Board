
# Mission 4: Rescue the Sign-Up Page

| # | What I saw | Where I found it | Cause | Fix |
|---|---|---|---|---|
| 1 | The JavaScript could not find the volunteer form when the page loaded. | volunteer.html, line 7 | The script was loading before the HTML elements existed. | Moved the script tag to just before the closing body tag. |
| 2 | The volunteer counter crashed when trying to increase the number of sign-ups. | volunteer.js, line 12 | The filled variable was declared using const and could not be reassigned. | Changed const to let. |
| 3 | Entering `<b>Ana</b>` displayed the name as bold instead of plain text. | volunteer.js, line 16 | innerHTML interpreted the volunteer's name as HTML. | Replaced innerHTML with textContent. |
| 4 | An empty name was not correctly checked. | volunteer.js, line 23 | A single equals sign assigned a value instead of comparing it. | Changed = to ===. |
| 5 | The page reloaded after submitting the form and cleared the messages. | volunteer.js, line 20 | The default form submission was not prevented. | Added event.preventDefault(). |
| 6 | A sixth volunteer could register even when five spots were already filled. | volunteer.js, line 28 | The condition used > instead of >=. | Changed the condition to filled >= maxSpots. |
