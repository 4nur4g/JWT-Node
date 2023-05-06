const { use } = require('../routes/main');
const { BadRequestError } = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;

  // console.log(username, password, res.body);

  if (!username || !password) {
    throw new BadRequestError('Please provide username and password');
  }

  const id = new Date().getTime(); //Normally provided by DB
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorised data, your lucky number is ${luckyNumber}`,
  });

  // console.log('Token from frontend', token);
};

module.exports = {
  login,
  dashboard,
};
