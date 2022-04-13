import { loadContact } from "./controllers/contact/contact.mjs"
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

export default router