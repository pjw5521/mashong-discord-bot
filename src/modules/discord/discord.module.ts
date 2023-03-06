import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    DiscordInteractionModel,
    DiscordInteractionSchema,
} from 'src/mongo/schemas/discord-interaction.schema';
import {
    DiscordMessageModel,
    DiscordMessageSchema,
} from 'src/mongo/schemas/discord-message.schema';
import { InteractionModule } from '../interaction/interaction.module';
import { MessageModule } from '../message/message.module';
import { DiscordClientModule } from './discord-client.module';
import { DiscordService } from './discord.service';

@Module({
    imports: [
        DiscordClientModule,
        MessageModule,
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
