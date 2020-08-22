import Moment from 'moment'
import { SleepClockState } from '../../Types/SleepClockState'

export const initialState: SleepClockState = {
  primarySleepTrackingSource: {
    sourceName: 'Nyxo',
    sourceId: 'app.sleepcircle.application'
  },
  bedTimeGoal: null,
  sleepTrackingSources: [],
  insights: {
    goToSleepWindow: '',
    goToSleepWindowStart: '',
    goToSleepWindowCenter: '',
    goToSleepWindowEnd: ''
  },
  startDate: Moment().toISOString(),
  healthKitEnabled: false,
  sleepDataUpdated: Moment().toISOString(),
  today: Moment().toISOString(),
  current_day: {},
  activeIndex: 6,
  selectedDay: {
    date: Moment().toISOString(),
    night: [],
    unfilteredNight: [],
    bedStart: '',
    bedEnd: '',
    sleepStart: '',
    sleepEnd: '',
    asleepDuration: 60,
    inBedDuration: 60
  },
  ratings: [],
  days: [],
  nights: [],
  selectedItem: null
}
