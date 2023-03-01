import DiscordMessage from 'src/domains/discord/discord-message';

export class DiscordMessageMapper {
  static fromDomain(message: DiscordMessage) {
    return {
      prefix: message.prefix,
      channelId: message.message.channelId,
      guildId: message.message.guildId,
      id: message.message.id,
      createdTimestamp: new Date(message.message.createdTimestamp),
      content: message.message.content,
      authorId: message.message.author.id,
      authorName: message.message.author.username,
    };
  }
}
