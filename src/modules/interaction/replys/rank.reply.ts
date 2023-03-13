import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import { readFileSync } from 'fs';
import { DISCORD_CLIENT } from 'src/constant/discord';

type GithubEvent = {
    id: number;
    type: 'PushEvent' | 'CreateEvent' | 'WatchEvent' | 'ForkEvent';
    actor: object;
    repo: object;
    payload: object;
    public: boolean;
    created_at: Date;
    org: object;
};

@Injectable()
export class RankReply {
    static base = false;
    static command = 'rank';
    static description: 'Mash-Up Github Jandi Ranking';
    constructor(
        @Inject(DISCORD_CLIENT) private readonly client: Client,
        private readonly httpService: HttpService,
    ) {}
    async send() {
        const ids = readFileSync('./scripts/output/ids.txt', { encoding: 'utf-8' }).split('\n');

        const eventsByUsers = await Promise.all(
            ids.map(async (id) => {
                console.log(id);
                const response = await this.httpService.axiosRef
                    .get(`https://api.github.com/users/${id}/events?page=1`)
                    .catch((e) => {
                        // console.log(e);
                    });
                console.log(response);
                return response;
            }),
        );

        const mostCommiter = this.getMostCommiter(eventsByUsers);
    }

    private getMostCommiter(eventsByUsers) {
        // const now =
    }
}
