const db = require("../models");
const Expense = db.expense;

exports.create = (req, res) => {
  Expense.create({
    title: req.body.title,
    amount: req.body.amount,
    date: req.body.date,
    category: req.body.category,
    notes: req.body.notes,
    userId: req.userId
  })
    .then(expense => {
      res.send({ message: "Expense was added successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Expense.findAll({ where: { userId: req.userId } })
    .then(expenses => {
      res.send(expenses);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Expense.update(req.body, {
    where: { id: id, userId: req.userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Expense was updated successfully." });
      } else {
        res.status(404).send({ message: `Cannot update expense with id=${id}. Maybe expense not found or user unauthorized.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating expense with id=" + id });
    });
};

exports.delete = (req, res) => {
  Expense.destroy({
    where: {
      id: req.params.id,
      userId: req.userId
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Expense was deleted successfully!" });
      } else {
        res.status(404).send({ message: "Expense not found!" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
