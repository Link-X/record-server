import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
const bodyparser = require('koa-bodyparser')

import { amqpAccept, amqpSend } from './utils'

const app = new Koa()
const router = new KoaRouter()

new amqpAccept({ acceptName: 'recordData' })
const send = new amqpSend()

app.use(bodyparser())

router.post('/send-dom-record', async (ctx, next) => {
    const { body } = ctx.request as any
    try {
        const msg = await send.createChannel('recordData', body, 'success')
        ctx.body = msg.content.toString()
        ctx.body = { code: 0 }
        next()
    } catch (err) {
        ctx.body = { code: -1 }
        next()
    }
})

router.post('/send-error-record', async (ctx, next) => {
    const { body } = ctx.request as any
    next()
})

app.on('error', (err) => {
    console.log(err)
})

app.use(router.routes()).use(router.allowedMethods()).listen(3001)
