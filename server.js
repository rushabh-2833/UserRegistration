import express from 'express'
import {} from 'dotenv/config'

// import mongoose for creating a session store to save sessions

import mongoose from 'mongoose'

// import MongoStore to store the sessions in mongodb

import MongoStore from 'connect-mongo'

// import session from express-session

import session from 'express-session'

// import router to use in middleware

import router from './routes/routes.js'

const app = express()



// uri to connect mongodb

const uri = "mongodb+srv://Rushabh33:1234@cluster0.gwaekog.mongodb.net/CIBC_Users?retryWrites=true&w=majority";

// create sessionStore for storing session in mongodb

const sessionStore = MongoStore.create({
    mongoUrl : uri,
    dbName : "CIBC_Users",
    collectionName : "UserzSessions"
})

// add middleware to use session at app level

app.use(session({

    secret : "A very Secret Key",
    resave : false ,
    saveUninitialized : false ,
    store : sessionStore


}))


// for using public folder for static resources

app.use(express.static('public'))

// set the view engine as ejs to use ejs files

app.set('view-engine','ejs')

// in order to get the form data from request body

app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 6162

app.listen(PORT,()=>{
    console.log(`App is listening at port ${PORT}`)
    })

// using router as middleware

app.use('/',router)