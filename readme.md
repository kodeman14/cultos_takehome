# CULTOS TAKEHOME FRONTEND TEST

## Tech Stack
- [x] Vue3 (+ Options)
- [x] Pinia (store mgmt)
- [x] ElementUI Plus
- [x] Tailwind CSS
- [x] Font Awesome Icons
- [x] Axios / Vue Axios
- [ ] Moment / Lodash

* [Link to Trello Board for project management](https://trello.com/b/dtFLkneN)
* [Link to screenshots hosted on Github Repo](https://github.com/kodeman14/cultos_takehome/tree/master/screenshots)

## Project Run

1. BACKEND
  - cd frontend
  - npm install
  - npm run serve
  - localhost:1938
2. FRONTEND
  - cd frontend
  - npm install
  - npm run dev
  - localhost:5173

---

## Assignment

### Task 1 + 2 (DESIGN)
- [x] create activity page
- [x] closely mimic screenshots
- [x] query list using post
- [x] display platform icons
- [x] add prefix description
- [x] add up totals for points
- [x] style the modal and table

### Task 3 (MODAL)
- [x] add create activity button
- [x] on button click, modal should appear
- [x] form elements appearing on modal
- [x] add cancel/submit buttons
- [x] on cancel (or x), close modal
- [x] on submit, post data to api
- [x] modal should close, table updated
- [x] refresh page to see new created row

### Task 4 (ACTIONS)
- [x] edit should populate data to edit row
- [x] confirm edit should update data locally
- [x] refresh page to see default state of data
- [x] delete should remove the row locally
- [x] refresh page to see deleted row again
- [x] calculate points on edit/delete actions

### Bonus Objectives
- [x] confirm button on delete
- [x] add gradient to points earned
- [x] row color should change on hover
- [x] mobile view with date column hidden

---

## Extra Features
- [x] create translations and constants file
- [x] implement error checking on empty form
- [x] validation rules added on modal inputs
- [x] snackbar to indicate status on updates
- [x] pagination for data with customization
- [x] show 'n/a' for points if no data exists
- [x] allow column sorting on date and points
- [x] modify column names for easy readability
- [x] indicate empty box when table not loaded
- [x] min/max caps placed on details and points
- [x] create mock data on backend for easy demo
- [x] scrollbar on table view to keep height same
- [x] repo has branching strategy and task readme
- [x] login status persisted through local storage
- [x] filtering activity based on platform or type
- [x] routing with error (404) and login/hello page
- [x] implement loading animation for display table
- [x] top header navigation added with logout button
- [x] can only access protected pages after logged in

---

## Challenges Faced
- Styling around the modal and table rows was a bit complex, had to access through specificity
- Pagination was an interesting problem to deal with, due to having to emit size back to parent
- Clearing modal inputs after editing row and then creating row had to be brute forced to empty
- Showing an empty box when server not responding was difficult due to data not being populated
- Componentizing everything has opposed to single view in app file took a lot of time and effort
- Deleting the very last row would cause a data error, needed to make sure table length was reset

## Unresolved Issues
- Unable to click on row to edit due to an existing problem with `setCurrent` and `clearSelection`
- Filtering activity based on *Platform AND Type* is not possible as filter only accepts one argument
- Loading animation is a bit finicky since data is fetched as the same time, so needs to be improved
- Adding skeleton view with pre-loading data seemed to be taking a while, it will be picked up later

* can talk about these points in call

---

## Future Ideas
- logout and avatar buttons on app top header
- implement rewards system (work in progress)
- archiving activity (older than 6 months)
- profanity filter for text input on modal
- skeleton structure for delay in data display
