const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Collection extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.pasword);
    }
}

Collection.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Datatypes.STRING,
            allownull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        }
    }
)
module.export = Collection

