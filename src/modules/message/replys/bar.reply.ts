import { Injectable } from '@nestjs/common';
import DiscordMessage from 'src/domains/discord/message';
import Reply from './message-reply';

@Injectable()
export class BarReply extends Reply {
    key = 'bar';

    send(message: DiscordMessage) {
        message.reply(`bar`);
    }
}
