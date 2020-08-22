import Moment from 'moment'
import * as d3 from 'd3'
import { getStartTimeInMinutes, isWeekend } from './time'

/*
Name: calculateEfficiency
Description: This function calculates the efficiency of the sleep by comparing time spent in bed to time spent asleep
*/
function calculateDuration(day) {
  const lengthScale = d3
    .scaleLinear()
    .domain([0, 359, 360, 480])
    .range([0, 0, 50, 100])

  lengthScale.clamp(true)
  const duration =
    day.asleepDuration > 0
      ? lengthScale(day.asleepDuration)
      : lengthScale(day.inBedDuration)

  return Math.round(duration)
}

/*
Name: calculateEfficiency
Description: This function calculates the efficiency of the sleep by comparing time spent in bed to time spent asleep
*/
function calculateEfficiency(day) {
  const efficiencyScale = d3.scaleLinear().domain([60, 0]).range([50, 100])
  efficiencyScale.clamp(true)

  if (
    day.inBedDuration &&
    day.asleepDuration &&
    day.inBedDuration !== 0 &&
    day.asleepDuration !== 0
  ) {
    const difference = Math.abs(day.inBedDuration - day.asleepDuration)
    return Math.round(efficiencyScale(difference))
  }

  return 50
}

/*
Name: calculateTiming
Description: This function calculates the efficiency of the sleep by comparing time spent in bed to time spent asleep
*/
function calculateTiming(day, insights) {
  if (!insights || !insights.goToSleepWindowCenter) return 0
  const goalTime = getStartTimeInMinutes(insights.goToSleepWindowCenter)

  const timingScale = d3.scaleLinear().domain([90, 0]).range([0, 100])
  timingScale.clamp(true)

  if (day.sleepStart) {
    const start = getStartTimeInMinutes(day.sleepStart)
    return Math.ceil(timingScale(Math.abs(start - goalTime)))
  }
  const start =
    Moment(day.bedStart).hours() * 60 + Moment(day.bedStart).minutes()
  const ceilValue = Math.ceil(timingScale(Math.abs(start - goalTime)))
  if (Number.isNaN(ceilValue)) {
    return 0
  }
  return ceilValue
}

/*
Name: calculateJetlag
Description: This function calculates the efficiency of the sleep by comparing time spent in bed to time spent asleep
*/
function calculateJetlag(day, insights) {
  if (!insights || !insights.weekendDayAverage || !insights.weekDayAverage) {
    return 0
  }

  const { weekDayAverage, weekendDayAverage } = insights

  const goalTime = isWeekend(day)
    ? getStartTimeInMinutes(weekendDayAverage)
    : getStartTimeInMinutes(weekDayAverage)

  const timingScale = d3.scaleLinear().domain([120, 0]).range([0, 100])
  timingScale.clamp(true)

  if (day.sleepStart) {
    const start = getStartTimeInMinutes(day.sleepStart)
    return Math.ceil(timingScale(Math.abs(start - goalTime)))
  }
  const start =
    Moment(day.bedStart).hours() * 60 + Moment(day.bedStart).minutes()
  const ceilValue = Math.ceil(timingScale(Math.abs(start - goalTime)))
  if (Number.isNaN(ceilValue)) {
    return 0
  }
  return ceilValue
}

/*
Name: calculateSubjective
Description: This function includes subjective to the calculation. User can have 100 points if the night is rated, otherwise zero
*/
function calculateSubjective(day) {
  if (day.rating) {
    return 100
  }
  return 0
}

function calculateAverage(item) {
  const w = {
    duration: 0.5,
    efficiency: 0.1,
    timing: 0.3,
    jetlag: 0.05,
    subjective: 0.05
  }

  const weightedAverage = Math.round(
    (item.duration * w.duration +
      item.efficiency * w.efficiency +
      item.timing * w.timing +
      item.jetlag * w.jetlag +
      item.subjective * w.subjective) /
      (w.duration + w.efficiency + w.timing + w.jetlag + w.subjective)
  )

  return { ...item, avgScore: weightedAverage }
}

export {
  calculateDuration,
  calculateEfficiency,
  calculateTiming,
  calculateJetlag,
  calculateSubjective,
  calculateAverage
}
