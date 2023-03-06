import { Injectable } from '@nestjs/common';
import { InteractionReply } from './replys/interaction-reply';
import { PingReply } from './replys/ping.reply';

@Injectable()
export default class InteractionReplyFactory {
  constructor(
    private readonly interactionReply: InteractionReply,
    private readonly pingReply: PingReply,
  ) {}

  createReply(interaction) {
    switch (interaction.commandName) {
      case 'ping':
        return this.pingReply;
      default:
        return this.interactionReply;
    }
  }
}
