import { client } from '../config/database.mjs'

/**
 * Cette fonction permet d'afficher un model
 * @param id id du model a modifier
 */
const loadTemplateById = (id) => {

  client.query(`select id, name, filename from model where id = ${id}`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    console.log(result.rows[0])
    const res = result.rows[0]
    return res
  })

}

/**
 * Cette fonction affiche tous les models
 */
const loadTemplate = () => {

  client.query(`select id, name, filename from model`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    if (result.rowCount == 0) {
      return console.error(`Pas de message`)
    }
    console.log(result.rows)
    const res = result.rows
    return res
  })
}

/**
 * Cette fonction supprime un model
 * @param id
 */
const deleteTemplate = (id) => {
  client.query(`delete from model where id = ${id}`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    console.log(result.rows[0])
    console.log(`Template: ${id} a bien été supprimé`)
  })
}

/**
 * Cette fonction ajoute un template/model
 * @param name nom du model
 * @param filename nom du fichier
 */
const addTemplate = (name, filename) => {
  client.query(`insert into model values (DEFAULT, '${name}', '${filename}')`, function (err, result) {
    if (err) {
      return console.error('error running query test', err)
    }
    console.log(`Template: ${name} a bien été ajouté`)
  })
}
/**
 * Cette fonction modifie le nom d'un model
 * @param id id du model a modifier
 * @param name nouveau nom du model
 */
const updateTemplate = (id, name) => {
  client.query(`update model set name = '${name}' where id = ${id}`, function (err, result) {
    if (err) {
      return console.error('error running query', err)
    }
    console.log(`Template: ${name} a bien été modifié`)
  })
}

export { loadTemplateById, loadTemplate, deleteTemplate, addTemplate, updateTemplate }
