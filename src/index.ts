import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
const bodyparser = require('koa-bodyparser')

import { amqpAccept, amqpSend } from './utils'

const app = new Koa()
const router = new KoaRouter()

const accept = new amqpAccept({ acceptName: 'recordData' })
const send = new amqpSend()

app.use(bodyparser())

router.get('/', async (ctx, next) => {
    const msg = await send.createChannel('recordData', { data: [{ a: 1 }] }, 'success')
    ctx.body = msg.content.toString()
    next()
})

app.on('error', (err) => {
    console.log(err)
})

app.use(router.routes()).use(router.allowedMethods()).listen(3001)
