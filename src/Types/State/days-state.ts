import { Day, Night } from '../Sleepdata'

export interface DaysState {
  days: Day[]
  nights?: Night[]
  loading: boolean
}
