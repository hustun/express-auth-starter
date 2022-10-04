const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        // Error verifying token
        console.log(err);
        return res
          .status(401)
          .json({ isLoggedIn: false, message: 'Failed to authenticate' });
      }
      req.user = {};
      req.user.id = success.id;
      req.user.username = success.username;
      next();
    });
  } else {
    res.status(400).json({ isLoggedIn: false, message: 'Bad token' });
  }
};
