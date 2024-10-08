const { Model, DataTypes } = require("sequelize"); // import Model and Datatypes classes from Sequelize.
const bcrypt = require("bcrypt"); // import bcrypt library for hashing and comparing passwords
const sequelize = require("../config/connection"); // imports database connections

// Define class user extend model to represent a table in database
class User extends Model {
  checkPassword(passwordProvided) {
    console.log("passwordPovided " + passwordProvided);
    console.log("this.password " + this.password);
    return bcrypt.compare(passwordProvided, this.pasword, function(err, result) {
        if(err){
            console.log(`error: ${err}`);
            return;
        }
        return result;
    });
  }

  static encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
}
// user table initialize
// user id, user name, user password and user email defined.
//constrains are defined
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true,
      validate: {
        isemail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allownull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // Before record creation, hash User.password value
      beforeCreate: async (newUserData) => {
        // Encrypt password
        newUserData.password = User.encryptPassword(newUserData.password);
        return newUserData;
      },
      beforeUpdate: async (newUserData) => {
        // Encrypt password
        newUserData.password = User.encryptPassword(newUserData.password);
        return newUserData;
      },
    },
    sequelize, // DB connection instance (from import)
    timestamps: false,
    freezeTableName: true, // Assures modelName is name of table in sql
    underscored: true,
    modelName: "user",
  }
);
module.exports = User;
