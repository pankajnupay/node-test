
verifyAPIKey = (req,res,next) => {
  let apiKey = req.headers["api-key"];
  console.log(req.body)
  if (!apiKey) {
    return res.status(403).send({
      message: "No APIKey provided!"
    });
  }
  if(apiKey!="BHFSOSsfeb84r8grv4f8sfsv8"){
    return res.status(403).send({
      message: "Invalid APIKey !"
    });
  }
  next();

  // Billers.findOne({apiKey:apiKey})
  // .then(biller =>{
  //   if(!biller){
  //     return res.status(403).send({
  //       message: "Invalid APIKey !"
  //     });
  //   }
  //   next();
  // }).catch(err=> res.send(err))
   
}
 

const authAPI = {
  verifyAPIKey:verifyAPIKey,
}
module.exports = authAPI;