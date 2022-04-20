import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
var url = process.env.URL
var client = new pg.Client(url);

const totalContact = () => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
    client.query(`select count(id) as nb from contact`, function (err, result) {
      if (err) {
        return console.error('error running query', err)
      }
      if (result.rowCount == 0) {
        return console.error(`Pas de contact`)
      }
      const res = result.rows[0].nb
      console.log("Total contact: ", res)
      client.end()
      return res
    })
  })
}
const totalList = () => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
    client.query(`select count(id) as nb from list`, function (err, result) {
      if (err) {
        return console.error('error running query', err)
      }
      if (result.rowCount == 0) {
        return console.error(`Pas de liste`)
      }
      const res = result.rows[0].nb
      console.log("Total liste : ", res)
      client.end()
      return res
    })
  })
}
const mostRecentMessage = () => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
    client.query(`select id from message order by sentdate desc, senthour desc`, function (err, result) {
      if (err) {
        return console.error('error running query', err)
      }
      if (result.rowCount == 0) {
        return console.error(`Pas de message`)
      }
      const res = result.rows[0].id
      console.log("Dernier message envoyé (id): ", res)
      client.end()
      return res
    })
  })
}

const nbSentMsg = () => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
    client.query(`select count(*) nb from message inner join state on idState = state.id where label = 'envoyé'`, function (err, result) {
      if (err) {
        return console.error('error running query', err)
      }
      if (result.rowCount == 0) {
        return console.error(`Pas de message`)
      }
      const res = result.rows[0].nb
      console.log("Nombre de message envoyés: ", res)
      client.end()
      return res
    })
  })
}
//select count(*), name from contact group by name
const nbSentMsgBytype = () => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
    client.query(`select count(*), idList from message group by idList`, function (err, result) {
      if (err) {
        return console.error('error running query', err)
      }
      if (result.rowCount == 0) {
        return console.error(`Pas de message`)
      }
      const res = result
      client.end()
      return res
    })
  })
}

export { totalContact, totalList, mostRecentMessage, nbSentMsg, nbSentMsgBytype }
