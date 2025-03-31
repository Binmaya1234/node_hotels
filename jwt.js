const jwt = require('jsonwebtoken');


const jwtAuthMiddleware =  (req, res, next)=>{
    // first check request headers has authorization or not
    const authorization = req.header('Authorization');
    if(!authorization){
        return res.status(401).json({ error: 'Token not found!' });
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    if(!token){
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log(data);
        req.user = data;
        next();
    }catch(err){
        res.status(401).json({ error: 'Invalid token' });
    }
  
}
const generateToken = (data) => {
    return jwt.sign({ user: data }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};
module.exports = {jwtAuthMiddleware, generateToken};