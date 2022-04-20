import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
var url = process.env.URL
var client = new pg.Client(url);

const loadState = () => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
    client.query(`select id, label from state `, function (err, result) {
      if (err) {
        return console.error('error running query', err)
      }
      if (result.rowCount == 0) {
        return console.error(`Il n'existe pas d'état`)
      }
      console.log(result.rows)
      const res = result.rows
      client.end()
      return res
    })
  })
}
/**
 * Cette fonction permet d'afficher le label d'un état de message en fonction de son
 * @param id
 */
const loadStateByid = (id) => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
    client.query(`select id, label from state where id = ${id}`, function (err, result) {
      if (err) {
        return console.error('error running query', err)
      }
      console.log(result.rows[0])
      const res = result.rows[0]
      if (result.rowCount == 0) {
        return console.error(`L'etat ${id} n'existe pas`)
      }
      client.end()
      return res
    })
  })
}
const deleteState = (id) => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
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
  })
}
const updateState = (id, state) => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
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
  })
}
const createState = (labelState) => {
  client.connect(function (err) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
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
  })
}





export { loadState, loadStateByid, deleteState, createState, updateState }
