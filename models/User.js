const { Model, Datatypes }= require('sequelize'); // import Model and Datatypes classes from Sequelize.
const bcrypt = require ( 'bcrypt' ); // import bcrypt library for hashing and comparing passwords
const sequelize = require('../config/connection'); // imports database connections 

// Define class user extend model to represent a table in database  user sinifi artik bir tabloda temsil ediliyo database de 
class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginpw, this.pasword);
    }
}