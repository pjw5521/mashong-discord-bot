import { ChatInputCommandInteraction } from 'discord.js';

// TODO: 상속관계로 바꾸는게 좋을 것 같다.
export default class DiscordInteraction {
    interaction: ChatInputCommandInteraction;

    constructor(interaction: ChatInputCommandInteraction) {
        this.interaction = interaction;
    }

    validate(): boolean {
        if (!this.interaction.isChatInputCommand()) {
            return false;
        }

        return true;
    }

    get commandName() {
        return this.interaction.commandName;
    }

    get reply() {
        return this.interaction.reply.bind(this.interaction);
    }

    get options() {
        return this.interaction.options;
    }
    async deferReply(param?) {
        return await this.interaction.deferReply(param);
    }

    async editReply(param) {
        return await this.interaction.editReply(param);
    }
}
