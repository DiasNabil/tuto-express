import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import {flash} from './middleware/flash.mjs'
import* as Message from './models/message.mjs'

let app = express()

//moteur template
app.set('view engine', 'ejs')


//middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }))
app.use(flash)

//routes
app.get('/', (req,res)=>{
    Message.all((messages)=>{
    res.render('index', {messages: messages})
    })
})

app.get('/comment/:id', (req,res)=>{

    let commentId = req.params.id

    Message.find(commentId, (message)=>{
        res.render('comment/show', {message: message})
    })

})

app.post('/', (req,res)=>{
    if(req.body.message === undefined || req.body.message === ''){
        req.flash('error','veuillez entrer un message !')  
        res.redirect('/') 
    }else{
        Message.create(req.body.message, function(){
            req.flash('success', 'message enregistré')
            res.redirect('/') 
        })
    }
    
})


//ecoute serveur
app.listen(8080)