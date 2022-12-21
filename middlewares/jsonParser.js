const jsonParser = (req,res) => {
    res.send = (data, code = 200)=>{
        res.writeHead(code,{
            'Content-type':'application/json'
        })
        res.end(JSON.stringify(data))
    }
}

module.exports = { jsonParser }