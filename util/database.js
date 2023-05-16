const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, '', { 
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;


