import { loadContact, deleteContact } from "./controllers/contact/contact.mjs"
import { loadMessageByid, deleteMessage } from "./controllers/message/message.mjs"

import express from 'express'
import { addContact } from "./controllers/contact/contact.mjs"
import { updateContact } from "./controllers/contact/contact.mjs"

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
router.delete('/contact/:id', (req, res) => {
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
router.post('/contact/add', (req, res) => {
  try {
    console.log(req.body)
    const { name, firstname, mail } = req.body
    res.send(addContact(req.body.name, firstname, mail))
  } catch (error) {
    res.send(404)
    console.log(error)
  }
})

/**
 * Modifier le nom d'un contact
 */
router.put('/contact/:name:newName', (req, res) => {
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

export default router
