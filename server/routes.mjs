import { loadContact, loadAllContact, deleteContact, updateContact, addContact } from "./controllers/contact/contact.mjs"
import { loadMessageByid, deleteMessage, loadMessage, updateMessage, createMessage, isReadyToSend } from "./controllers/message/message.mjs"
import { addList, loadAllList, deleteList, loadList, updateList } from "./controllers/listContact/listeContact.mjs"
import { loadState, loadStateByid, createState, deleteState, updateState } from "./controllers/state/state.mjs"
import { totalContact, totalList, mostRecentMessage, nbSentMsg, nbSentMsgBytype } from "./controllers/stats/stats.mjs"
import { loadTemplateById, loadTemplate, deleteTemplate, addTemplate, updateTemplate } from "./controllers/model-template/model-template.mjs"
import { auth } from './controllers/auth/index.mjs'

import express from 'express'

const router = express.Router()

/**
 * Lire les informations d'un contact depuis son id
 */
router.get('/contact/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(loadContact(id))
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas de contact avec l'id : ${id}`)
  }
})

/**
 * Afficher toutes les contacts
 */
router.get('/getContact', (req, res) => {
  try {
    res.send(loadAllContact())
  } catch (error) {
    res.send(404)
    console.log(error)
  }
})

/**
 * Supprimer un contact par son id
 */
router.delete('/deleteContact/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(deleteContact(id))
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas de contact avec l'id : ${id}`)
  }
})

/**
 * Ajouter un contact
 */
router.post('/addContact/:label/:idList', (req, res) => {
  try {
    console.log(req.body)
    const { name, firstname, mail } = req.body
    const label = req.params.label
    const idList = req.params.idList
    res.send(addContact(name, firstname, mail, label, idList))
  } catch (error) {
    res.send(404)
    console.log(error)
  }
})

/**
 * Modifier le nom d'un contact
 */
router.put('/updateContact/:name/:newName', (req, res) => {
  try {
    const name = req.params.name
    const newName = req.params.newName
    res.send(updateContact(name, newName))
  } catch (error) {
    res.send(404)
    console.log(error)
  }
})

/**
 * Afficher toutes les listes de contact
 */
router.get('/getList', (req, res) => {
  try {
    res.send(loadAllList())
  } catch (error) {
    res.send(404)
    console.log(error)
  }
})

/**
 * Afficher les contacts d'une liste depuis son id
 */
router.get('/contactList/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(loadList(id))
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas de contact avec l'id : ${id}`)
  }
})

/**
 * Supprimer une liste de contact par son id
 */
router.delete('/deleteList/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(deleteList(id))
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas de contact avec l'id : ${id}`)
  }
})

/**
 * Ajouter une liste
 */
router.post('/addList', (req, res) => {
  try {
    console.log(req.body)
    const { name, description } = req.body
    res.send(addList(name, description))
  } catch (error) {
    res.send(404)
    console.log(error)
  }
})

/**
 * Modifier le nom d'une liste
 */
router.put('/updateList/:name/:newName', (req, res) => {
  try {
    const name = req.params.name
    const newName = req.params.newName
    console.log(req.params.name)
    res.send(updateList(name, newName))
  } catch (error) {
    res.send(404)
    console.log(error)
  }
})

// ------------- Message ---------------- //

/**
 * Lire les informations d'un message depuis son id
 */
router.get('/message/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(loadMessageByid(id))
  } catch (error) {
    res.send(404)
    console.log("error")
  }
})

router.get('/message', (req, res) => {
  try {
    res.send(loadMessage())
  } catch (error) {
    res.send(404)
    console.log("error")
  }
})

/**
 * Supprimer un message par son id
 */

router.delete('/message/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(deleteMessage(id))
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas de message avec l'id : ${id}`)
  }
})

router.put('/message/:id/:content', (req, res) => {
  try {
    const id = req.params.id
    const content = req.params.content
    res.send(updateMessage(id, content))
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas de message avec l'id : ${id}`)
  }
})

router.post('/addMessage', (req, res) => {
  try {
    res.send(createMessage(req.body.object, req.body.content, req.body.senddate, req.body.sentdate, req.body.sendhour, req.body.senthour, req.body.idstate, req.body.idlist, req.body.idmodel))
  } catch (error) {
    res.send(404)
    console.log(error)
  }
})

// ------------------  Template ----------------------------//

router.get('/model/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(loadTemplateById(id))
  } catch (error) {
    res.send(404)
    console.log("error")
  }
})

router.get('/model', (req, res) => {
  try {
    res.send(loadTemplate())
  } catch (error) {
    res.send(404)
    console.log("error")
  }
})


router.delete('/model/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(deleteTemplate(id))
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas de template avec l'id : ${id}`)
  }
})

router.put('/model/:id/:name', (req, res) => {
  try {
    const id = req.params.id
    const name = req.params.name
    res.send(updateTemplate(id, name))
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas de template avec l'id : ${id}`)
  }
})

router.post('/model', (req, res) => {
  try {
    res.send(addTemplate(req.body.name, req.body.filename))
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas de message avec l'id : ${id}`)
  }
})

// ------------------  State ----------------------------//

router.post('/state/:StateLabel', (req, res) => {
  try {
    const stateLabel = req.params.StateLabel
    res.send(createState(stateLabel))
  } catch (error) {
    res.send(404)
    console.log("error")
  }
})

router.delete('/state/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(deleteState(id))
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas d'etat avec l'id : ${id}`)
  }
})

router.get('/state', (req, res) => {
  try {
    res.send(loadState())
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas d'etat `)
  }
})

router.get('/state/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(loadStateByid(id))
  } catch (error) {
    res.send(404)
    console.log(`Il n'existe pas d'etat avec l'id : ${id}`)
  }
})

router.put('/state/:id', (req, res) => {
  try {
    const id = req.params.id
    const label = req.query.label
    res.send(updateState(id, label))
  } catch (error) {
    res.send(404)
  }
})

// ------------------  Stats ----------------------------//

router.get('/nbContact', (req, res) => {
  try {
    res.send(totalContact())
  } catch (error) {
    res.send(404)
    console.log(`Pas de contact`)
  }
})
router.get('/nbMessageEnvoye', (req, res) => {
  try {
    res.send(nbSentMsg())
  } catch (error) {
    res.send(404)
  }
})

router.get('/derniermessage', (req, res) => {
  try {
    res.send(mostRecentMessage())
  } catch (error) {
    res.send(404)
  }
})

router.get('/messagepret', (req, res) => {
  try {
    if (isReadyToSend() == 1) {

      res.send(200)
    }
    else {
      res.send(400)
    }
  } catch (error) {
    res.send(404)
  }
})


router.get('/totalListe', (req, res) => {
  try {
    res.send(totalList())
  } catch (error) {
    res.send(404)
  }
})

router.get('/nbMsgType', (req, res) => {
  try {
    res.send(nbSentMsgBytype())
  } catch (error) {
    res.send(404)
  }
})


router.post('/auth', (req, res) => {
  const { name, password } = req.body

  const r = auth(name, password)

  if (!r) {
    res.status(400)
    res.send('Unauthorized')
    res.end()

    return
  }

  res.send(r)
})


export default router
