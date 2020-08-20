const Joi = require('@hapi/joi')
const mongoose = require('mongoose')



const test = () => {
    return console.log(mongoose) 
}


// const UserSchema = new mongoose.Schema({
// //Soluciones? Sacar el new, da otro error.
//     name: {
//         type: String,
//         required: true,
//         minlength: 4,
//         maxlength: 25,
//         trim: true
//     },

//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 5,
//         maxlength: 150,
//         unique: true
//     },
//     password: {
//         type: String,
//         trim: true,
//         required: true,
//         minlength: 5,
//         maxlength: 255
//     },
//     phone: {
//         type: String,
//         trim: true,
//         required: true,
//         minlength: 6,
//         maxlength: 17
//     },
//     shoppingCart: {
//         type: Array,
//         default: [],
//         required: false
//     }

// })

// const User = mongoose.model("user", UserSchema) //this is donde lo guarda dentro de la db


// const validateUser = (user) => {
    
//         const schema = Joi.object({
//             name: Joi.string().min(4).max(25).required(),
//             email: Joi.string().min(5).max(150).required().email(),
//             password: Joi.string().min(5).max(255).required(),
//             phone: Joi.string().min(6).max(17).required(),
//             shoppingcart: Joi.array()
//         })
     
        
//         return schema.validate(user)
// }


// const validatePassword = (request) => {
//     console.log(request)
//     const schema = Joi.object({
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(5).max(255).required()
//     });
 
//     console.log(schema.validate(request))
//     return schema.validate(request);
// }

// module.exports = { User, validateUser, validatePassword}

module.exports = test
