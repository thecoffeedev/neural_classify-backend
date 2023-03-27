const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /users/register
const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).send({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new Users({
      email,
      name,
      password: hashedPassword,
    });
    await newUser.save();
    const token = await jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(201).send({ user: newUser, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

// POST /users/login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    // bcrypt password compare
    console.log(user)
    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const token = await jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.send({ user, token, message: 'Login successful' });
  } catch (e) {
    res.status(400).send({ error: 'Invalid login credentials' });
  }
};


module.exports = {
  register,
  login
};
