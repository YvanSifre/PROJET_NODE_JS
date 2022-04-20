import { client } from '../config/database.mjs'

/**
 * Cette fonction permet de lire les informations d'un contact
 * @param id 
 */
const loadContact = (id) => {
    client.query(`select name, firstname, mail, creationdate from contact where id = ${id}`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        if (result.rowCount == 0) {
            return console.error(`Le contact ${id} n'existe pas`)
        }
        console.log(result.rows[0])
        const res = result.rows[0]
        return res
    })
}

const loadAllContact = () => {
    client.query(`select * from contact`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        if (result.rowCount == 0) {
            return console.error(`Pas de contact`)
        }
        console.log(result.rows)
        const res = result.rows
        return res
    })
}

const deleteContact = (id) => {
    client.query(`delete from contact where id = ${id}`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        if (result.rowCount == 0) {
            return console.error(`Le contact ${id} n'existe pas`)
        }
        console.log(`Contact ${id} a bien été supprimé`)
    })
}

const addContact = (name, firstname, mail) => {
    client.query(`insert into contact values (DEFAULT, '${name}','${firstname}','${mail}', NOW())`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        console.log(`Contact ${name} a bien été ajouté`)
    })
}

const updateContact = (name, newName) => {
    client.query(`update contact set firstname = '${newName}' where firstname = '${name}'`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        if (result.rowCount == 0) {
            return console.error(`Le contact ${name} n'existe pas`)
        }
        console.log(`Contact ${name} a bien été modifié`)
    })
}

export { loadContact, loadAllContact, deleteContact, addContact, updateContact }