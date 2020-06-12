const Joi = require('@hapi/joi')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
        trim: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
        required: true,

    },
    picture: {
        type: String,
        minlength: 10,
        maxlength: 300,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    onSale: { 
        type: Boolean,
        required: true

    },
    desc : {
        type: String,
        required: true
    }

})

const Product = mongoose.model("product", productSchema)

const validateProduct = (product) => {
    const pSchema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        type: Joi.string().min(4).max(50).required(),
        picture: Joi.string().min(4).max(300).required(),
        price: Joi.number().required(),
        stock: Joi.number().required(),
        onSale: Joi.boolean().required(),
        desc: Joi.string().required()
    })  

    return pSchema.validate(product)
}

module.exports = {Product, validateProduct}