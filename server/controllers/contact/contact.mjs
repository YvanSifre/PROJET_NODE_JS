import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
var url = process.env.URL
var client = new pg.Client(url);

/**
 * Cette fonction permet de lire les informations d'un contact
 * @param id 
 */
const loadContact = (id) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`select name, firstname, mail, creationdate from contact where id = ${id}`, function (err, result) {
            if (err) {
                return console.error('error running query', err)
            }
            console.log(result.rows[0])
            const res = result.rows[0]
            client.end()
            return res
        })
    })
}

export { loadContact }