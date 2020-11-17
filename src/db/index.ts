import * as mysql from 'mysql'
const mybatis = require('mybatis-node')

import * as os from 'os'
import * as path from 'path'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'recordDb',
    useConnectionPooling: true,
    characterEncoding: 'utf8mb4',
    typeCast: true,
    multipleStatements: true,
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
const sessionFactory  = new mybatis(pool).process(dir_xml);

export default connectObj
