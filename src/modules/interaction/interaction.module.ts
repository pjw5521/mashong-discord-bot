import { Module } from '@nestjs/common';
import InteractionReplyFactory from './interaction-reply-factory';
import { PingReply } from './replys/ping.reply';

@Module({
  providers: [PingReply, InteractionReplyFactory],
})
export class InteractionModule {}
