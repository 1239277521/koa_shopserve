const User = require("../model/user.model")
//数据库操作
class UserService {
    async createUser(user_name, password) {
        // //todo：写入数据库
        const res = await User.create({ user_name, password })
        return res.dataValues
    }
    async getUserinfo({
        id,
        user_name,
        password,
        is_admin
    }) {
        const whereOpt = {}

        id && Object.assign(whereOpt, { id })

        user_name && Object.assign(whereOpt, { user_name })

        password && Object.assign(whereOpt, { password })

        is_admin && Object.assign(whereOpt, { is_admin })

        const res = await User.findOne({
            attributes: ["id", "user_name", "password", "is_admin"],
            where: whereOpt
        })

        return res ? res : null

    }
};
module.exports = new UserService();