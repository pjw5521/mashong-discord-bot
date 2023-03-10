import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'discord.js';
import { DISCORD_CLIENT } from 'src/constant/discord';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GptReply {
    static base = false;
    static command = 'git-ping';
    static description: 'GitHub API Ping';
    constructor(
        @Inject(DISCORD_CLIENT) private readonly client: Client,
        private readonly httpService: HttpService,
    ) {}

    async send(interaction): Promise<any> {
        const msg = interaction.options.getString('msg');
        await interaction.deferReply();
        const answer = (
            await firstValueFrom(
                this.httpService.get(`http://20.196.206.177:5001/?room=discord&query='${msg}'`),
            )
        ).data;
        interaction.editReply(answer);
    }
}
