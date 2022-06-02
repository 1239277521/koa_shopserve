
//引入路由
const Router = require("koa-router");

const router = new Router({prefix:"/users"});
const {
    userValidation,isResgisterValidation,crpyPassword,
    loginif
} = require("../middleware/user.middleware")
const {resgister,login} = require("../controller/user.controller")

router.post("/resgister",userValidation,isResgisterValidation,crpyPassword,resgister)
router.post("/login",userValidation,loginif,login)

module.exports = router