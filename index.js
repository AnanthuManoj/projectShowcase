//1:- import dotenv
require('dotenv').config()//loads env file contents into process.env by default.

//2:- import express
const express = require('express')

//3:- import cors
const cors = require('cors')

//import router
const router = require('./Routing/router')

//import connection.js

require('./DataBase/connection')

//4:- create server
const app = express()

//5:- use of cors by server
app.use(cors())

//6:- parsing json
app.use(express.json())

//server using the router
app.use(router)

//server using the uploads folder
//first arg - how other application use the folder
//second arg - to export the folder- express.static

app.use('/upload',express.static('./uploads'))

//7:- customise port - bydefault - server runs at 3000
const port = 4000 || process.env

//8:- run server

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

