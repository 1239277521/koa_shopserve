const app = require("./app")

const {PORT} = require('./config/config.defalut')

app.listen(PORT,()=>{
    console.log("启动成功");
});