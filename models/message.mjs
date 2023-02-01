import * as db from '../config/db.mjs'
import moment from 'moment/moment.js'

class Commentaire {

    constructor(data){
        this.data = data
    }

    get content(){
        return this.data.content
    }

    get date(){

        return moment(this.data.date)
    }

    get id(){
        return this.data.id
    }
}

let create = function(content, callback){
    let connection = db.connection('127.0.0.1', 'root', 'express')

    connection.query('INSERT INTO comment SET content = ?, date = ?', [content, new Date()], (err, result)=>{
        if (err) throw err
        callback(result)
    })

    connection.end()
}

let all = function(callback){
    let connection = db.connection('127.0.0.1', 'root', 'express')
    
    connection.query('SELECT * FROM comment', (err, results)=>{
        if (err) throw err
        let arr = results.map((result)=> new Commentaire(result)).reverse()
        callback(arr)
    })

    connection.end()
}

let find = function(id, callback){
    let connection = db.connection('127.0.0.1', 'root', 'express')
    
    connection.query('SELECT * FROM comment WHERE id= ? LIMIT 1',[id], (err, result)=>{
        if (err) throw err
        callback(new Commentaire(result[0]))
    })

    connection.end()
}

export {create, all, find}