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
const base_1 = require("./base");
class amqpAccept extends base_1.default {
    constructor(props) {
        super();
        this.accept = (acceptName) => __awaiter(this, void 0, void 0, function* () {
            process.once('SIGINT', () => {
                this.conn.close();
            });
            yield this.connect();
            const ch = yield this.conn.createChannel();
            yield ch.assertQueue(acceptName, { durable: false });
            ch.consume(acceptName, (acceptMsg) => {
                console.log(acceptMsg.content.toString());
                ch.sendToQueue(acceptMsg.properties.replyTo, Buffer.from('0'), {
                    correlationId: acceptMsg.properties.correlationId,
                });
                ch.ack(acceptMsg);
            }, { noAck: false });
        });
        this.initAccept = () => __awaiter(this, void 0, void 0, function* () {
            if (props.acceptName) {
                yield this.accept(props.acceptName);
            }
        });
        this.initAccept();
    }
}
exports.default = amqpAccept;
//# sourceMappingURL=accept.js.map