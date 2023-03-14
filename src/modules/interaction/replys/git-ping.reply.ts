import { Injectable, Inject } from '@nestjs/common';
import { Client, SlashCommandBuilder } from 'discord.js';
import { DISCORD_CLIENT } from 'src/constant/discord';
import { Octokit } from '@octokit/rest';
import { SetCommand } from 'src/decorator/command.decorator';
import { InteractionReply } from './reply';
import DiscordInteraction from 'src/domains/discord/interaction';

@Injectable()
export class GitPingReply implements InteractionReply {
    octokit: Octokit;
    constructor(@Inject(DISCORD_CLIENT) private readonly client: Client) {
        this.octokit = new Octokit();
    }

    @SetCommand()
    command() {
        return new SlashCommandBuilder().setName('git-pong').setDescription('github Ping');
    }

    async send(interaction: DiscordInteraction) {
        /* How to use -> change GET url, parameters */
        const res = await this.octokit.request('GET /events', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });

        interaction.reply(`${this.client.ws.ping}` + res.data);
    }
}
