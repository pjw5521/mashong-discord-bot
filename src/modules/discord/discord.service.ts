import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import {
  ChatInputCommandInteraction,
  Client,
  Collection,
  Message,
  REST,
  Routes,
} from 'discord.js';
import { Model } from 'mongoose';
import { DISCORD_CLIENT } from 'src/constant/discord';

import DiscordInteraction from 'src/domains/discord/discord-interaction';
import DiscordMessage from 'src/domains/discord/discord-message';
import InteractionReplyFactory from 'src/domains/discord/interaction-reply-factory';
import MessageReplyFactory from 'src/domains/discord/message-reply-factory';
import { DiscordInteractionMapper } from 'src/mongo/mappers/discord-interaction.mapper';
import { DiscordMessageMapper } from 'src/mongo/mappers/discord-message.mapper';
import {
  DiscordInteractionDocument,
  DiscordInteractionModel,
} from 'src/mongo/schemas/discord-interaction.schema';
import {
  DiscordMessageDocument,
  DiscordMessageModel,
} from 'src/mongo/schemas/discord-message.schema';

interface DiscordClient extends Client {
  commands?: Collection<any, any>;
}

@Injectable()
export class DiscordService implements OnModuleInit {
  token: string;
  clientId: string;
  // client: DiscordClient;
  constructor(
    @Inject(DISCORD_CLIENT) private readonly client: DiscordClient,
    private readonly configService: ConfigService,
    private readonly interactionReplyFactory: InteractionReplyFactory,

    @InjectModel(DiscordMessageModel.name)
    private discordMessageModel: Model<DiscordMessageDocument>,
    @InjectModel(DiscordInteractionModel.name)
    private discordInteractionModel: Model<DiscordInteractionDocument>,
  ) {
    this.clientId = this.configService.get('discord.clientId');
    this.token = this.configService.get('discord.token');
  }

  async onModuleInit() {
    /** 연결 이벤트 등록 */
    this.client.on('ready', () =>
      console.log(`${this.client.user.tag} 에 로그인됨`),
    );

    await this.loadInteractionCommand();

    /** 봇 태그해서 보낸 메세지 이벤트 처리 */
    this.client.on('messageCreate', async (aMessage: Message) => {
      const message = new DiscordMessage(aMessage);
      if (!message.forThisBot()) return;

      const createdDiscordMessage = new this.discordMessageModel(
        DiscordMessageMapper.fromDomain(message),
      );
      await createdDiscordMessage.save();

      const factory = new MessageReplyFactory(this.client);
      const reply = factory.createReply(message);
      reply.send();
    });

    /** 명령어 이벤트 처리 */
    this.client.on(
      'interactionCreate',
      async (aInteraction: ChatInputCommandInteraction) => {
        const interaction = new DiscordInteraction(aInteraction);
        if (!interaction.validate()) return;

        const createdDiscordInteraction = new this.discordInteractionModel(
          DiscordInteractionMapper.fromDomain(interaction),
        );
        await createdDiscordInteraction.save();

        const reply = this.interactionReplyFactory.createReply(interaction);
        reply.send();
      },
    );

    this.client.login(this.token);
  }

  async loadInteractionCommand() {
    /**
     * @TODO command auto load
     */
    const commands = [
      {
        name: 'ping',
        description: 'discord Ping',
      },
    ];

    const rest = new REST().setToken(this.token);
    await rest.put(Routes.applicationCommands(this.clientId), {
      body: commands,
    });
  }
}
