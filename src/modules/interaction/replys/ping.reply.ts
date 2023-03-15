import { Injectable, Inject } from '@nestjs/common';
import { Client, SlashCommandBuilder } from 'discord.js';
import { DISCORD_CLIENT } from 'src/constant/discord';
import { SetCommand } from 'src/decorator/command.decorator';
import DiscordInteraction from 'src/domains/discord/interaction';
import { InteractionReply } from './reply';

@Injectable()
export class PingReply implements InteractionReply {
    constructor(@Inject(DISCORD_CLIENT) private readonly client: Client) {}

    @SetCommand()
    command() {
        return new SlashCommandBuilder().setName('ping').setDescription('discord Ping');
    }

    send(interaction: DiscordInteraction) {
        interaction.reply(`${this.client.ws.ping}ms Pong!`);
    }
}
