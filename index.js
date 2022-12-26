const express = require("express");
const app = express()
require("dotenv").config();
app.use(express.json())


const { Client } = require("pg");
const client = new Client({
     host: "localhost",
     user: "postgres",
     port: 5432,
     password: "Sura@123",
     database:"nodedemo"
     
})

//post to database
app.post("/addondatabase", addHandler)

function addHandler(req, res) {
     name= req.body.name
     url = req.body.url

     let sql = `INSERT INTO anime (name,url) VALUES($1,$2) RETURNING *;`
     let values =[name,url]
     client
       .query(sql, values)
       .then((result) => {
         console.log(result.rows[0]);
         res.json(result.rows[0]);
       })
       .catch((error) => {
         res.status(500).send(error);
       });
}

//////////////////////////////////////////////////////////
// get from database
app.get("/getfromdatabase/:i", getHandler)
function getHandler(req, res) {
     id = req.params.i
     
     sql = `SELECT * FROM anime WHERE id=${id}`;

     client
       .query(sql)
       .then((result) => {
         // console.log(result)
         res.json(result.rows);
       })
       .catch((error) => {
         res.status(500).send(error);
       });


}

///////////////////////////////////////////////////////////////////////////////
// update database 
app.put ("/updatedDatabase/:x", updateDatabase)

function updateDatabase(req, res) {
     id = req.params.x
     name = req.body.name;
     url=req.body.url
     values =[name , url]
     sql = `UPDATE anime SET name=$1 , url=$2 WHERE id=${id} RETURNING *`

     client.query(sql, values)
          .then(result => {
               res.json(result.rows[0])
               
     })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
// delete from database

app.delete("/delete/:id" , deleteHandler)
function deleteHandler(req, res) {
     id = req.params.id
     sql = `DELETE FROM anime WHERE id=${id} RETURNING *`;



     client.query(sql)
          .then(result => {
               console.log(result)
          //    res.status(204).json
               res.status(204).json(result.rows[0])
          })
          .catch(err => {
          res.status(500).send(err)
     })
}








port = process.env.PORT

client.connect(() => {
     app.listen(port, () => {
       console.log(`server up on port ${port}`);
     });
})
