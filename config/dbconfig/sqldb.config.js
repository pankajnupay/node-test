const Sequelize = require('sequelize');
var sqldb = {};
//TODO: Forced Sync True https://sequelize.org/master/manual/model-instances.html
// const sequelize = new Sequelize('vnupay', 'PankajR', 'Pankaj@Nupay1', {
//     //host: "localhost",
//     host: "172.31.32.77",
//     port: 3306,
//     dialect: 'mysql',
//     operatorsAliases: false,

//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }

// });
const sequelize = new Sequelize('vnupay', 'root', '', {
    //host: "localhost",
    host: "localhost",
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});

sqldb.sequelize = sequelize;
sqldb.Sequelize = Sequelize;

module.exports = sqldb;
