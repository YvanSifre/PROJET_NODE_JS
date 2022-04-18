import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
var url = process.env.URL
var client = new pg.Client(url);

/**
 * Cette fonction permet de lire les informations d'un contact
 * @param id
 */
const loadState = (id) => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
    client.query(`select id, object, content, senddate, sentdate, sendhour, senthour, idstate, idlist, idmodel from message where id = ${id}`, function (err, result) {
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
const deleteMessage = (id) => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
    client.query(`delete from message where id = ${id}`, function (err, result) {
      if (err) {
        return console.error('error running query', err)
      }
      console.log(result.rows[0])
      console.log(`Message ${id} a bien été supprimé`)
    })
  })
}




export { loadMessageByid, deleteMessage }
