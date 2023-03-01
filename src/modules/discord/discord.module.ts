import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
    ]),
  ],
  providers: [DiscordService],
})
export class DiscordModule {}
