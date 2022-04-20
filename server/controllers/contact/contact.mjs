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

const deleteContact = (id) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`delete from contact where id = ${id}`, function (err, result) {
            if (err) {
                return console.error('error running query', err)
            }
            if (result.rowCount == 0) {
                return console.error(`Le contact ${id} n'existe pas`)
            }
            console.log(`Contact ${id} a bien été supprimé`)
        })
    })
}

const addContact = (name, firstname, mail) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`insert into contact values (DEFAULT, '${name}','${firstname}','${mail}', NOW())`, function (err, result) {
            if (err) {
                return console.error('error running query', err)
            }
            console.log(`Contact ${name} a bien été ajouté`)
        })
    })
}

const updateContact = (name, newName) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`update contact set firstname = '${newName}' where firstname = '${name}'`, function (err, result) {
            if (err) {
                return console.error('error running query', err)
            }
            if (result.rowCount == 0) {
                return console.error(`Le contact ${name} n'existe pas`)
            }
            console.log(`Contact ${name} a bien été modifié`)
        })
    })
}

export { loadContact, deleteContact, addContact, updateContact }