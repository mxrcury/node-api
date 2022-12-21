
class Router {
    constructor(){
        this.endpoints = {}
        this.commonPath = ''
    }
    request(method, path, handler){
        let fullPath = path
        // const path = `${this.commonPath}${path}`
        // Check for params ????
        if(path.includes(':')){
            fullPath = path.slice(0,path.indexOf(':'))
        }
        if(!this.endpoints[fullPath]){
            this.endpoints[fullPath] = {} 
        }
        const endpoint = this.endpoints[fullPath]
        if(!endpoint[method]){
            endpoint[method] = handler
        }
    }
    get(path,handler) {
        this.request('GET',path,handler)
    }
    post(path,handler) {
        this.request('POST',path,handler)
    }
    put(path,handler) {
        this.request('PUT',path,handler)
    }
    delete(path,handler) {
        this.request('DELETE',path,handler)
    }
}


module.exports = { Router }