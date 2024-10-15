const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const marked = require('marked')
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);
class Card extends Model {}

Card.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      markdown_description: {
        type: DataTypes.TEXT
      }
    },
    {
      hooks: {
        beforeCreate: (newCardData) => {
          newCardData.markdown_description = dompurify.sanitize(marked.parse(newCardData.description)); 
          return newCardData;
        },
        beforeUpdate: (newCardData) => {
          newCardData.markdown_description = dompurify.sanitize(marked.parse(newCardData.description)); 
          return newCardData;
        }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'card',
    }
  );
  
  module.exports = Card; 
  