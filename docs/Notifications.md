# Notifications in Nyxo

All notification processes will be rescheduled every 15 minutes by using react-native-background-fetch.

## Bedtime Window notification

- User is notified 15 minutes before their bedtime window

## Coaching Notifications

- Notification for reminding a user has an ongoing lesson
- notification for reminding a user has uncompleted lessons in the ongoing week

**Other notes:**

- The notification for reminding ongoing lesson applies to all lessons, which means if the user's ongoing week is week 1 but he/she is reading a lesson in week 3 and hasn't finished it yet, the app will fire a notification about that lesson.
- The notification for reminding uncompleted lessons in the ongoing week will stop notify when users finish all lessons in the week.

## Customer Support Notifications

Handled by intercom, currently we can't really affect these

## Important stuff

- Android version needs specific icons for each type of notifications.
- Must polish notifying texts so that they deliver meaningful and engaging messages.
