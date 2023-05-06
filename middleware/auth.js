const { UnauthentictedError } = require('../errors/index');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthentictedError('No token');
  }

  const token = authHeader.split(' ')[1];
  console.log(req.headers.authorization);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = {
      id,
      username,
    };
    next();
  } catch (error) {
    throw new UnauthentictedError('Not authorized to access this route');
  }
};

module.exports = authenticationMiddleware;
