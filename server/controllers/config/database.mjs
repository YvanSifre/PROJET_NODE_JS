/**
 * Fichier de connexion à la base de données ElephantSql
 */
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
var url = process.env.URL
const client = new pg.Pool({
  connectionString: url,
});

client.connect(function (err) {
  if (err) {
    return console.error('could not connect to postgres', err)
  }
})

export { client }
