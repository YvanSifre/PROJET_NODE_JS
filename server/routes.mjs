import { loadContact } from "./controllers/contact/contact.mjs"
import { loadMessageByid, deleteMessage } from "./controllers/message/message.mjs"

import express from 'express'

const router = express.Router()

/**
 *
 */
router.get('/contact/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(loadContact(id))
  } catch (error) {
    res.send(404)
    console.log("error")
  }
})

router.get('/message/:id', (req, res) => {
  try {
    const id = req.params.id
    res.send(loadMessageByid(id))
  } catch (error) {
    res.send(404)
    console.log("error")
  }
})

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
