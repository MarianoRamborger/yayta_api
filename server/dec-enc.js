
const JSONWEBTOKEN = require("jsonwebtoken")

const key = "$Clavesupersecreta05"
    const algorithm = "HS512"

const GenerateJWT = (claims) => { 
    
     const sPayload = JSON.stringify(claims);


    const  JWT = JSONWEBTOKEN.sign(sPayload, key, { algorithm: 'HS512'} , {expiresIn: '1s'})


    return JWT
}

//Splitea el en sus partes, las parsea, devuelve el payload
const DecodeJWT = (sJWS) => {

  
    const token = JWT
    

    // console.log(` VERIFICATION ${JSONWEBTOKEN.verify(token, key, [algorithm])}`)

    try {
        return JSONWEBTOKEN.verify(token, key, [algorithm])
    }
    catch (err) { return err}
    
 }

 // Valida el JWT, para asegurarse que no haya sido tampereado.
const ValidateJWT = (JWT) => { 
    
    const token = JWT
    

    try {
        
        return JSONWEBTOKEN.verify(token, key, [algorithm])
    } catch(err) { return "ERROR"}
    

    
    
    
  
}

module.exports = {
    GenerateJWT,
    DecodeJWT,
    ValidateJWT
}
