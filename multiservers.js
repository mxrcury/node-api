const cluster = require('node:cluster')
const { App } = require('./core/App')
const { bodyParser } = require('./middlewares/bodyParser')
const { jsonParser } = require('./middlewares/jsonParser')
const { urlParser } = require('./middlewares/urlParser')
const { router } = require('./routers/users.router')
const { cpus } = require('os')
require('dotenv').config()

let PORT = process.env.PORT || 7000
let cpusQty = cpus().length

if (cpusQty > 1) {
    if(cluster.isPrimary){
        // let port = 7000
        const app = new App();

        app.useMiddleware(jsonParser);
        app.useMiddleware(bodyParser);
        app.useMiddleware(urlParser);

        app.use("/api", router);

        app.listen(PORT, () => console.log(`Server is started on ${PORT}`));
        const worker = cluster;
        // TODO: make LOAD BALANCER, where main server with port 3000 can send all requests to worker by round-robin algorithm
        const forkServers = async () =>{
            for (let i = 1; i <= cpusQty; i++) {
                await worker.fork({WORKER_NUMBER:i}).send('Hello')
            }
        }
        forkServers()
    } else if (cluster.isWorker) {
        const PORT = 7000 + +process.env.WORKER_NUMBER
        const app = new App();

        app.useMiddleware(jsonParser);
        app.useMiddleware(bodyParser);
        app.useMiddleware(urlParser);

        process.on('message',(msg)=>{
            console.log(msg);
        })

        app.use("/api", router);

        app.listen(PORT, () => console.log(`Server is started on ${PORT}`));
    }
}