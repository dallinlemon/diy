DROP DATABASE IF EXISTS DIYBudgetData;
CREATE DATABASE DIYBudgetData;
USE DIYBudgetData;
CREATE TABLE TransactionHistory (
  TransactionID int NOT NULL IDENTITY(1,1),
  TransactionType varchar(50) NOT NULL,
  TransactionAmount decimal(18,2) NOT NULL,
  TransactionDate datetime NOT NULL,
  PRIMARY KEY (TransactionID)
)