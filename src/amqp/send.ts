import * as amqp from 'amqplib'
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
                (msg) => {
                    resolve(msg)
                    ch.close()
                },
                { noAck: true }
            )
            ch.sendToQueue(msgName, Buffer.from(msg), { replyTo: backName, correlationId: '1' })
        })
    }
}

export default amqpSend
