const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      ...config.pool
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.js")(sequelize, Sequelize.DataTypes);
db.expense = require("./Expense.js")(sequelize, Sequelize.DataTypes);

// Define relationships
db.user.hasMany(db.expense, { as: "expenses" });
db.expense.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
});

module.exports = db;
