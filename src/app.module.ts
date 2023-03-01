import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from './modules/discord/discord.module';
import { ConfigModule } from './config/config/config.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [DiscordModule, ConfigModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
