const jwt = require("jsonwebtoken")

const secret = process.env.JWT_SECRET || "donttellothers";

const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
            if (error || !decoded) {
                reject(error);
            } else {
                resolve(decoded);
            }
        })
    });
}

const createJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, (error, token) => {
            if (error || !token) {
                reject(error);
            } else {
                resolve(token);
            }
        })
    });
}

// const content = "stuff";
// createJWT(content)
// .then(token => {
//     console.log(token);
//     return verifyJWT(token);
// })
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.log(error);
// })

module.exports = {
    verifyJWTToken
}