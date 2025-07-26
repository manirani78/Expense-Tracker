module.exports = (sequelize, Sequelize) => {
  const Expense = sequelize.define("expense", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return Expense;
};
