'use strict';
const {
  Model
} = require('sequelize');

const { hashing } = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email has been used' },
      validate: {
        notEmpty: { msg: 'Email cannot be empty' },
        notNull: { msg: 'Email cannot be empty' }
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Fullname cannot be empty' },
        notNull: { msg: 'Fullname cannot be empty' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'password cannot be empty' },
        notNull: { msg: 'password cannot be empty' }
      }
    }
  }, {
    hooks: {
      beforeCreate: user => {
        const passwordHashed = hashing(user.password)
        user.password = passwordHashed
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};