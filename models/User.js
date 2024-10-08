const { Model, DataTypes } = require('sequelize'); // import Model and Datatypes classes from Sequelize.
const bcrypt = require('bcrypt'); // import bcrypt library for hashing and comparing passwords
const sequelize = require('../config/connection'); // imports database connections 

// Define class user extend model to represent a table in database  
class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginpw, this.pasword);
    }
}
// user table initialize
// user id, user name, user password and user email defined.
//constrains are defined
User.init({
    id: {
        type: DataTypes.INTEGER,
        allownull: false,
        primaryKey: true,
        autoIcrement: true,

    },
    // depends on our preferences, we can delete it or we can keep it. we will decide later about keeping user name and surname in our database 
    // name: {
    //     type: Datatypes.STRING,
    //   allownull: true,

    // },
    email: {
        type: DataTypes.STRING,
        allownull: false,
        unique: true,
        validate: {
            isemail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allownull: false,
        validate: {
            len: [8],
        }
    },
    },
    {
        sequelize, // DB connection instance (from import) 
        timestamps: false,
        freezeTableName: true, // Assures modelName is name of table in sql
        underscored: true,
        modelName: 'user'

    }
)
module.exports = User