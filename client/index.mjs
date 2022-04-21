import cron from 'node-cron';
import axios from 'axios';

const api = 'http://localhost:3000'

const apiAuth = `${api}/auth`
const apiReadyMessage = `${api}/messagepret`

let TOKEN

/**
 * GENERE LE TOKEN
 */
const getToken = async () => {
    try {
        const res = await axios.post(apiAuth, { name: 'cron', password: 'cron' })
        console.log('# getToken : authenticated')
        TOKEN = res.data
        return true
    } catch (err) {
        console.log('# getToken :', err)
        return false
    }
}

/**
 * LISTE LES PRODUITS AVEC UNE PROMISE
 */


const getReadyMessages = async () => {

    const res = await axios.get(apiReadyMessage, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    })
    console.log(res)
    return res.data

}



(async () => {
    if (!(await getToken())) {
        console.log("Erreur d'authentification")
        return
    }
    cron.schedule('* * * * * *', function () {
        try {
            getReadyMessages()
                .then(() => {
                    console.log("message envoyé")
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (e) {
            console.log('ERREUR : ', e.response.data, e.response.status)
        }
    });
})()