import { Module } from '@nestjs/common';
import MessageReplyFactory from './message-reply-factory';
import { BarReply } from './replys/bar.reply';
import { FooReply } from './replys/foo.reply';
import Reply from "./replys/message-reply";

@Module({
    providers: [MessageReplyFactory, Reply, FooReply, BarReply],
    exports: [MessageReplyFactory],
})
export class MessageModule {}
