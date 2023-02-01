import mysql from 'mysql'

let connection = function(host, user, db, password){

  let conn
  if(password){

    conn = mysql.createConnection({
      host     : host,
      user     : user,
      password : password,
      database : db
    })
  }else{

    conn = mysql.createConnection({
      host     : host,
      user     : user,
      database : db
    })
  }

  conn.connect()
  console.log(`connecté a la base de donnée: ${db}`);
  return conn
}

export {connection}

  