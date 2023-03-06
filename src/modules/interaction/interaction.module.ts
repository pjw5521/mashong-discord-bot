import { Module } from '@nestjs/common';
import { DiscordClientModule } from '../discord/discord-client.module';
import InteractionReplyFactory from './interaction-reply-factory';
import { PingReply } from './replys/ping.reply';
import { InteractionReply } from './replys/interaction.reply';

@Module({
    imports: [DiscordClientModule],
    providers: [InteractionReply, PingReply, InteractionReplyFactory],
    exports: [InteractionReplyFactory],
})
export class InteractionModule {}
