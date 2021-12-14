const { checkAccessToken } = require("../utils/tokenFunctions");
const { User } = require("../models");

const authorization = async (req, res, next) => {
  const { accessToken } = req.cookies;
  console.log(accessToken);

  if (!accessToken) {
    return res.status(401).send("Not exist token");
  }

  const accessTokenData = checkAccessToken(accessToken);

  const userInfo = await User.findOne({
    where: { id: accessTokenData.id },
  });

  if (!userInfo) {
    return res.status(401).send("Not exist user");
  }

  if (accessTokenData.exp <= Date.now() / 1000) {
    return res.status(401).send("Expiration");
  }

  req.id = accessTokenData.id;
  next();
};

module.exports = authorization;
