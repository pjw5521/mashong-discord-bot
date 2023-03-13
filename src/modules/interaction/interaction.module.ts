import { Module } from '@nestjs/common';
import { DiscordClientModule } from '../discord/discord-client.module';
import InteractionReplyFactory from './interaction-reply-factory';
import { PingReply } from './replys/ping.reply';
import { InteractionReply } from './replys/interaction.reply';
import { GitPingReply } from './replys/git-ping.reply';
import { GitRepoContributionsReply } from './replys/git-repo-contributions.reply';
import { HttpModule } from '@nestjs/axios';
import { GptReply } from './replys/gpt.reply';
import { RankReply } from './replys/rank.reply';

@Module({
    imports: [DiscordClientModule, HttpModule],
    providers: [
        InteractionReply,
        PingReply,
        GitPingReply,
        GitRepoContributionsReply,
        GptReply,
        RankReply,
        InteractionReplyFactory,
    ],
    exports: [InteractionReplyFactory],
})
export class InteractionModule {}
