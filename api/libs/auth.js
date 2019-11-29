const jwt = require("jsonwebtoken")

const secret = process.env.JWT_SECRET || "donttellothers";
const defaultTTL = "2s"

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
        jwt.sign(payload, secret, {
            expiresIn: defaultTTL
        }, (error, token) => {
            if (error || !token) {
                reject(error);
            } else {
                resolve(token);
            }
        })
    });
}

// snippet testing expiration
// const content = { data: "stuff" };
// let gen = null;
// createJWT(content)
// .then(token => {
//     console.log(token);
//     gen = token;
//     return verifyJWT(token);
// })
// .then(result => {
//     console.log(result);
// })
// .catch(error => {
//     console.log(error);
// })

// setTimeout(() => {
//     console.log("3s later");
//     verifyJWT(gen)
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.log(error);
//     })
// }, 3000);

module.exports = {
    verifyJWT,
    createJWT
}