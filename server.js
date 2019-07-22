const express = require("express");
var bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const PORT  = 3001;
const app = express();
const cors = require("cors");
CLIENT_ORIGIN = "http://localhost:3000";
app.use(
    cors({
      origin: CLIENT_ORIGIN
    })
  );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const connection = mysql.createConnection({
    host : "localhost",
    user: "root",
    Password : "",
    database : "virtusa_test_db"
});
connection.connect((err)=>{
    if(err) throw err;
    console.log("Database connection is successful");    
})
app.get("/", (req,res)=>{
res.send("First route is working");
});
/*
 * To add a user
 * Parameters {username, email, password }
 */
app.post("/api/add-user", (req,res)=>{
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        var query = "SELECT * FROM users where email=" + mysql.escape(email);
        connection.query(query, function (err, result) {
            if (err) throw err;            
            if(result.length !== 0){
               return res.json({status:`User already exists with ${email}`})
            }else{
                let userData = [[username, email, hash]];
                var sql = 'INSERT INTO users (name, email, password) VALUES ?';
                connection.query(sql, [userData], function (err, result) {
                    if (err) throw err;
                return res.json({status:"user_created"});
                });
            }
            
          });
        
      });    
})

/*
 * To check user login
 * Parameters {email, password }
 */
app.post("/api/login", (req,res)=>{    
    let email = req.body.email;
    let password = req.body.password;
        var query = "SELECT * FROM users where email=" + mysql.escape(email);
        connection.query(query, function (err, result) {
            if (err) throw err;                  
            if(result.length === 0){
               return res.json({status:"fail"})
            }else{                
                bcrypt.compare(password, result[0].password).then(function(resPassword) {
                    if(resPassword === true ){
                        return res.json({status:"success", userData:result});
                    }else{
                        return res.json({status:"fail", userData:"incorrect password"});
                    }                   
                });
                
            }            
          });      
})
app.get("/api/get-users", (req,res)=>{
    var query = "SELECT * FROM users";
    connection.query(query, function(err, users){
        if(err) throw err;
        return res.json({users:users});
    });
})
app.delete("/api/delete-user", (req,res)=>{
    console.log(req.body.id);
    var query = "DELETE FROM users WHERE id="+mysql.escape(req.body.id);
    connection.query(query, function(err, users){
        if(err) throw err;
        return res.json({status:"success"});
    });
})
app.post("/api/edit-user", (req,res)=>{
    var query = "UPDATE users SET name="+mysql.escape(req.body.name)+" WHERE id="+mysql.escape(req.body.id);
    connection.query(query, function(err, users){
        if(err) throw err;
        var query1 = "SELECT * FROM users WHERE id="+mysql.escape(req.body.id);
        connection.query(query1, function(err, users){
            if(err) throw err;
            return res.json({status:"success", user:users});
        });
    });
})
app.post("/api/get-user", (req,res)=>{
    var query = "SELECT * FROM users WHERE email="+mysql.escape(req.body.email);
    connection.query(query, function(err, users){
        if(err) throw err;
        return res.json({status:"success", user:users});
    });
})
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});