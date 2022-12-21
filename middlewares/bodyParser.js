const bodyParser = async (req,res) => {
    let body = ''
    req.on("data",(chunk)=>{
        body += chunk
    })
    await req.on("end",()=>{
        if(body){
            req.body = JSON.parse(body)
        }
    })
}

module.exports = { bodyParser }