import { client } from '../config/database.mjs'

/**
 * Cette fonction permet de lire les informations d'un contact
 * @param id 
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

const deleteTemplate = (id) => {
    client.query(`delete from model where id = ${id}`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        console.log(result.rows[0])
        console.log(`Template: ${id} a bien été supprimé`)
    })
}

const addTemplate = (name, filename) => {
    client.query(`insert into model values (DEFAULT, '${name}', '${filename}')`, function (err, result) {
        if (err) {
            return console.error('error running query test', err)
        }
        console.log(`Template: ${name} a bien été ajouté`)
    })
}

const updateTemplate = (id, name) => {
    client.query(`update model set name = '${name}' where id = ${id}`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        console.log(`Template: ${name} a bien été modifié`)
    })
}

export { loadTemplateById, loadTemplate, deleteTemplate, addTemplate, updateTemplate }