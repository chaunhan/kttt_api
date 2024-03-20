const bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")
async function hashPassword(plaintextPassword) {
  const hash = await bcrypt.hash(plaintextPassword, 10)
  return hash
}

// compare password
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash)
  return result
}

function generateToken(payload) {
    console.log("process.env.SECRET_KEY",process.env.SECRET_KEY)
const token = jwt.sign({data: {
...payload
}}, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE_TIME })
  return token
}
module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
}