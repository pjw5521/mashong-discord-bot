import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { DISCORD_CLIENT } from 'src/constant/discord';
@Module({
    providers: [
        {
            provide: DISCORD_CLIENT,
            useFactory: async (configService: ConfigService) => {
                const client = new Client({
                    intents: [
                        // Intent를 설정합니다. 설정하지 않으면 CLIENT_MISSING_INTENTS 오류가 발생합니다.
                        GatewayIntentBits.Guilds,
                        GatewayIntentBits.GuildMessages,
                        GatewayIntentBits.DirectMessages,
                    ],
                });

                const token = configService.get('discord.token');

                await client.login(token);
                client.rest.setToken(token);
                return client;
            },
            inject: [ConfigService],
        },
    ],
    exports: [DISCORD_CLIENT],
})
export class DiscordClientModule {}
