const colors = {
  darkBlue: '#2c0b8e',

  tangerine: '#fe851e',
  white: '#ffffff',
  black: '#444',
  gray: '#d8d8d8',
  gray2: '#868b96',
  gray3: '#f8f8f8',
  red: '#FF4A6E',
  blue: '#0d0b8c',
  green: '#34a795',
  yellow: '#FEC712',
  yellow2: '#F1A342',

  color1: '#A8D1D3',

  color2: '#515A9F',
  color3: '#DD956E',
  color3Transparent: 'rgba(221,149,110, 0.3)',
  color4: '#94BB6C',
  accentRed: '#D0021B',

  inBedColor: '#7552ef',
  inBedTransparent: 'rgba(81, 90, 159,0.2)',
  asleepColor: '#4a5aef', // '#238bcd', // was  DD956E
  primaryGray: '#FAFAFA',
  bedTimeColor: '#4aefd5',
  darkBlueTransparent: 'rgba(74, 90, 239, 0.3)',
  darkBlueTransparent1: 'rgba(74, 90, 239, 0.5)',
  darkBlueTransparent2: 'rgba(74, 90, 239, 0.95)',
  darkBlueShadow: '#4A5AEF',
  shadowColor: 'rgba(152, 152, 152, 0.5)',

  // new ui colors:
  textDark: '#363A48',
  backgroundGray: '#F1F2F3',
  textGray: '#C8C9CC',

  fallAsleep: '#4aefd5',
  wakeUp: '#DD956E',

  morning: '#FFECF2',
  morningAccent: '#F42D97',
  afternoon: '#E8F0FF',
  afternoonAccent: '#2E79FD',
  evening: '#E8E9F3',
  eveningAccent: '#2C3199',
  night: '#979DCA',
  nightAccent: '#515A9F',

  neutralBlue: '#345ca7',
  neutralGreen: '#34a795'
}

export default colors

export const colorPairs = {
  // In bed color, used to enchance connection to in bed variable
  inBed: colors.darkBlue,
  inBedBg: colors.darkBlue,
  // Asleep color, used to enchance connection to asleep variable
  asleep: colors.asleepColor,
  asleepBg: colors.asleepColor,
  // Sleep window:
  sleepWindow: colors.bedTimeColor,
  sleepWindowBg: colors.bedTimeColor,
  fallAsleep: colors.fallAsleep,
  fallAsleepBg: colors.fallAsleep,
  wakeUp: colors.wakeUp,
  wakeUpBg: colors.wakeUp
}

export const orderedColor = ['']
