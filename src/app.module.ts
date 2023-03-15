import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from './modules/discord/discord.module';
import { ConfigModule } from './config/config.module';
import { MongoModule } from './mongo/mongo.module';
import { CronModule } from './modules/cron/cron.module';

@Module({
    imports: [
        DiscordModule,
        ConfigModule,
        MongoModule,
        CronModule,
        CacheModule.register({ isGlobal: true }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
