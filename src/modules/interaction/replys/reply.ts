import { SlashCommandBuilder } from 'discord.js';
import DiscordInteraction from 'src/domains/discord/interaction';

export interface InteractionReply {
    command(): Partial<SlashCommandBuilder>;
    send(interaction: DiscordInteraction): void;
}
