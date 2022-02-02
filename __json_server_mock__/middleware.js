module.exports = (req, res, next) => {
  console.log(req.path);
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "admin" && req.body.password === "admin") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({
        message: "账号密码不正确",
      });
    }
  }
  next();
};
