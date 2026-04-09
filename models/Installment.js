const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Installment = sequelize.define('Installment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  batchId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amountDue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Paid', 'Overdue'),
    defaultValue: 'Pending'
  },
  paidDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  timestamps: true,
});

module.exports = Installment;
