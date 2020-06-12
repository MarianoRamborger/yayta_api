const express = require("express");
const morgan = require("morgan")
const { GenerateJWT, DecodeJWT, ValidateJWT } = require("./dec-enc.js"); //importar solo estas funciones especificas por razones de seguridad.
const Users = require('./tempDB.js')
const app = express();
const routes = require('./Routes/routes.js')
const pRoutes = require('./Routes/p-routes.js') ;
const cRoutes = require('./Routes/c-routes')
const Main = require("./mdb")
const { MongoClient } = require('mongodb');
var cors = require('cors');


// const uri = "mongodb+srv://yayta:mocasin1@cluster0-gyc6q.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true })
const mongoose = require('mongoose');


app.use(express.json()) //middleware, parsea incoming requests con json payloads. Popula un objeto body en la request con la data parseada
app.use(cors())
app.use(morgan("dev"))




const port = process.env.PORT || 3100;


  mongoose.connect('mongodb+srv://yayta:mocasin1@cluster0-gyc6q.gcp.mongodb.net/yayta?retryWrites=true&w=majority', {
  useNewUrlParser: true  , useUnifiedTopology: true
}); //THIS THIS IS LO QUE FUNCIONA LO QUE HACE TODO QUE TODO FUNCION REEEE



app.get("/", (req, res) => res.send("Esto es la API."));


//Para cada endpoint, se pasa data de la request. Todas las funciones devuelven un Javascript object, so pueden ser metidas en a json response
app.post("/api/GenerateJWT", (req, res) => { 
    let {header, claims, key } = req.body;
    key = key || "$Clavesupersecreta05" //En caso de que el cliente no mande llaves, usamos una default
    res.json(GenerateJWT(header, claims, key))
 })

app.post("/api/DecodeJWT", (req, res) => {  res.json(DecodeJWT(req.body.sJWS));  })

app.post("/api/ValidateJWT", (req, res) => {

    JWT = req.body.JWT
    key = "$Clavesupersecreta05"; //idem top
    let validation = (ValidateJWT(JWT))
    res.json(validation)

 })

 app.post("/api/users/signin", (req, res) => {
    const { Username, Password } = req.body
    
  if (typeof Users[req.body.Username] !== "undefined") {    
    if (Users[req.body.Username] === req.body.Password) { //Esto solo es posible porque en la fakeDB los users son keys y los passwords son value
      
        const header = { alg: "HS512", typ: "JWT"}
        const claims = { Username }
        const key = "$Clavesupersecreta05"

        res.json({ 
            Message: "Logueado exitoso",
            JWT: GenerateJWT(header, claims, key)
        });


    } else {
  
      res.status(403).json({
        Message: "Invalid Username or Password!"
      });
    }
  } else {
   
    res.status(403).json({
      Message: "User Not Found!"
    });
  }
});

 

app.use('/api', routes)
app.use('/api', pRoutes)
app.use('/api', cRoutes)


app.get("/api/items/findone", async (req, res) => {
      let { targetDb, targetCollection, name } = req.body
    
      try {
        Main.findOne(targetDb, targetCollection, name) ; res.status(200).send()
      }
       catch { res.status(404).send()}
    })

    app.get("/api/dbstatus", async (req, res) => {
      try { Main.getStatus(); res.status(200).send() } catch { res.status(500).send()} 
      
    })



app.listen(port, () => console.log(`Escuchando el puerto ${port}!`));

