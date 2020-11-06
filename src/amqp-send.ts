import * as amqp from 'amqplib'

class amqpObj {
    public conn: amqp.Connection
    public init: () => Promise<amqp.Connection>
    public createChannel: <T>(msgName: string, msg: T, backName: string) => Promise<any>
    public accept: (msgName: string, returnName: string) => Promise<any>

    constructor() {
        this.init = async () => {
            this.conn = await amqp.connect('amqp://localhost')
            return this.conn
        }
        this.createChannel = async <T>(msgName: string, msg: T, backName: string) => {
            if (!this.conn) {
                return
            }
            return new Promise(async (resolve, reject) => {
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
        this.accept = async (msgName: string, returnName: string) => {
            process.once('SIGINT', () => {
                this.conn.close()
            })
            const ch = await this.conn.createChannel()
            await ch.assertQueue(msgName, { durable: false })
            ch.consume(
                msgName,
                (msg) => {
                    ch.sendToQueue(msg.properties.replyTo, Buffer.from('接收完毕'), {
                        correlationId: msg.properties.correlationId,
                    })
                    ch.ack(msg)
                },
                { noAck: true }
            )
        }
        this.init()
    }
}

export default amqpObj
