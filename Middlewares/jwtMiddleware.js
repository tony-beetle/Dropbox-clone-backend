const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("inside jwt verification");
    const token = req.headers['authorization'].split(" ")[1]
    if (!token) {
      return res.status(403).send({ message: "A token is required for authentication" })}
    try {
      const decoded = jwt.verify(token,"superSecretKey123");
      req.user = decoded;
      console.log(decoded);
    } catch (err) {
      return res.status(401).send({ message: "Invalid Token" });
    }
    return next();
  };
  
  module.exports = verifyToken;