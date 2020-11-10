import amqpBase from './base'

class amqpAccept extends amqpBase {
    constructor() {
        super()
    }
    accept = async (msgName: string) => {
        process.once('SIGINT', () => {
            this.conn.close()
        })
        await this.connect()
        const ch = await this.conn.createChannel()
        await ch.assertQueue(msgName, { durable: false })
        ch.consume(
            msgName,
            (msg) => {
                ch.sendToQueue(msg.properties.replyTo, Buffer.from('接收完毕1'), {
                    correlationId: msg.properties.correlationId,
                })
                ch.ack(msg)
            },
            { noAck: false }
        )
    }
}

export default amqpAccept
