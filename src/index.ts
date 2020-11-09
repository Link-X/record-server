import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
const bodyparser = require('koa-bodyparser')

import amqpSend from './amqp-send'
import amqpAccept from './amqp-accept'

const app = new Koa()
const router = new KoaRouter()
const send = new amqpSend()
const accept = new amqpAccept()

app.use(bodyparser())
;(async () => {
    await accept.accept('hello')
})()

router.get('/', async (ctx, next) => {
    const msg = await send.createChannel('hello', 'hello world', 'success')
    console.log('msg', msg)
    ctx.body = msg.content.toString()
})

app.on('error', (err) => {
    console.log(err)
})

app.use(router.routes()).use(router.allowedMethods()).listen(3001)


