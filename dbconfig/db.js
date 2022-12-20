const pg = require('pg');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const urlDB = process.env.URL_DB

const sequelize = new Sequelize(urlDB);

const Player = sequelize.define('player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
},{
  freezeTableName: true
  },
  {
  timestamps: false
  },
 {
});



process.on('SIGINT', async () => {
  await sequelize.close();
  console.log('Connection to DB closed')
  process.exit()
})

module.exports = {
  sequelize,
  Player,
}