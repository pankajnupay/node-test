var jwt = require("jsonwebtoken");

exports.generateToken = (req,res) => {
  let apiKey = req.headers["api-key"];
  if (!apiKey) {
    return res.status(403).send({
      message: "No APIKey provided!"
    });
  }
  var token = jwt.sign({apiKey:apiKey}, process.env.SECRET,{ expiresIn: '1d' });
  res.send({
    token:token
  })
}