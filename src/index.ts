import * as Koa from 'koa'
import router from './router/index'
const bodyparser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyparser())

app.on('error', (err) => {
    console.log(err)
})

app.use(router.routes()).use(router.allowedMethods()).listen(3001)
