import { Module } from '@nestjs/common';
import { DiscordModule } from 'discord-nestjs';

import { discordConfig } from '../config';
import { ChatCommandsController } from './chat-commands.controller';

@Module({
  imports: [DiscordModule.forRoot(discordConfig)],
  controllers: [ChatCommandsController],
})
export class BotModule {}
