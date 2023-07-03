const next = require('next')
const nextApp = next({dev:false})
const hanlder = nextApp.getRequestHandler()
nextApp.prepare().then(()=>{
    const express = require('express')
    const expressApp = express()
    expressApp.get('*',async (req,res)=>{
        await hanlder(req,res)
    })
    expressApp.listen(3000,()=>{
        console.log('server is on 3000');
    })
})