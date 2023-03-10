import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'discord.js';
import { DISCORD_CLIENT } from 'src/constant/discord';
import { Octokit } from '@octokit/rest';

@Injectable()
export class GitRepoContributionsReply {
    static base = false;
    static command = 'git-ping';
    static description: 'GitHub API Ping';
    octokit: Octokit;
    constructor(@Inject(DISCORD_CLIENT) private readonly client: Client) {
        // TODO: 밖에서 주입해주도록 수정
        this.octokit = new Octokit();
    }

    async send(interaction): Promise<any> {
        // TODO: 인자 못받았을 경우 예외 처리
        // TODO: 그냥 전체 repo url 받아서 처리할 수 있도록 기능 추가
        const owner = interaction.options.getString('owner');
        const repo = interaction.options.getString('repo');
        // const owner = 'mash-up-kr';
        // const repo = 'mashong-discord-bot';
        const res = (await this.octokit.rest.repos.getContributorsStats({
            owner,
            repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        })) as any;
        const msg = res.data
            .map((user) => {
                return `${user.author.login} 님의 총 커밋 수: ${user.total}`;
            })
            .join('\n');
        interaction.reply(msg);
    }
}
