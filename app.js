const express = require("express");
const morgan = require("morgan")
const { GenerateJWT, DecodeJWT, ValidateJWT } = require("./dec-enc.js"); //importar solo estas funciones especificas por razones de seguridad.
const Users = require('./tempDB.js')
const bodyParser = require("body-parser")
const app = express();
const routes = require('./Routes/routes.js')
const pRoutes = require('./Routes/p-routes.js') ;
const cRoutes = require('./Routes/c-routes')
const Main = require("./mdb")
const { MongoClient } = require('mongodb');
var cors = require('cors');
var path = require('path');




// const uri = "mongodb+srv://yayta:mocasin1@cluster0-gyc6q.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {  useNewUrlParser: true, useUnifiedTopology: true })
const mongoose = require('mongoose');


app.use(express.json()) //middleware, parsea incoming requests con json payloads. Popula un objeto body en la request con la data parseada
app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const port = process.env.PORT || 3100;


  mongoose.connect('STRINGCONINFOSENSIBLEREMOVIDOPORSEGURIDAD', {
  useNewUrlParser: true  , useUnifiedTopology: true
}); //Setting up the connection to mDB via mongoose.



// Carga todas las rutas.

// app.get('/test', (req, res) => {

//   try {
//     res.send(test)
//   }
//   catch (err) {
//     res.send(err)
//   }

//  })


app.get('/', (req, res) => res.send("Acá se sirve la build."));

app.get('/api', (req, res) => res.send("Esto es la API."));

app.use('/api', routes)
app.use('/api', pRoutes)
app.use('/api', cRoutes)




//Para cada endpoint, se pasa data de la request. Todas las funciones devuelven un Javascript object, so pueden ser metidas en a json response
app.post("/api/GenerateJWT", (req, res) => { 
    let {header, claims, key } = req.body;
    key = key || "$CREMOVIDOPORSEGURIDAD" //En caso de que el cliente no mande llaves, usamos una default
    res.json(GenerateJWT(header, claims, key))
 })

app.post("/api/DecodeJWT", (req, res) => {  res.json(DecodeJWT(req.body.sJWS));  })

app.post("/api/ValidateJWT", (req, res) => {

    JWT = req.body.JWT
    key = "$REMOVIDOPORSEGURIDAD"; //idem top
    let validation = (ValidateJWT(JWT))
    res.json(validation)

 })

 app.post("/api/users/signin", (req, res) => {
    const { Username, Password } = req.body
    
  if (typeof Users[req.body.Username] !== "undefined") {    
    if (Users[req.body.Username] === req.body.Password) { //Esto solo es posible porque en la DB los users son keys y los passwords son value
      
        const header = { alg: "HS512", typ: "JWT"}
        const claims = { Username }
        const key = "$REMOVIDOPORSEGURIDAD"

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


app.use(express.static('public'))    

app.get("/int", (req, res) => {
  res.sendFile(__dirname + '/DBint/Int.html')
})



app.use(function(req, res) {

  res.status(404).send("404 not found")

});

app.listen(port, () => console.log(`Escuchando el puerto ${port}!`));

