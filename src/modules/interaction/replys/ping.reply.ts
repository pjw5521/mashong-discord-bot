import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'discord.js';
import { DISCORD_CLIENT } from 'src/constant/discord';
import { Octokit } from '@octokit/rest';

@Injectable()
export class PingReply {
    static base = false;
    static command = 'ping';
    static description: 'discord Ping';
    octokit: Octokit;
    constructor(@Inject(DISCORD_CLIENT) private readonly client: Client) {
        this.octokit = new Octokit();
    }

    async send(interaction): Promise<any> {
        /* How to use -> change GET url, parameters */
        const res = await this.octokit.request('GET /events', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });

        interaction.reply(`${this.client.ws.ping}` + res.data);
    }
}
