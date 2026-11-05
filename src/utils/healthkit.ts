import Healthkit, {
  HKCategoryTypeIdentifier,
  HKCategoryValueSleepAnalysis,
  HKQuantityTypeIdentifier,
  HKUnits,
  HKWeatherCondition,
  HKWorkoutActivityType,
} from '@kingstinct/react-native-healthkit';
import {
  addHours,
  addMinutes,
  hoursToMinutes,
  startOfDay,
  subDays,
  subHours,
  subMinutes,
} from 'date-fns';

export const createHeartRate = async (date: string) => {
  const daysToSave = 14; // save HR samples for only 4 days
  const numberOfSamples = hoursToMinutes(24) * daysToSave; // save for every minute
  const startDate = subMinutes(new Date(date), numberOfSamples);

  // logic: HR can  be between 40 and 180 but never 10 higher or lower than the previousHR
  const maxPulse = 180;
  const minPulse = 40;
  const maxIncrement = 10;
  let previousHR = 60;
  let newMaxHR = 40;
  let newMinHR = 180;

  for (let i = 0; i < numberOfSamples; i++) {
    newMaxHR =
      previousHR + maxIncrement > maxPulse
        ? previousHR - maxIncrement
        : previousHR + maxIncrement;
    newMinHR =
      previousHR - maxIncrement < minPulse
        ? previousHR + maxIncrement
        : previousHR - maxIncrement;

    newMaxHR = newMaxHR === newMinHR ? newMaxHR + 10 : newMaxHR;

    const randomPulse = Math.floor(
      Math.random() * (newMaxHR - newMinHR + 1) + newMinHR,
    );
    previousHR = randomPulse;

    await Healthkit.saveQuantitySample(
      HKQuantityTypeIdentifier.heartRate,
      'count/s',
      randomPulse / 60, // HK accepts frequency for HR so divided HR by 60 minutes
      {
        start: addMinutes(startDate, i),
      },
    );
  }
};

export const createSteps = async (date: string) => {
  const days = 14;
  const minSteps = 1000;
  const maxSteps = 14000;

  for (let i = 0; i < days; i++) {
    const steps = Math.random() * (maxSteps - minSteps) + minSteps;

    const start = subDays(new Date(date), i);

    await Healthkit.saveQuantitySample(
      HKQuantityTypeIdentifier.stepCount,
      HKUnits.Count,
      steps,
      {start},
    );
  }
};

export const createSleep = async (date: string) => {
  const days = 14;
  const minDuration = 2; // hours
  const maxDuration = 14; // hours

  for (let i = 0; i < days; i++) {
    const durationHours =
      Math.random() * (maxDuration - minDuration) + minDuration;

    const start = subHours(
      startOfDay(subDays(new Date(date), i)),
      Math.round(durationHours / 3),
    );

    await Healthkit.saveCategorySample(
      HKCategoryTypeIdentifier.sleepAnalysis,
      HKCategoryValueSleepAnalysis.inBed,
      {
        start,
        end: addHours(start, durationHours),
      },
    );

    await Healthkit.saveCategorySample(
      HKCategoryTypeIdentifier.sleepAnalysis,
      HKCategoryValueSleepAnalysis.asleepCore,
      {
        start: addHours(start, 1),
        end: subHours(addHours(start, durationHours), 1),
      },
    );
  }
};

export const createWorkouts = (date: string) => {
  const days = 1;

  for (let i = 0; i < days; i++) {
    const randomWorkoutIndex = Math.floor(
      Math.random() * Object.keys(HKWorkoutActivityType).length,
    );
    const start = subDays(new Date(date), i);
    Healthkit.saveWorkoutSample(randomWorkoutIndex, [], start, {
      end: addHours(start, 1),
      metadata: {
        HKWeatherCondition: HKWeatherCondition.hail,
      },
    });
  }
};
