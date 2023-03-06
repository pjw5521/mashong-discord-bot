import { Injectable } from '@nestjs/common';

@Injectable()
export class InteractionReply {
  static base = true;
  name: string;
  description: string;

  send(): void {}
}
