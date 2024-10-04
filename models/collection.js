const { Model, Datatypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class collection extends Model{
    checkPassword (loginPw) {
        return bcrypt.compareSync(loginPw, this.pasword);
    }
}

collection.init (
    {
        
    }
)