import { Injectable, Inject } from '@nestjs/common';
import { ChatInputCommandInteraction, Client } from 'discord.js';
import { DISCORD_CLIENT } from 'src/constant/discord';

@Injectable()
export class PingReply {
  static base = false;
  static command = 'ping';
  static description: 'discord Ping';
  constructor(@Inject(DISCORD_CLIENT) private readonly client: Client) {}

  send(interaction) {
    interaction.reply(`${this.client.ws.ping}ms Pong!`);
  }
}
