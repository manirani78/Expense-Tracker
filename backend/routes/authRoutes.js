const { signup, signin } = require("../controllers/authController");

module.exports = function(app) {
  app.post("/api/auth/signup", signup);
  app.post("/api/auth/signin", signin);
};
