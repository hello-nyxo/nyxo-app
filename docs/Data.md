## Thoughs on offline usage

I would like to say that Nyxo is an offline first app. However after year of running it so and constantly struggling with keeping offline and online functionalities in sync, I've come to the conclusion that Nyxo should be "online first, with great offline experience". Back in the day when we only had iOS and HealthKit to work with the choice was simple, as HealthKit only exists on the device and is always available offline. However after integrating all the current different sleep trackers, which are all REST APIs it seems stupid to focus on offline first, as offline first would also mean that no data is fetched.

## Thoughs on online usage

When user is logged in data should be stored in Nyxo Cloud, but also available when offline. Previously this was accomplished with a combination of redux, redux-persist and redux thunk. However this approach creates quite a lot of boilerplate and makes the code overall quite difficult to read and upkeep.

## React Query

After thoroughly going through React Query's documentation, I've decided that using it would allow us to build a data fetching logic that is a lot better that what we currently have. My plan is to move

The building blocks of the offline experience will be:

- React Query

  - useQuery on fetching sleep data, fetching stored habits, fetching ratings, fetching coaching data
  - useMutation on storing ratings, storing habits, storing coaching data.

- React native async storage
  - persisting React query cache using async storage
  - local "backend" meaning that when the logic to mutating data locally and remotely is the same, only the endpoint changes
