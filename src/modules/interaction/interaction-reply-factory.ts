import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { COMMAND } from 'src/decorator/command.decorator';
import DiscordInteraction from 'src/domains/discord/interaction';
import { InteractionReply } from './replys/reply';

@Injectable()
export default class InteractionReplyFactory implements OnModuleInit {
    commandReplyMap: Map<string, InteractionReply>;
    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly metadataScanner: MetadataScanner,
        private readonly reflector: Reflector,
    ) {}

    onModuleInit() {
        this.commandReplyMap = this.initCommandReplyMap();
    }

    createReply(interaction: DiscordInteraction) {
        return this.commandReplyMap.get(interaction.commandName);
    }

    initCommandReplyMap() {
        const map = new Map();
        const providers = this.discoveryService.getProviders();

        providers
            .filter((wrapper) => wrapper.isDependencyTreeStatic())
            .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
            .forEach(({ instance }) => {
                const prototype = Object.getPrototypeOf(instance);
                const methods = this.metadataScanner.getAllMethodNames(prototype);
                const command = this.reflector.get(COMMAND, prototype);

                if (methods.includes('command') && command) {
                    map.set(command.name, instance);
                }
            });

        return map;
    }
}
