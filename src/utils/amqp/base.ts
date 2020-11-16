import * as amqp from 'amqplib'

class amqpBase {
    public conn: amqp.Connection
    constructor() {
        this.connect()
    }
    connect = async () => {
        if (this.conn) {
            return this.conn
        }
        this.conn = await amqp.connect({
            protocol: 'amqp',
            hostname: 'localhost',
            username: 'admin',
            password: 'admin',
        })
        return this.conn
    }
}

export default amqpBase
