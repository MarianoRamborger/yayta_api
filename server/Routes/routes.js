const express = require('express');
const UserModel = require('../Models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const _ = require('lodash')
const {User, validateUser, validatePassword} = UserModel
const { GenerateJWT, DecodeJWT, ValidateJWT } = require("../dec-enc.js")


// LIST USERS

router.get('/users/read', async (req, res) => {
  const users = await User.find({});

  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.get('/users/findone', async (req, res) => {
    const user = await User.find({email: req.body.email});
  
    try {
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });


// CREATE USER

router.post('/users/create', async (req, res) => {
    // First Validate The Request
    const { error } = await validateUser(req.body);
    console.log(error)
     
    try {
    if (error) {
    
        return res.status(400).send();
    }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        //Encriptadou
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)


        await user.save();
        res.send(user);
    }
    }
    catch (err) {
            res.status(500).send("tu código falló maquinola")
    }

});

// AUTHENTICATE USER

router.post('/users/auth', async (req, res) => {
     
    try {
        const {error} = validatePassword(req.body);
    // is user request valid?  
    if (error) { return res.status(400).send("User REQUEST could not be authenticated.")}
    //Is the user present @ database?
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }
    // Actual validation.
    const comparePassword = await bcrypt.compare(req.body.password, user.password)
    if (!comparePassword) { return res.status(400).send("Password incorrecto; cambiar para no dar info de que es el password lo que está mal")}

    // JWT GENERATION
    const claims =  req.body.email 
    res.json({ 
        Message: "Logueado exitoso",
        JWT: GenerateJWT(claims)    
    });
    }
    catch (err) { res.status(500).send("Fatal Server Error")}
})

router.put('/users/passchange', async (req, res) => {
    const {email, oldPassword, newPassword} = req.body
 
    try {
        
    let user = await User.findOne({email});
    if (!user){
        return res.status(400).send('User not found')
    }

    const comparePassword = await bcrypt.compare(oldPassword, user.password)
    if (!comparePassword)
    {
        return res.status(400).send('Wrong Password')
    } 
    else {
        let CnewPassword = newPassword ;
        if (typeof(CnewPassword === "string") && (CnewPassword.length > 4)) { 
            
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(CnewPassword, salt)
            await user.save() //Encriptar upon returning
            res.status(200).send("Password Cambiado exitosamente")
         }
         else return res.status(400).send("invalid password")
    }
    }
    catch {return res.status(500).send('Server Error')}

})


router.delete('/users/delete', async (req, res) => {
    const {email, password} = req.body
   
    try {
        
    let user = await User.findOne({email});
    if (!user){
        return res.status(400).send('User not found')
    }

    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword)
    {
        return res.status(400).send('Wrong Password')
    } 
    else {
          const result = await User.deleteOne({_id: user.id}) //atenti al lo-dash   https://vegibit.com/mongoose-crud-tutorial/#mongodb-schemas
          console.log(result)
          return res.status(200).send("Usuario eliminado de manera exitosa")
    }
    }
    catch {return res.status(500).send('Server Error')}

})



module.exports = router


