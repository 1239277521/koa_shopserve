const Koa = require('koa');

const app = new Koa();

const json = require("koa-json")

app.use(json());

const koaBody = require("koa-body")

const useRouter = require('../router/user.router')
app.use(koaBody())
app.use(useRouter.routes())

module.exports = app
