import { createSelector } from 'reselect'
import Moment from 'moment'
import { State } from '../../Types/State'
import { MicroTaskState, MicroTask } from '../../Types/MicroTask'
import { Period } from '../../Types/State/Periods'

const getAllTasks = (state: State) => state.microtask
const today = Moment()

export const getMicrotasks = createSelector(
  getAllTasks,
  (microtaskState: MicroTaskState) => microtaskState.tasks
)

export const getCompletedCount = createSelector(
  getAllTasks,
  (microtaskState: MicroTaskState) =>
    microtaskState.tasks
      .map((task): number => {
        const microTaskStart = Moment(task.date).startOf('day')
        const difference = today.diff(microTaskStart, 'days')
        if (task.days[difference] !== 0) {
          return 1
        }
        return 0
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
)

export const getActiveTasks = createSelector(
  getMicrotasks,
  (tasks: MicroTask[]) => tasks.filter((item: MicroTask) => !item.archived)
)

export const getArchivedTasks = createSelector(
  getMicrotasks,
  (tasks: MicroTask[]) => tasks.filter((item: MicroTask) => item.archived)
)

export const getIncompleteTasksForToday = createSelector(
  getActiveTasks,
  (tasks) =>
    tasks.filter((task) => {
      const startDate = Moment(task.date).startOf('day')
      const difference = today.diff(startDate, 'days')
      return !task.days[difference]
    })
)

export const getMorningHabits = createSelector(
  getActiveTasks,
  (tasks: MicroTask[]) =>
    tasks.filter(
      (item: MicroTask) =>
        item.period.toLowerCase() === Period.morning.toLowerCase()
    )
)

export const getAfternoonHabits = createSelector(
  getActiveTasks,
  (tasks: MicroTask[]) =>
    tasks.filter(
      (item: MicroTask) =>
        item.period.toLowerCase() === Period.afternoon.toLowerCase()
    )
)

export const getEveningHabits = createSelector(
  getActiveTasks,
  (tasks: MicroTask[]) =>
    tasks.filter(
      (item: MicroTask) =>
        item.period.toLowerCase() === Period.evening.toLowerCase()
    )
)

export const getHabitSections = createSelector(
  getMorningHabits,
  getAfternoonHabits,
  getEveningHabits,
  (morning, afternoon, evening) => [
    { title: 'Morning', data: morning },
    { title: 'Afternoon', data: afternoon },
    { title: 'Evening', data: evening }
  ]
)
