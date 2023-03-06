import { Module } from '@nestjs/common';
import { DiscordClientModule } from '../discord/discord-client.module';
import InteractionReplyFactory from './interaction-reply-factory';
import { PingReply } from './replys/ping.reply';

@Module({
  imports: [DiscordClientModule],
  providers: [PingReply, InteractionReplyFactory],
})
export class InteractionModule {}
