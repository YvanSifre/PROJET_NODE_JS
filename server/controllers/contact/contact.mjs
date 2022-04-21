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

/**
 * Cette fonction affiche tous les contacts
 */
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

/**
 * Cette fonction supprime un contact {id}
 * @param id id du contact à supprimer
 */
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

/**
 * Cette fonction ajoute un contact
 * @param name nom du contact
 * @param firstname prenom du contact
 * @param mail mail du contact
 */
const addContact = (name, firstname, mail, label, idList) => {
    var res
    client.query(`insert into contact values (DEFAULT, '${name}','${firstname}','${mail}', NOW())`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        console.log(`Contact ${firstname} a bien été ajouté`)
    })
    client.query(`select id from contact where firstname = '${firstname}' and name = '${name}'`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        res = result.rows[0]
        client.query(`insert into rel_contact_list values ('${label}', ${idList}, ${res.id})`, function (err, result) {
            if (err) {
                return console.error('error running query', err)
            }
            console.log(`Contact ${firstname} a bien été ajouté à la liste ${idList}`)
        })

    })

}


/**
 * Cette fonction modifie le prenom d'un contact
 * @param name prenom du contact à modifier
 * @param newName nouveau prenom du contact
 */
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
