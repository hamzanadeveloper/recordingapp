const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "donttellothers";
const defaultTTL = "7 days";

const verifyJWT = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
            if (error || !decoded) {
                reject(error);
            } else {
                resolve(decoded);
            }
        });
    });
};

const createJWT = payload => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            secret,
            {
                expiresIn: defaultTTL
            },
            (error, token) => {
                if (error || !token) {
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    verifyJWT,
    createJWT
};
