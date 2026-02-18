const jwt = require("jsonwebtoken");

async function authArtist(req,res, next){
        
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json
    }
}