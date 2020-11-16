import * as amqp from 'amqplib'
import * as UUID from 'uuid'

import amqpBase from './base'

class amqpSend extends amqpBase {
    constructor() {
        super()
    }
    createChannel = async <T>(msgName: string, msg: T, backName: string): Promise<amqp.ConsumeMessage> => {
        return new Promise(async (resolve, reject) => {
            await this.connect()
            const ch = await this.conn.createChannel()
            await ch.assertQueue(backName, { durable: false })
            ch.consume(
                backName,
                (backMsg) => {
                    resolve(backMsg)
                    ch.close()
                },
                { noAck: true }
            )
            ch.sendToQueue(msgName, Buffer.from(JSON.stringify(msg)), {
                replyTo: backName,
                correlationId: UUID.v1(),
            })
        })
    }
}

export default amqpSend
