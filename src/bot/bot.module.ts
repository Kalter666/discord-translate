import { Module } from '@nestjs/common';
import { DiscordModule } from 'discord-nestjs';

import { discordConfig } from '../config';
import { TranslateModule } from '../translate/translate.module';
import { ChatCommandsController } from './chat-commands.controller';

@Module({
  imports: [DiscordModule.forRoot(discordConfig), TranslateModule],
  controllers: [ChatCommandsController],
})
export class BotModule {}
