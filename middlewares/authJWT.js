var jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    let token = req.headers["token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
        statusCode:"NP034",
        status:403
      });
    }

  
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
          statusCode:"NP031",
          status:401
        });
      }
      next();
    });
  };

const authJWT = {
    verifyToken :verifyToken
}
module.exports = authJWT;