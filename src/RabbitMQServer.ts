/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Connection, Channel, connect, Message } from 'amqplib';

export default class RabbitMQServer {
    private conn: Connection;

    private channel: Channel;

    constructor(private uri: string) {}

    async start(): Promise<void> {
        this.conn = await connect(this.uri);
        this.channel = await this.conn.createChannel();
    }

    async consume(queue: string, callback: (message: Message) => void) {
        return this.channel.consume(queue, message => {
            callback(<any>message);
            this.channel.ack(<any>message);
        });
    }
}
