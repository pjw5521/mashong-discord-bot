import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, GatewayIntentBits } from 'discord.js';
import { DISCORD_CLIENT } from 'src/constant/discord';
import {
  DiscordInteractionModel,
  DiscordInteractionSchema,
} from 'src/mongo/schemas/discord-interaction.schema';
import {
  DiscordMessageModel,
  DiscordMessageSchema,
} from 'src/mongo/schemas/discord-message.schema';
import { DiscordService } from './discord.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DiscordMessageModel.name,
        schema: DiscordMessageSchema,
      },
      {
        name: DiscordInteractionModel.name,
        schema: DiscordInteractionSchema,
      },
    ]),
  ],
  providers: [
    DiscordService,
    {
      provide: DISCORD_CLIENT,
      useFactory: () => {
        const client = new Client({
          intents: [
            // Intent를 설정합니다. 설정하지 않으면 CLIENT_MISSING_INTENTS 오류가 발생합니다.
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
          ],
        });

        return client;
      },
    },
  ],
})
export class DiscordModule {}
