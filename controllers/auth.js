const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.login = (req, res, next) => {
  const user = req.body;

  if (!user.username || !user.password) {
    return res.status(400).json({
      message: 'Bad payload',
    });
  }

  User.findOne({ username: user.username }).then((dbUser) => {
    if (!dbUser) {
      return res.status(400).json({
        message: 'Invalid username or password',
      });
    }

    bcrypt.compare(user.password, dbUser.password).then((success) => {
      if (success) {
        const payload = {
          id: dbUser._id,
          username: dbUser.username,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: '7d',
          },
          (err, token) => {
            if (err) {
              // Error generating token
              console.log(err);
              return res.status(500).json({ message: 'Login error' });
            }
            return res.status(200).json({
              message: 'Success',
              token: 'Bearer ' + token,
            });
          }
        );
      }
    });
  });
};

exports.register = async (req, res, next) => {
  console.log('hey');
  const user = req.body;
  console.log(user);

  if (user.username && user.password) {
    const isUsernameTaken = await User.findOne({ username: user.username });

    if (isUsernameTaken) {
      res.status(409).json({ message: 'Username already exists' });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: user.username.toLowerCase(),
        password: user.password,
      });

      newUser.save();
      res.status(200).json({ message: 'Success' });
    }
  } else {
    return res.status(400).json({ message: 'Bad payload' });
  }
};
