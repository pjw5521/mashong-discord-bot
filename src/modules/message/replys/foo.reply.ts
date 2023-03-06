import { Injectable } from '@nestjs/common';
import DiscordMessage from 'src/domains/discord/message';
import Reply from './message-reply';

@Injectable()
export class FooReply extends Reply {
    key = 'foo';

    send(message: DiscordMessage) {
        message.reply(`foo`);
    }
}
