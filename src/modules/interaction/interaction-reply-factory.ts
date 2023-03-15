import { Injectable } from '@nestjs/common';
import { PingReply } from './replys/ping.reply';
import { GitPingReply } from './replys/git-ping.reply';
import { GitRepoContributionsReply } from './replys/git-repo-contributions.reply';
import { GptReply } from './replys/gpt.reply';
import { RankReply } from './replys/rank.reply';
import { GitCodeReply } from './replys/git-code.reply';

@Injectable()
export default class InteractionReplyFactory {
    constructor(
        private readonly pingReply: PingReply,
        private readonly gitPingReply: GitPingReply,
        private readonly gitRepoContributions: GitRepoContributionsReply,
        private readonly gptReply: GptReply,
        private readonly rankReply: RankReply,
        private readonly gitCodeReply: GitCodeReply
    ) { }

    createReply(interaction) {
        switch (interaction.commandName) {
            case 'ping':
                return this.pingReply;
            case 'git-ping':
                return this.gitPingReply;
            case 'git-repo-contributions':
                return this.gitRepoContributions;
            case 'gpt':
                return this.gptReply;
            case 'git-code':
                return this.gitCodeReply;
            case 'rank':
                return this.rankReply;
        }
    }
}
