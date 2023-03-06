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
import { InteractionModule } from '../interaction/interaction.module';
import { DiscordClientModule } from './discord-client.module';
import { DiscordService } from './discord.service';

@Module({
  imports: [
    DiscordClientModule,
    InteractionModule,
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
  providers: [DiscordService],
})
export class DiscordModule {}
