import { client } from '../config/database.mjs'

/**
 * Cette fonction affiche tous les etats
 */
const loadState = () => {
  client.query(`select id, label from state `, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`Il n'existe pas d'état`)
    }
    console.log(result.rows)
    const res = result.rows
    return res
  })
}
/**
 * Cette fonction permet d'afficher le label d'un état de message
 * @param id
 */
const loadStateByid = (id) => {
  client.query(`select id, label from state where id = ${id}`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    console.log(result.rows[0])
    const res = result.rows[0]
    if (result.rowCount == 0) {
      return console.error(`L'etat ${id} n'existe pas`)
    }
    return res
  })
}

/**
 * Cette fonction permet de supprimer un etat de masagge
 * @param id id de l'etat a modifier
 */
const deleteState = (id) => {
  client.query(`delete from state where id = ${id}`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`L'etat ${id} n'existe pas`)
    }
    //console.log(result.rows[0])
    console.log(`Etat ${id} a bien été supprimé`)
  })
}

/**
 * Cette fonction permet de modifier le label d'un etat de message
 * @param id id de l'etat à modifier
 * @param state nom du nouveau label pour l'etat de message
 */
const updateState = (id, state) => {
  client.query(`update state set label = '${state}' where id = ${id}`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`L'etat ${id} n'existe pas`)
    }
    console.log(result.rows[0])
    console.log(`Etat ${id} renommé '${state}'`)
  })
}

/**
 * Cette fonction permet de crée un etat de message
 * @param labelState label de l'etat de message
 */
const createState = (labelState) => {
  client.query(`select label from state where label = '${labelState}'`, function (err, result) {
    if (err) {
      return console.error('error running query select-----------', err)
    }
    console.log('Select label = ', result)
    if (result.rowCount > 0) {
      return console.error(`Le label '${labelState}' existe deja`)
    }
    else {
      client.query(`insert into State values(DEFAULT,'${labelState}')`, function (err, result) {
        if (err) {
          // return console.error('error running query', err)
        }
        console.log(result.rows[0])
        console.log(`L'état '${labelState}' a bien été crée`)
      })
    }
  })
}

export { loadState, loadStateByid, deleteState, createState, updateState }
