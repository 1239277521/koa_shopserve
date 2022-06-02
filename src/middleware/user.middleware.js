//定义中间件
const bcrypt = require('bcrypt');
const { getUserinfo } = require("../service/user.service")
const {
    userformatter,
    userAlready,
    userRegistered,
    userNameNotFind,
    userLoginError,
    userPasswordError
} = require("../constants/user.constants") //定义ctxbody的常量内容
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
            console.error("用户名已存在", { user_name })
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
    const { password } = ctx.request.body
    const Salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, Salt);
    ctx.request.body.password = hash
    await next();
}
const loginif = async (ctx, next) => {
    //登录的中间件
    // 1。判断用户是否存在（不存在：报错）
    // 2.判断用户名密码是否正确
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUserinfo({ user_name })
        if (!res) {
            console.error("用户名不存在", { user_name })
            ctx.app.emit("error", userNameNotFind, ctx)
            return
        }
        
        //传过来的密码和数据库的密码是否匹配 bcrypt.compareSync 是bcrypt内置方法
        if(!bcrypt.compareSync(password, res.password)){
            // 不匹配则报错，结束
            console.error("用户名或密码错误", { user_name })
            ctx.app.emit("error", userPasswordError, ctx)
            return
        }
    } catch (err) {
        ctx.app.emit("error", userLoginError, ctx)
        return
    }


    await next();
}
module.exports = {
    userValidation,
    isResgisterValidation,
    crpyPassword,
    loginif
}