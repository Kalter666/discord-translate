import { Module } from '@nestjs/common';
import { DiscordModule } from 'discord-nestjs';

import { discordConfig } from '../config';

@Module({
  imports: [DiscordModule.forRoot(discordConfig)],
})
export class BotModule {}
