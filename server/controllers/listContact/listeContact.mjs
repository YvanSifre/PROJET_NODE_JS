import { client } from '../config/database.mjs'

/**
 * Cette fonction permet d'afficher les contacts d'une liste
 * @param id 
 */
const loadList = (id) => {
    client.query(`select list.name, contact.name, contact.firstname from contact, list, rel_contact_list 
        where rel_contact_list.idcontact = contact.id and rel_contact_list.idlist = ${id}`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        console.log(result.rows[0])
        const res = result.rows[0]
        return res
    })
}

const loadAllList = () => {
    client.query(`select * from list`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        if (result.rowCount == 0) {
            return console.error(`Pas de liste de contact`)
        }
        console.log(result.rows)
        const res = result.rows
        return res
    })
}

const deleteList = (id) => {
    client.query(`delete from list where id = ${id}`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        console.log(`List ${id} a bien été supprimée`)
    })
}

const addList = (name, description) => {
    client.query(`insert into list values (DEFAULT, '${name}','${description}', NOW())`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        console.log(`Liste ${name} a bien été ajoutée`)
    })
}

const updateList = (name, newName) => {
    client.query(`update list set name = '${newName}' where name = '${name}'`, function (err, result) {
        if (err) {
            return console.error('error running query', err)
        }
        console.log(`Liste ${name} a bien été modifiée`)
    })
}

export { loadList, loadAllList, deleteList, addList, updateList }