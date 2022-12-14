# Frontend Engineer Test

Your task is to create a single interactive page [My Activity Page] using Web2 technologies. The purpose of the page is to test your ability to understand how to get a crud framework up and running. A backend server will be given to you to be able to assist you in the CRUD elements of this task.

NOTE: Your implementation MUST be written in JavaScript -- not TypeScript!

## Libraries:
- Vue3 (Options API)
- ElementUI Plus
- Tailwind
- FontAwesome
- Axios/Moment
- Lodash

## Framework Requirements:
- Create framework/Install libraries
- npm run serve should bring up your My Activity Page on port 4040
- You cannot use TypeScript; you have to use regular JS

## Page Requirements:

### Task 1:
- Create My Activity Page based on the provided screenshot
- It should closely mimic the look of the screenshot

### Task 2: (Use Axios) - On page load
- query using [POST] to /api/MyActivity/list to populate the table
- You will receive the following data to populate the table
	```
	[{
		"id":"1",
		"description":"Sharing Post",
		"socialPlatform":"Instagram",
		"socialType":"Liked",
		"pointsEarned":"",
		"date":""
	}, {
		"id":"2",
		"description":"Sharing Liked",
		"socialPlatform":"Facebook",
		"socialType":"Shared",
		"pointsEarned":"",
		"date":""
	}]
	```
- The icons should display platform icon (fontAwesome) based on the socialPlatform data
- socialPlatform - Options: ['Instagram', 'Facebook', 'Twitter']
- socialType - Options: ['Liked', 'Shared', 'Post']

### Task 3: (Use Element UI Component i.e Button/Modal etc)
- Add a [Create activity] button as shown in the screenshot
- On button click, a modal should appear to create an activity
- The following elements should appear in the modal:
- Description [Input Text]
- Social Platform [Select Dropdown] (options: Facebook, Instagram, Twitter)
- Social Type [Select Dropdown] (options: Liked, Shared, Post)
- Points Earned [Input Number Component]
- Add Cancel/Submit buttons
	- On Cancel (Close modal)
	- On Submit
		- Use /api/MyActivity/create [POST]
		- Use the following JSON structure to post your data

			```
			{
				"description":"",
				"socialPlatform":"",
				"socialType":"",
				"pointsEarned":"",
				"date":""
			}
			```
		- Modal should close, and the table should be updated dynamically
- If I refresh the page the newly created row should still be visible
- Style the modal

### Task 4: (Edit/Delete functionality)
- On *Edit*:
	- It should populate the modal to edit the row
	- On Submit it should update the data on the row using array/object manipulation
	- If I refresh the page the edited row should return to the default state
- On *Delete*:
	- It should delete the row using array/object manipulation
	- If I refresh the page the deleted row should re-appear

## Bonus:
- Confirm button on delete
- Gradient on points earned
- The row color should change when you hover over the row.
- Mobile View [Hide date column in mobile view]
