export const hashCode = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

export const intToRGB = (integer: number): string => {
  // eslint-disable-next-line no-bitwise
  const c = (integer & 0x00ffffff).toString(16).toUpperCase()
  return '#00000'.substring(1, 6 - c.length) + c
}

export const stringToColor = (str: string): string => {
  return intToRGB(hashCode(str))
}
