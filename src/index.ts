import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
const bodyparser = require('koa-bodyparser')

import { amqpAccept, amqpSend } from './amqp'

const app = new Koa()
const router = new KoaRouter()

const accept = new amqpAccept()
const send = new amqpSend()

app.use(bodyparser())
;(async () => {
    await accept.accept('hello')
})()

router.get('/', async (ctx, next) => {
    const msg = await send.createChannel('hello', 'hello world', 'success')
    ctx.body = msg.content.toString()
    next()
})

app.on('error', (err) => {
    console.log(err)
})

app.use(router.routes()).use(router.allowedMethods()).listen(3001)
