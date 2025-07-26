
-- Table Structures
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed Users
INSERT INTO users (id, name, email, password) VALUES
(1, 'Alice Johnson', 'alice@example.com', '$2b$10$O7XghXhz2f1FDbZC1RKyKuUN8FcfX2n8U9UvOvNoYRe9klM1hjOzW'),
(2, 'Bob Smith', 'bob@example.com', '$2b$10$O7XghXhz2f1FDbZC1RKyKuUN8FcfX2n8U9UvOvNoYRe9klM1hjOzW'),
(3, 'Charlie Doe', 'charlie@example.com', '$2b$10$O7XghXhz2f1FDbZC1RKyKuUN8FcfX2n8U9UvOvNoYRe9klM1hjOzW');

-- Seed Expenses
INSERT INTO expenses (id, userId, title, category, amount, date, notes) VALUES
(1, 1, 'Groceries', 'Food', 85.50, '2025-07-01', 'Weekly grocery run'),
(2, 1, 'Bus Pass', 'Transport', 45.00, '2025-07-03', 'Monthly pass'),
(3, 2, 'Gym Membership', 'Health', 60.00, '2025-07-02', 'One month'),
(4, 3, 'Electric Bill', 'Utilities', 120.00, '2025-07-05', 'July usage'),
(5, 1, 'Coffee', 'Food', 5.75, '2025-07-04', 'Starbucks coffee'),
(6, 2, 'Movie Night', 'Entertainment', 15.00, '2025-07-06', 'Cinema ticket'),
(7, 3, 'Laptop Repair', 'Tech', 250.00, '2025-07-07', 'Replaced battery');
