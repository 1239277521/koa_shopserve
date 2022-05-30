const { Sequelize } = require("sequelize")
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = require('../config/config.defalut')
//库名，用户名，密码
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host:MYSQL_HOST,
    dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});

// seq.authenticate().then(() => {
//     console.log("数据库连接成功")
// }).catch(() => {
//     console.log("数据库连接失败")
// });
module.exports = seq