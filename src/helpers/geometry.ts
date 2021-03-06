import { getHours, getMinutes } from 'date-fns'
import { to12hClock } from './time'

export function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

export function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  let largeArcFlag = '0'
  if (endAngle >= startAngle) {
    largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  } else {
    largeArcFlag = endAngle + 360.0 - startAngle <= 180 ? '0' : '1'
  }

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(' ')

  return d
}

export function describeReverseArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(x, y, radius, startAngle)
  const end = polarToCartesian(x, y, radius, endAngle)

  let largeArcFlag = '0'
  if (endAngle >= startAngle) {
    largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
  } else {
    largeArcFlag = endAngle + 360.0 - startAngle <= 180 ? '0' : '1'
  }

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    1,
    largeArcFlag,
    1,
    end.x,
    end.y
  ].join(' ')

  return d
}

export function clockTimeToAngle(ISOStringDate?: string): number {
  const time = new Date(ISOStringDate ?? new Date())
  const angle =
    ((to12hClock(getHours(time)) + getMinutes(time) / 60) / 12) * 360

  return angle
}

export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI
}

export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}
