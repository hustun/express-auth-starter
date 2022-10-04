exports.secret = (req, res, next) => {
  return res.status(200).send('Secret page');
};

exports.me = (req, res, next) => {
  return res
    .status(200)
    .json({ isLoggedIn: true, username: req.user.username });
};
