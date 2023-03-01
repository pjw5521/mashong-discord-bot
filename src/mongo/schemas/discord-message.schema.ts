import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DiscordMessageDocument = HydratedDocument<DiscordMessageModel>;

@Schema()
export class DiscordMessageModel {
  @Prop()
  prefix: string;

  @Prop()
  channelId: string;

  @Prop()
  guildId: string;

  @Prop()
  id: string;

  @Prop()
  createdTimestamp: Date;

  @Prop()
  content: string;

  @Prop()
  authorId: string;

  @Prop()
  authorName: string;
}

export const DiscordMessageSchema =
  SchemaFactory.createForClass(DiscordMessageModel);
