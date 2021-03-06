const express = require('express');
const productModel = require('../Models/Products');
const router = express.Router();
const Joi = require('@hapi/joi');
const _ = require('lodash')
const path = require("path")
const bodyParser = require("body-parser")

const {Product, validateProduct} = productModel


//Products Route

//List all.
router.get('/products/getall', async (req, res) => {
    const products = await Product.find({});
  
    try {
      res.send(products);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  // List One

  router.get('/products/getproduct', async (req, res) => {

      try {
        let product = await Product.findOne({ name: req.body.name})
        if (product) {
            res.send(product)
        }
        else (res.status(404).send("Ningún producto con ese nombre existe en la base de datos."))
      }
      catch {
          res.status(500).send("Error de conexión con el servidor.")

      }
  })



  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());

    // list for db interface
  router.post('/products/getproduct', async (req, res) => {

    console.log(req.body)

    

    try {
      let product = await Product.findOne({ name: req.body.name})
      if (product) {
          res.send(product)
      }
      else (res.status(404).send("Ningún producto con ese nombre existe en la base de datos."))
    }
    catch {
        res.status(500).send("Error de conexión con el servidor.")

    }
})

// Create

  router.post('/products/create', async (req, res) => {
    // First Validate The Request
    const { error } = await validateProduct(req.body);
    try {    
    if (error) {
        console.log(error)
        return res.status(400).send();
    }
    // Check if this user already exisits
    let product = await Product.findOne({ name: req.body.name });
    if (product) {
        return res.status(400).send('Ya existe un producto con ese nombre.');
    } else {
        // Insert the new user if they do not exist yet
        product = new Product({
            name: req.body.name,
            type: req.body.type,
            picture: req.body.picture,
            price: req.body.price,
            stock: req.body.stock,
            onSale: req.body.onSale,
            desc: req.body.desc,
            weight: req.body.weight  
              
        });
        await product.save();
        res.send(product);
    }
    }
    catch (err) {
            console.log(err)
            res.status(500).send("Algo salió mal. Por favor, revisar todos los campos. Gracias!")
    }

});


// Update
router.put('/products/updateproduct', async (req, res) => {
    const {name, type, picture, price, stock, onSale, desc, weight} = req.body
 
    try {
        
    let product = await Product.findOne({name});
    if (!product){
        return res.status(400).send('No se han encontrado productos con ese nombre')
    }

    else {
        if (type) {product.type = type};
        if (picture) {product.picture = picture}
        if (price) {product.price = price}
        if (stock) {product.stock = stock}
        if (onSale) {product.onSale = onSale}
        if (desc) {product.desc = desc}
        if (weight) {product.weight = weight}

        await product.save()
        res.status(200).send(product)
    }}
    catch {return res.status(500).send('Por favor, revise que todos los campos sean correctos')}
})

router.delete('/products/deleteproduct', async (req, res) => {
    const {name} = req.body
    try {
        
    let product = await Product.findOne({name});
    if (!product){
        return res.status(400).send('Producto no encontrado')
    }

    else {
          const result = await Product.deleteOne({_id: product.id}) //atenti al lo-dash   https://vegibit.com/mongoose-crud-tutorial/#mongodb-schemas
          console.log(result)
          return res.status(200).send("Producto eliminado de manera exitosa")
    }
    }
    catch {return res.status(500).send('Server Error')}

})


//DB interface

router.get('/int-list', async (req, res) => {
    let reqPath = path.join(__dirname, '../DBint/int-list.html')
    res.sendFile(reqPath)
})

router.get('/int-up', async (req, res) => {
    let reqPath = path.join(__dirname, '../DBint/int-up.html')
    res.sendFile(reqPath)
})

router.get('/int-del', async (req, res) => {
    let reqPath = path.join(__dirname, '../DBint/Int-del.html')
    res.sendFile(reqPath)
})

router.get('/int-add', async (req, res) => {
    let reqPath = path.join(__dirname, '../DBint/Int-add.html')
    res.sendFile(reqPath)
})


module.exports = router