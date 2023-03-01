import DiscordInteraction from 'src/domains/discord/discord-interaction';

export class DiscordInteractionMapper {
  static fromDomain(interaction: DiscordInteraction) {
    return {
      id: interaction.interaction.id,
      type: interaction.interaction.type,
      applicationId: interaction.interaction.applicationId,
      channelId: interaction.interaction.channelId,
      guildId: interaction.interaction.guildId,
      createdTimestamp: new Date(),
      commandId: interaction.interaction.commandId,
      commandName: interaction.interaction.commandName,
      userId: interaction.interaction.user.id,
      userName: interaction.interaction.user.username,
    };
  }
}
