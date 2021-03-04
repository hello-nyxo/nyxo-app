declare module 'react-native-healthkit' {
  export interface HealthKitPermissions {
    permissions: {
      read: string[]
      write: string[]
    }
  }

  export interface AppleHealthKit {
    initHealthKit(
      permissions: HealthKitPermissions,
      callback: (error: string, result: unknown) => void
    ): void
    isAvailable(callback: (error: unknown, results: boolean) => void): void
    getSleepSamples(
      options: unknown,
      callback: (err: string, results: Array<SleepSample>) => void
    ): void
    saveSleep(
      options: unknown,
      callback: (err: string, results: Array<SleepSample>) => void
    ): void
    getActiveEnergyBurned(
      options: unknown,
      callback: (err: string, results: Array<unknown>) => void
    ): void
    Constants: {
      Permissions: PermissionUnit
    }
  }

  export interface Permission {
    permission: PermissionUnit
  }

  export enum PermissionUnit {
    ActiveEnergyBurned = 'ActiveEnergyBurned',
    AppleExerciseTime = 'AppleExerciseTime',
    BasalEnergyBurned = 'BasalEnergyBurned',
    BiologicalSex = 'BiologicalSex',
    BloodGlucose = 'BloodGlucose',
    BloodPressureDiastolic = 'BloodPressureDiastolic',
    BloodPressureSystolic = 'BloodPressureSystolic',
    BodyFatPercentage = 'BodyFatPercentage',
    BodyMass = 'BodyMass',
    BodyMassIndex = 'BodyMassIndex',
    BodyTemperature = 'BodyTemperature',
    DateOfBirth = 'DateOfBirth',
    Biotin = 'Biotin',
    Caffeine = 'Caffeine',
    Calcium = 'Calcium',
    Carbohydrates = 'Carbohydrates',
    Chloride = 'Chloride',
    Cholesterol = 'Cholesterol',
    Copper = 'Copper',
    EnergyConsumed = 'EnergyConsumed',
    FatMonounsaturated = 'FatMonounsaturated',
    FatPolyunsaturated = 'FatPolyunsaturated',
    FatSaturated = 'FatSaturated',
    FatTotal = 'FatTotal',
    Fiber = 'Fiber',
    Folate = 'Folate',
    Iodine = 'Iodine',
    Iron = 'Iron',
    Magnesium = 'Magnesium',
    Manganese = 'Manganese',
    Molybdenum = 'Molybdenum',
    Niacin = 'Niacin',
    PantothenicAcid = 'PantothenicAcid',
    Phosphorus = 'Phosphorus',
    Potassium = 'Potassium',
    Protein = 'Protein',
    Riboflavin = 'Riboflavin',
    Selenium = 'Selenium',
    Sodium = 'Sodium',
    Sugar = 'Sugar',
    Thiamin = 'Thiamin',
    VitaminA = 'VitaminA',
    VitaminB12 = 'VitaminB12',
    VitaminB6 = 'VitaminB6',
    VitaminC = 'VitaminC',
    VitaminD = 'VitaminD',
    VitaminE = 'VitaminE',
    VitaminK = 'VitaminK',
    Zinc = 'Zinc',
    Water = 'Water',
    DistanceCycling = 'DistanceCycling',
    DistanceSwimming = 'DistanceSwimming',
    DistanceWalkingRunning = 'DistanceWalkingRunning',
    FlightsClimbed = 'FlightsClimbed',
    HeartRate = 'HeartRate',
    Height = 'Height',
    LeanBodyMass = 'LeanBodyMass',
    MindfulSession = 'MindfulSession',
    NikeFuel = 'NikeFuel',
    RespiratoryRate = 'RespiratoryRate',
    SleepAnalysis = 'SleepAnalysis',
    StepCount = 'StepCount',
    Steps = 'Steps',
    Weight = 'Weight',
    Workout = 'Workout',
    HeartRate = 'HeartRate',
    ActiveEnergyBurned = 'ActiveEnergyBurned',
    SleepAnalysis = 'SleepAnalysis'
  }

  export type SleepSample = {
    startDate: string
    endDate: string
    sourceId: string
    sourceName: string
  }

  export interface HealthUnitOptions {
    unit: HealthUnit
  }
  export enum HealthUnit {
    bpm = 'bpm',
    calorie = 'calorie',
    celsius = 'celsius',
    count = 'count',
    day = 'day',
    fahrenheit = 'fahrenheit',
    foot = 'foot',
    gram = 'gram',
    hour = 'hour',
    inch = 'inch',
    joule = 'joule',
    meter = 'meter',
    mgPerdL = 'mgPerdL',
    mile = 'mile',
    minute = 'minute',
    mmhg = 'mmhg',
    mmolPerL = 'mmolPerL',
    percent = 'percent',
    pound = 'pound',
    second = 'second'
  }

  const appleHealthKit: AppleHealthKit
  export default appleHealthKit
}
