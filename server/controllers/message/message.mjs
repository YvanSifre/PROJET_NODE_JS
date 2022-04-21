import { client } from '../config/database.mjs'

/**
 * Cette fonction permet de lire les informations d'un contact
 * @param id
 */
const loadMessageByid = (id) => {
  client.query(`select id, object, content, senddate, sentdate, sendhour, senthour, idstate, idlist, idmodel from message where id = ${id}`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`Pas de message`)
    }
    const res = result.rows[0]
    console.log(res)
    return res
  })
}
/**
 * Affiche tous les messages
 */
const loadMessage = () => {
  client.query(`select id, object, content, senddate, sentdate, sendhour, senthour, idstate, idlist, idmodel from message `, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`Pas de message`)
    }
    const res = result.rows
    console.log(res)
    return res
  })
}

/**
 * Cette fonction supprime un message
 * @param id
 */
const deleteMessage = (id) => {
  client.query(`delete from message where id = ${id}`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    console.log(`Message ${id} a bien été supprimé`)
  })
}

/**
 * Cette fonction crée un nouveau message
 * @param object Objet du message
 * @param content contenu du message
 * @param senddate date d'envoie
 * @param sentdate date envoyé
 * @param sendhour heure d'envoie
 * @param senthour heure envoyé
 * @param idstate id de l'etat du message 1:envoyé, 2: brouillon, 3: pret
 * @param idlist id liste
 * @param idmodel id du model
 */
const createMessage = (object, content, senddate, sentdate, sendhour, senthour, idstate, idlist, idmodel) => {
  client.query(`insert into message values (DEFAULT, '${object}', '${content}', '${senddate}', '${sentdate}','${sendhour}', '${senthour}', ${idstate}, ${idlist}, ${idmodel})`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error("Le message n'a pas pu etre creer.")
    }
    console.log(`Le message a bien été crée`)
  })
}

/**
 * Cette fonction modifie le contenu d'un message
 * @param id id du message a modifier
 * @param content contenu du message
 */
const updateMessage = (id, content) => {
  client.query(`update message set content = '${content}' where id = ${id}`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`Le mssage ${id} n'existe pas`)
    }
    console.log(`Contenu du message ${id} modifié avec succes`)
  })
}

/**
 * Affiche les id de message dont l'etat est 'pret'
 */
const isReadyToSend = () => {
  client.query(`select message.id from message inner join state on idState = state.id where state.label = 'pret'`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error("Pas de message prêt à être envoyé.")
    }
    console.log(`Id de messages prêt a être envoyé: `)
    console.log(result.rows)
    return result.rows
  })
}

export { loadMessageByid, deleteMessage, loadMessage, createMessage, updateMessage, isReadyToSend }
