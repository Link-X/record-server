"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqp_base_1 = require("./amqp-base");
class amqpAccept extends amqp_base_1.default {
    constructor() {
        super();
        this.accept = (msgName) => __awaiter(this, void 0, void 0, function* () {
            process.once('SIGINT', () => {
                this.conn.close();
            });
            yield this.connect();
            const ch = yield this.conn.createChannel();
            yield ch.assertQueue(msgName, { durable: false });
            ch.consume(msgName, (msg) => {
                ch.sendToQueue(msg.properties.replyTo, Buffer.from('接收完毕1'), {
                    correlationId: msg.properties.correlationId,
                });
                ch.ack(msg);
            }, { noAck: true });
        });
    }
}
exports.default = amqpAccept;
//# sourceMappingURL=amqp-accept.js.map