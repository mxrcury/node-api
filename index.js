const { App } = require('./core/App')
const { bodyParser } = require('./middlewares/bodyParser')
const { jsonParser } = require('./middlewares/jsonParser')
const { urlParser } = require('./middlewares/urlParser')
const { router } = require('./routers/users.router')
require('dotenv').config()

const PORT = process.env.PORT || 7000

const app = new App()

app.useMiddleware(jsonParser)
app.useMiddleware(bodyParser)
app.useMiddleware(urlParser)

app.use('/api',router)


app.listen(PORT,()=>console.log(`Server is started on ${PORT}`))