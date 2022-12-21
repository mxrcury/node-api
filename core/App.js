const EventEmitter = require("events")
const { createServer } = require("http")

class App {
    constructor(){
        this.emitter = new EventEmitter()
        this.server = this._createServer()
        this.middlewares = [] 
    }
    listen(port,callback){
        this.server.listen(port,callback)
    }
    useMiddleware (middlware) {
        this.middlewares.push(middlware)
    }
    use(commonPath,router){
        Object.keys(router.endpoints).map(path=>{
            const endpoint = router.endpoints[path]
            router.endpoints[commonPath + path] = endpoint
            delete router.endpoints[path]
        })
        this._useRouter(router.endpoints)
    }
    _activeMiddleWares(req,res) {
        this.middlewares.forEach(middleware=>middleware(req,res))
    }
    _useRouter(endpoints){
        Object.keys(endpoints).forEach(path=>{
            const endpoint = endpoints[path]
            
            Object.keys(endpoint).forEach(method=>{
                this.emitter.on(`[${path}]:[${method}]`,(req,res)=>{
                    endpoint[method](req,res)
                })
            })
        })
    }
    _createServer(){
        const server = createServer(async (req, res) => {
          console.log(req.url);
          let data = "";
          req.on("data", (chunk) => {
            data += chunk;
          });
          req.on("end", () => {
            this._activeMiddleWares(req, res);
            if (data) {
              req.body = JSON.parse(data);
              // console.log('PATH = ', req.pathname);
            }
            const emitted = this.emitter.emit(
              `[${req.pathname}]:[${req.method}]`,
              req,
              res
            );
            if (!emitted) {
              res.send(`Endpoint with such path does not exist`, 404);
            }
          });
          req.on("error", (err)=>{
            res.send({error, message:`Something went wrong on server`},500)
          })
        });
        return server
    }
}


module.exports = { App }