import jwt from 'jsonwebtoken';

export const createJWT = ( uid = '' ) => {
    return new Promise( ( resolve, reject ) => {
       const payload = { uid };

         jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '4h'
       }, (err, token) => {
            if (err) {
                console.log(err);
                reject(`Ups, wasn't possible to generate the token`);
            } else {
                resolve( token );
            }
         })
    });
};