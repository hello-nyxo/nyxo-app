# How Habits should work in Nyxo

- Users can perform CRUD (create, read, update, delete) operations on habits locally.
- When logging in, local habits will be synced using amplify mutations.
- The Habit syncing processes work like the way Git works at some points.

## Habit syncing process

Below are steps that describe how the app handles Habit-related processes.

### 1. Handling loggin process

- The local `habitState.habits` is always the source of truth for habits.
- User creates habits locally -> those habits are stored at `habitState.habits`.
- User logins with an account -> we detect if there are any changes between `habitState.habits` (1) and `habitState.subHabits` (2).
- If there are changes, prompt a dialog asking whether user wants to merge changes. If choosing <b>Yes</b>, detected local habits will
  be synced to the cloud and the app merges remote habits and local habits into one local habits stored in `habitState.habits`.
  The old local habits (1) will be copied to (2) to make sure the next time user logs out, the app will display a list of previously created habits. By using the copy method to `habitState.subHabits`, we can make sure the app hardly displays 0 habits (unless user intentionally deletes all local habits).
- If choosing <b>No</b>, `habitState.habits` will be loaded by the remote habits and the old local habits (1) will be transfered to
  `habitState.subHabits`.

### 2. Handling syncing process

- When logging in with an account, user can have his/her created habits saved into the cloud.
- There are 4 ways to perform Habit syncing processes: + Periodically every 15mins by using background fetch. + When user intentionally srolls the main screen to trigger refresh control in `main.tsx`. + When user logs out. + At "cold" starts
- Whenever a logged-in user performs a CRUD operation with a habit, the habit will be stashed into `habitState.unsyncedHabits`.
  Habits in `habitState.unsyncedHabits` are used to synced back to the cloud in the above processes. Any successfully synced habits will be
  removed from `habitState.unsyncedHabits` and any unsuccessfully synced habits will remain for the next syncing process.

## Use Cases Documentations & Manual Testings

### 1. Create a habit

- Navigate to "Sleep" screen (with sleep clocks).
- Click "+" button to open up the modal.
- Fill in "Title" field is mandatory. "Title" field must have at least 3 characters (not including whitespaces).
- The gray circle on the right side of each field indicates the total characters of that field. When the circle is fully coloured, it means the field can no more have any character.
- Choose "Time of day".
- Click "Create this habit" button to create. This step dispatches an action to Redux reducer to add the created habit to `habitState.habits`.
- In the "Sleep" screen, there should be the created habit.
- If the creating habit's title exists already, there will be a dialog informing that (trimmed title so that whitespaces make no difference).

- To save the habit for later use, click "Save" button. This button allows the habit's creating process to be saved and the modal will load all inputs when clicking "+" button again.

### 2. Edit a habit

- Click on the habit that you want to edit in the "Sleep" screen
- Bring up the editting modal.
- Under the top row of the modal, there should be a section containing information about the current day streak and the longest day streak of the habit.
- Edit the habit by adjusting "Title", "Description" and "Time of day" fields.
- Click "Save" to finish editting.
- In the "Sleep" screen, the habit should be updated with new data.

### 3. Delete a habit

- In the "Sleep" screen, swipe the wanted habit to the right to bring up "Delete" button.
- Hit the button and the habit should be gone.

### 4. Archive a habit

- In the "Sleep" screen, swipe the wanted habit to the right to bring up "Archive" button.
- Hit the button and the habit should be listed in "Archived" section when clicking "Show all" button.

### 5. Complete a habit

- In the "Sleep" screen, swipe the wanted habit to the left to bring up "Complete" button.
- Hit the button and the habit should be shown as completed.
- The habit's card title will be crossed and there will be a check mark indicating the habit's completion.
- When completing the habit, the value of its day streak will be incremented by 1, as well as the value of its longest day streak if in case, the day streak value is higher than the longest day streak value.

### 6. Uncomplete a habit

- Follow the procedure in <b>5</b> to reproduce the process.
- When uncompleting the habit, the value of its day streak will be decreased by 1. However, its longest streak value stays the same.

### 7. Handle syncing habits

- In the "Sleep" screen, when logged in, you can scroll the view down to bring up the loading indicator.
- The app will perform appropriate mutations of stashed unsynced habits in `habitState.unsyncedHabits`.
- After performing mutations, the app will then retrieve saved-on-cloud habits to ensure the case that an account can be logged at multiple different devices and the user performs habit CRUD operations on different devices as well. (considering using AWS Amplify Subscriptions?)
