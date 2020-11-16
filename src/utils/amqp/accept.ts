import amqpBase from './base'

interface IProps {
    acceptName: string
}
class amqpAccept extends amqpBase {
    public initAccept: () => Promise<any>

    constructor(props: IProps) {
        super()
        this.initAccept = async () => {
            if (props.acceptName) {
                await this.accept(props.acceptName)
            }
        }
        this.initAccept()
    }

    accept = async (acceptName: string) => {
        process.once('SIGINT', () => {
            this.conn.close()
        })
        await this.connect()
        const ch = await this.conn.createChannel()
        await ch.assertQueue(acceptName, { durable: false })
        ch.consume(
            acceptName,
            (acceptMsg) => {
                console.log(acceptMsg.content.toString())
                ch.sendToQueue(acceptMsg.properties.replyTo, Buffer.from('0'), {
                    correlationId: acceptMsg.properties.correlationId,
                })
                ch.ack(acceptMsg)
            },
            { noAck: false }
        )
    }
}

export default amqpAccept
