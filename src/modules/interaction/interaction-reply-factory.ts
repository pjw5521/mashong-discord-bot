import { Injectable } from '@nestjs/common';
import { InteractionReply } from './replys/interaction.reply';
import { PingReply } from './replys/ping.reply';
import { GitPingReply } from './replys/git-ping.reply';

@Injectable()
export default class InteractionReplyFactory {
    constructor(
        private readonly interactionReply: InteractionReply,
        private readonly pingReply: PingReply,
        private readonly gitPingReply: GitPingReply,
    ) {}

    createReply(interaction) {
        switch (interaction.commandName) {
            case 'ping':
                return this.pingReply;
            case 'git-ping':
                return this.gitPingReply;
            default:
                return this.interactionReply;
        }
    }
}
