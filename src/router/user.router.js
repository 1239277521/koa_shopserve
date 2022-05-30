
//引入路由
const Router = require("koa-router");

const router = new Router({prefix:"/users"});
const {userValidation,isResgisterValidation} = require("../middleware/user.middleware")
const {resgister,login} = require("../controller/user.controller")

router.post("/resgister",userValidation,isResgisterValidation,resgister)
router.post("/login",login)

module.exports = router