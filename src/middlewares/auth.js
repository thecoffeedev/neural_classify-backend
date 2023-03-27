const jwt = require("jsonwebtoken");

const TokenValidation = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error();
    }

    req.user = {
      token: token,
      userId: decoded._id,
      email: decoded.email,
      name: decoded.name,
    }
    
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = TokenValidation;