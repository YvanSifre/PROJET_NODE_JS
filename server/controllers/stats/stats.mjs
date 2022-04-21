import { client } from '../config/database.mjs'

/**
 * Cette fonction affiche tous les contacts
 */
const totalContact = () => {
  client.query(`select count(id) as nb from contact`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`Pas de contact`)
    }
    const res = result.rows[0].nb
    console.log("Total contact: ", res)
    return res
  })
}
/**
 * Cette fonction affiche toutes les listes
 */
const totalList = () => {
  client.query(`select count(id) as nb from list`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`Pas de liste`)
    }
    const res = result.rows[0].nb
    console.log("Total liste : ", res)
    return res
  })
}

/**
 * Cette fonction affiche le message le plus recent
 */
const mostRecentMessage = () => {
  client.query(`select id from message order by sentdate desc, senthour desc`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`Pas de message`)
    }
    const res = result.rows[0].id
    console.log("Dernier message envoyé (id): ", res)
    return res
  })
}

/**
 * Cette fonction affiche le nombre de message envoyé
 */
const nbSentMsg = () => {
  client.query(`select count(*) nb from message inner join state on idState = state.id where label = 'envoyé'`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`Pas de message`)
    }
    const res = result.rows[0].nb
    console.log("Nombre de message envoyés: ", res)
    return res
  })
}
/**
 * Cette fonction affiche le nombre de message envoyé par type
 */
const nbSentMsgBytype = () => {
  client.query(`select count(*), idList from message group by idModel`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`Pas de message`)
    }
    const res = result
    return res
  })
}

export { totalContact, totalList, mostRecentMessage, nbSentMsg, nbSentMsgBytype }
