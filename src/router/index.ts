import * as KoaRouter from 'koa-router'

import { amqpAccept, amqpSend } from '../utils'

const router = new KoaRouter()

new amqpAccept({ acceptName: 'recordData' })
const send = new amqpSend()

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

export default router
