import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
var url = process.env.URL
var client = new pg.Client(url);

/**
 * Cette fonction permet d'afficher les contacts d'une liste
 * @param id 
 */
const loadList = (id) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`select list.name, contact.name, contact.firstname from contact, list, rel_contact_list 
        where rel_contact_list.idcontact = contact.id and rel_contact_list.idlist = ${id}`, function (err, result) {
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

const deleteList = (id) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`delete from list where id = ${id}`, function (err, result) {
            if (err) {
                return console.error('error running query', err)
            }
            console.log(`List ${id} a bien été supprimée`)
        })
    })
}

const addList = (name, description) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`insert into list values (DEFAULT, '${name}','${description}', NOW())`, function (err, result) {
            if (err) {
                return console.error('error running query', err)
            }
            console.log(`Liste ${name} a bien été ajoutée`)
        })
    })
}

const updateList = (name, newName) => {
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err)
        }
        client.query(`update list set name = '${newName}' where name = '${name}'`, function (err, result) {
            if (err) {
                return console.error('error running query', err)
            }
            console.log(`Liste ${name} a bien été modifiée`)
        })
    })
}

export { loadList, deleteList, addList, updateList }