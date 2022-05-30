//定义数据类型
const {DataTypes} = require("sequelize")

//导入seq对象
const seq = require('../db/seq');

//定义模型变量
const User = seq.define('shopServe_User',{
    //第二个参数，模型的属性 也就是表的字段
    user_name:{
        type:DataTypes.STRING,//字段类型
        allowNull:false,
        unique:true,//是否唯一
        comment:"用户名"//表的注释
    },
    password:{
        type:DataTypes.CHAR(64),
        allowNull:false,
        comment:"密码"
    },
    is_admin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        comment:"是否管理员 0 false 1 true",
        defaultValue:0
    }
})

//强制同步数据库（创建数据表）
// User.sync({force:true})
module.exports = User