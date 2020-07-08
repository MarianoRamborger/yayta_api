const express = require('express');
const UserModel = require('../Models/User');
const productModel = require('../Models/Products');
const router = express.Router();
const Joi = require('@hapi/joi');
const _ = require('lodash')
const mercadopago = require ('mercadopago');
const {Product, validateProduct} = productModel
const {User, validateUser, validatePassword} = UserModel

//checkout route


mercadopago.configure({
    access_token: 'TEST-992414251321724-061019-acd83ceadd1553ea6b21d78d13820b3c-155337841'
  });
  

router.post('/checkout', async (req, res) => {
    const {user, cart} = req.body
  

    try {
        let DBuser = await User.findOne({email: user});

        if (!DBuser){
            return res.status(400).send('User not found')
        }
        

        let products = await Product.find({})
    
        if (!products) {
            return res.status(400).send('Products not found')
        }

        DBuser.shoppingCart = []
    
       cart.map (Cartproduct => {
           products.map(DBproduct => {
            
               if (Cartproduct.name === DBproduct.name){
                
                if (Cartproduct.cantidad <= DBproduct.stock || DBproduct.stock > 0) { 
    
                    DBuser.shoppingCart.push ({
                       
                        productId : DBproduct._id,
                        name : DBproduct.name,
                        type: DBproduct.type,
                        picture: DBproduct.picture,
                        price: DBproduct.price,
                        desc: DBproduct.desc,
                        cantidad:  Cartproduct.cantidad
    
                    })
                }
    
                else {
                    (console.log(`Falta stock de ${Dbproduct.name}`))
                    DBuser.shoppingCart.push ({
                        productId: DBproduct._id,
                        name : DBproduct.name,
                        type: DBproduct.type,
                        picture: DBproduct.picture,
                        price: DBproduct.price,
                        desc: DBproduct.desc,
                        cantidad:  Dbproduct.stock })
                }
               } 
           })               
       })
       
       let items = []

       DBuser.shoppingCart.map(item => {
         items.push({
                title: item.name,
                unit_price: item.price,
                quantity: item.cantidad          
         })
       })

       let preference = {items} 

    //    let backurls = { "back_urls": {
    //     "success": "wwww.google.com.ar",
    //     "failure": "wwww.google.com.ar",
    //     "pending": "wwww.google.com.ar"
    // },
    // "auto_return": "approved",
    // }

    //    let preference = {
    //    items: [
    //        {
    //          id: '1234',
    //          title: 'Lightweight Paper Table',
    //          quantity: 3,
    //          currency_id: 'ARS',
    //          unit_price: 55.41
    //        }
    //      ],
    //      "back_urls": {
    //         "success": "www.google.com.ar",
    //         "failure": "www.facebook.com",
    //         "pending": "http://www.tu-sitio/pending"
    //     },
    //     "auto_return": "approved",
    //   // ...
    // }
        
       
       mercadopago.preferences.create(preference)
        .then(function(response){

        global.init_point = response.body.init_point;
        // console.log(response)
        // console.log(response.body.sandbox_init_point)

        res.status(200).send(response.body.sandbox_init_point)
        //manda lo relevante. Una vez tenga las credenciales, va a tener que ser init point, no sandbox init point


        }).catch(function(error){
        console.log(error);
        });

        

    //    console.log(preference)

    //    res.status(200).send()

    }
    catch {
         res.status(500).send()  
        }

})




router.put('/cart/upload', async (req, res) => {
    const {user, cart} = req.body
 
    try {
        
    let DBuser = await User.findOne({email: user});

    if (!DBuser){
        return res.status(400).send('User not found')
    }
    let products = await Product.find({})

    if (!products) {
        return res.status(400).send('Products not found')
    }
    DBuser.shoppingCart = []

   cart.map (Cartproduct => {
       products.map(DBproduct => {
        
           if (Cartproduct.name === DBproduct.name){
            
            if (Cartproduct.cantidad <= DBproduct.stock || DBproduct.stock > 0) { 

                DBuser.shoppingCart.push ({
                   
                    productId : DBproduct._id,
                    name : DBproduct.name,
                    type: DBproduct.type,
                    picture: DBproduct.picture,
                    price: DBproduct.price,
                    desc: DBproduct.desc,
                    cantidad:  Cartproduct.cantidad

                })
            }

            else {
                (console.log(`Falta stock de ${Dbproduct.name}`))
                DBuser.shoppingCart.push ({
                    productId: DBproduct._id,
                    name : DBproduct.name,
                    type: DBproduct.type,
                    picture: DBproduct.picture,
                    price: DBproduct.price,
                    desc: DBproduct.desc,
                    cantidad:  Dbproduct.stock })
            }
           } 
       })
                   //CREAR OBJETOS NUEVOS PARA EL CARRITO, TOMA COMPRUEBA STOCK, Y TOMA PRECIO DE LA DB. TODO LO DEMAS  + CANTIDAD DEL CART DE LA PAG   
   })
   DBuser.save()
   
   return res.status(200).send(DBuser.shoppingCart)
}
    catch {
        return res.status(500).send('Server Error')
    }

})

router.post('/cart/download', async (req, res) => { 

    const user = req.body.user

    try {
        let DBuser = await User.findOne({email: user});

    if (!DBuser){
        return res.status(400).send('User not found')
    }
    return res.status(200).send(DBuser.shoppingCart)

    }
    catch {
    return res.status(500).send('Server Error')   
    }


})


module.exports = router