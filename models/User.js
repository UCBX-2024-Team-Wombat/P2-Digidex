const { Model, Datatypes } = require('sequelize'); // import Model and Datatypes classes from Sequelize.
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
        type: Datatypes.INTEGER,
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
        type: Datatypes.STRING,
        allownull: false,
        unique: true,
        validate: {
            isemail: true,
        }
    },
    password: {
        type: Datatypes.STRING,
        allownull: false,
        validate: {
            len: [8],
        }
    },
   

},
{
    // add hooks for hashing password before creating or updating user
    hooks: {
        // hook runs before a new user is created
        beforeCreate: async (newUserData) => {
            //Hash the psw before saving the new user to db
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        
        
    }
},

)
module.exports = User