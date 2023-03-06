import { Injectable } from '@nestjs/common';
import { BarReply } from './replys/bar.reply';
import { FooReply } from './replys/foo.reply';
import Reply from './replys/message-reply';

@Injectable()
export default class MessageReplyFactory {
    constructor(
        private readonly reply: Reply,
        private readonly fooReply: FooReply,
        private readonly barReply: BarReply,
    ) {}

    createReply(command: string): Reply {
        switch (command) {
            case 'foo':
                return this.fooReply;
            case 'bar':
                return this.barReply;
            default:
                return this.reply;
        }
    }
}
