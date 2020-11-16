import * as mysql from 'mysql'
import * as os from 'os'
import * as path from 'path'

const pool = mysql.createPool({
    host: '39.108.184.64',
    user: 'root',
    password: 'React1010',
    database: 'xChat',
    useConnectionPooling: true,
    characterEncoding: 'utf8mb4',
})

function connect() {
    this.query = function (sql: string, cb: Function, rej: Function) {
        pool.getConnection((err, connect) => {
            if (err) {
                rej({
                    code: -2,
                    message: 'sql出错',
                })
                cb(err)
            } else {
                connect.query(sql, (qerr, vals, fields) => {
                    //释放连接
                    connect.release()
                    cb && cb(qerr, vals, fields)
                })
            }
        })
    }
}

const connectObj = new connect()

export default connectObj
