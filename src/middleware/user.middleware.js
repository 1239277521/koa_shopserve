//定义中间件
const {getUserinfo} = require("../service/user.service")
const userValidation = async (ctx, next) => {
    const {
        user_name,
        password
    } = ctx.request.body
   
    //合法性
    if (!user_name || !password) {
        // 用户名密码要符合规范
        console.error("用户名或密码为空", ctx.request.body)
        ctx.status = 409
        ctx.body = {
            code: "10001",
            status: 409,
            Message: "注册失败,用户名或密码为空",
            result: ""
        }
        return
    }
    await next();
}
const isResgisterValidation = async (ctx, next) => {
    const {
        user_name
    } = ctx.request.body
   
    console.log("await",getUserinfo({ user_name }))
    // 合理性
    if (await getUserinfo({ user_name })) {
        ctx.status = 409
        ctx.body = {
            code: "10002",
            status: 409,
            Message: "注册失败,用户名已注册",
            result: ""
        }
        return
    }
    await next();
}

module.exports = {
    userValidation,
    isResgisterValidation
}