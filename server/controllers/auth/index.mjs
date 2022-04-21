import jwt from 'jsonwebtoken'
import fs from 'fs'

/**
 * GENERE LE TOKEN
 * @param {*} data
 * @returns
 */
const generateAccessToken = (data) => {
  if (!data) return null

  delete data.password
  return jwt.sign(data, process.env.TOKEN, { expiresIn: '24h' })
}

/**
 * TENTE L'AUTHENTIFICATION
 * @param {string} user
 * @param {string} password
 */
const auth = (name, password) => {
  const file = fs.readFileSync('./controllers/auth/users.json', 'utf8')
  const users = JSON.parse(file)

  const user = users.find((e) => e.name === name && e.password === password)

  return generateAccessToken(user)
}

export { auth }
