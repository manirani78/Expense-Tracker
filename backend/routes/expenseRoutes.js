const { verifyToken } = require("../middleware/auth");
const { create, findAll, update, delete: deleteExpense } = require("../controllers/expenseController");

module.exports = function(app) {
  app.post("/api/expenses", [verifyToken], create);
  app.get("/api/expenses", [verifyToken], findAll);
  app.put("/api/expenses/:id", [verifyToken], update);        // <-- add this line
  app.delete("/api/expenses/:id", [verifyToken], deleteExpense);
};
