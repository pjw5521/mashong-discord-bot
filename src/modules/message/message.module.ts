import { Module } from '@nestjs/common';
import MessageReplyFactory from './message-reply-factory';
import { BarReply } from './replys/bar.reply';
import { FooReply } from './replys/foo.reply';

@Module({
    providers: [MessageReplyFactory, FooReply, BarReply],
    exports: [MessageReplyFactory],
})
export class MessageModule {}
