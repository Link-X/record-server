import * as Koa from 'koa'
const bodyparser = require('koa-bodyparser')

import amqp from './amqp-send'

const app = new Koa()
app.use(bodyparser())

const amqpObj = new amqp()

app.use(async (ctx, ctq) => {
    const msg = await amqpObj.createChannel('hello', 'hello world', 'success')
    ctx.body = msg.toString()
})

app.on('error', (err) => {
    console.log(err)
})

app.listen(3001)
