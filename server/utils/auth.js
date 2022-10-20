const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const expiration = '2h';
console.log(secret);

module.exports = {
    // function for our authenticated routes
    authMiddleware: function ({ req }) {
      // allows token to be sent via  req.query or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
    
        // ["Bearer", "<tokenvalue>"]
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }
    
        if (!token) {
            return req;
        }
    
        // verify token and get user data out of it
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch (error){
            console.log(error);
            return res.status(400).json({ message: 'invalid token!' });
        }
    
        // send to next endpoint
        return req;
        },
        signToken: function ({ email, _id }) {
        const payload = { email, _id };
    
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
        },
};   