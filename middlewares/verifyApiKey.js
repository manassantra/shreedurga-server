require('dotenv').config({path: './config/.dev.env'});

const verifyApiToken = async(req, res, next) => {
    try {
      if (req.headers['apikey'] === process.env.API_SECRET) {
        next();
      } else {
        res.send({ status: 401, error: "Unauthorized Backend Access !"});
      }
    } catch (err) {
      res.status(400).send({status: 400, error: err.message});
    }
  };


module.exports = verifyApiToken;