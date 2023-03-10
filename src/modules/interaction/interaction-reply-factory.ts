import { Injectable } from '@nestjs/common';
import { InteractionReply } from './replys/interaction.reply';
import { PingReply } from './replys/ping.reply';
import { GitPingReply } from './replys/git-ping.reply';
import { GitRepoContributionsReply } from './replys/git-repo-contributions.reply';

@Injectable()
export default class InteractionReplyFactory {
    constructor(
        private readonly interactionReply: InteractionReply,
        private readonly pingReply: PingReply,
        private readonly gitPingReply: GitPingReply,
        private readonly gitRepoContributions: GitRepoContributionsReply,
    ) {}

    createReply(interaction) {
        switch (interaction.commandName) {
            case 'ping':
                return this.pingReply;
            case 'git-ping':
                return this.gitPingReply;
            case 'git-repo-contributions':
                return this.gitRepoContributions;
            default:
                return this.interactionReply;
        }
    }
}
