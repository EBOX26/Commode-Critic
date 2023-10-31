const Sequelize = require('sequelize');
require('dotenv').config();

let sequilize;

if (process.env.JAWSDB_URL) {
    sequilize = new Sequilize(process.env.JAWSDB_URL);
} else {
    sequilize = new Sequilize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequilize;

