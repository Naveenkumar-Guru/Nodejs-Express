import express from 'express'

let app=express()

//
//API URL:127.0.0.1:8080/
app.get('/',(req,resp)=>{
    return resp.json({"msg":"root Request"})
})

//API URL:127.0.0.1:8080/about
app. get('/about',(req,resp)=>{
    return resp.send("hiii")
})

app.listen(8080,'127.0.0.1',(error)=>{
    if(error) throw error
})
