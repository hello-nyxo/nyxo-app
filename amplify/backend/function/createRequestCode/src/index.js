const Hashids = require("hashids/cjs")

exports.handler = async (event) => {
  const { code: payload } = event.arguments.input
  const hash = process.env.hash
  const min = process.env.min
  const max = process.env.max
  const code = createCode(payload || "NX", new Date(), { hash, min, max })

  return { code }
}

const createCode = (coachID, date, { hash, min, max }) => {
  const hashids = new Hashids(
    hash,
    2,
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
  )
  console.log(hash, min, max)
  const key = getKey(parseInt(min), parseInt(max))
  return `${coachID}${hashids.encode(date.getTime())}${hashids.encode(key)}`
}

const getKey = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}
