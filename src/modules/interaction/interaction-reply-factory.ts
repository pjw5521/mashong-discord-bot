import { Injectable } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { COMMAND } from 'src/decorator/command.decorator';
import DiscordInteraction from 'src/domains/discord/interaction';

@Injectable()
export default class InteractionReplyFactory {
    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly metadataScanner: MetadataScanner,
        private readonly reflector: Reflector,
    ) {}

    createReply(interaction: DiscordInteraction) {
        const providers = this.discoveryService.getProviders();

        const replyInstance = providers
            .filter((wrapper) => wrapper.isDependencyTreeStatic())
            .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
            .reduce((targetReplyInstance, { instance }) => {
                if (targetReplyInstance) return targetReplyInstance;

                const prototype = Object.getPrototypeOf(instance);
                const methods = this.metadataScanner.getAllMethodNames(prototype);
                const command = this.reflector.get(COMMAND, prototype);

                if (methods.includes('command') && command?.name === interaction.commandName) {
                    return instance;
                }
                return null;
            }, null);

        return replyInstance;
    }
}
