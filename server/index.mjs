import express from 'express'
import router from './routes.mjs'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import swaggerUI from 'swagger-ui-express'
import docs from './docs/index.mjs'

// APP
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(router)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs, { explorer: true }))


// MAIN SERVER
app.listen(port, () => {
  console.log('\x1b[36m%s\x1b[0m', `\nListening at http://localhost:${port}`)
})
