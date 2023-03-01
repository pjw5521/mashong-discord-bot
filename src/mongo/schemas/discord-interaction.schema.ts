import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DiscordInteractionDocument =
  HydratedDocument<DiscordInteractionModel>;

@Schema()
export class DiscordInteractionModel {
  @Prop()
  id: string;

  @Prop()
  type: number;

  @Prop()
  applicationId: string;

  @Prop()
  channelId: string;

  @Prop()
  guildId: string;

  @Prop()
  createdTimestamp: Date;

  @Prop()
  commandId: string;

  @Prop()
  commandName: string;

  @Prop()
  userId: string;

  @Prop()
  userName: string;
}

export const DiscordInteractionSchema = SchemaFactory.createForClass(
  DiscordInteractionModel,
);
