const jwt = require('jsonwebtoken');

const generarJWT = (uid,name,next)=>{
    
    const payload = {uid,name};

    return new Promise( (resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '30d',
        }, (err, token) => {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });

    })
}

module.exports = generarJWT;