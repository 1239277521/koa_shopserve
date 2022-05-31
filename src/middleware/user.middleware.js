//定义中间件
const bcrypt = require('bcrypt');
const { getUserinfo } = require("../service/user.service")
const { userformatter, userAlready,userRegistered} = require("../constants/user.constants") //定义ctxbody的常量内容
const userValidation = async (ctx, next) => {
    const {
        user_name,
        password
    } = ctx.request.body

    //合法性
    if (!user_name || !password) {
        // 用户名密码要符合规范
        ctx.app.emit("error", userformatter, ctx)
        return
    }
    await next();
}
const isResgisterValidation = async (ctx, next) => {
    const { user_name } = ctx.request.body
    try {
        const res = await getUserinfo({ user_name })
        if (res) {
            console.error("用户名已存在",{user_name})
            ctx.app.emit("error", userAlready, ctx)
            return
        }
    } catch (err) {
        ctx.app.emit("error", userRegistered, ctx)
        return
    }
    await next();
}
const crpyPassword = async (ctx, next) => {
    const {password} = ctx.request.body
    const Salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, Salt);
    ctx.request.body.password = hash
    await next();
}
module.exports = {
    userValidation,
    isResgisterValidation,
    crpyPassword
}