import { loadContact, deleteContact, updateContact, addContact } from "./controllers/contact/contact.mjs"
import { loadMessageByid, deleteMessage } from "./controllers/message/message.mjs"
import { addList, deleteList, loadList, updateList } from "./controllers/listContact/listeContact.mjs"

import express from 'express'
<<<<<<< HEAD
=======
import { addContact } from "./controllers/contact/contact.mjs"
import { updateContact } from "./controllers/contact/contact.mjs"
import { loadTemplateById, loadTemplate, deleteTemplate, addTemplate, updateTemplate } from "./controllers/model-template/model-template.mjs"
>>>>>>> de752a7 (Ajout Crud Model-Template)

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
router.post('/addContact', (req, res) => {
  try {
    console.log(req.body)
    const { name, firstname, mail } = req.body
    res.send(addContact(name, firstname, mail))
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

//Template

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
    console.log(error)
  }
})




export default router
