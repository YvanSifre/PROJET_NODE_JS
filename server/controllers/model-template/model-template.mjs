import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
var url = process.env.URL
var client = new pg.Client(url);

/**
 * Cette fonction permet de lire les informations d'un contact
 * @param id 
 */
const loadTemplateById = (id) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`select id, name, filename from model where id = ${id}`, function (err, result) {
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

const loadTemplate = () => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`select id, name, filename from model`, function (err, result) {
            if (err) {
                return console.error('error running query', err)
            }
            if (result.rowCount == 0) {
                return console.error(`Pas de message`)
            }
            console.log(result.rows)
            const res = result.rows
            client.end()
            return res
        })
    })
}

const deleteTemplate = (id) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`delete from model where id = ${id}`, function (err, result) {
            if (err) {
                return console.error('error running query', err)
            }
            console.log(result.rows[0])
            console.log(`Template: ${id} a bien été supprimé`)
        })
    })
}

const addTemplate = (name, filename) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`insert into model values (DEFAULT, '${name}', '${filename}')`, function (err, result) {
            if (err) {
                return console.error('error running query test', err)
            }
            console.log(`Template: ${name} a bien été ajouté`)
        })
    })
}

const updateTemplate = (id, name) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`update model set name = '${name}' where id = ${id}`, function (err, result) {
            if (err) {
                return console.error('error running query', err)
            }
            console.log(`Template: ${name} a bien été modifié`)
        })
    })
}

export { loadTemplateById, loadTemplate, deleteTemplate, addTemplate, updateTemplate }