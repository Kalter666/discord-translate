import { Module } from '@nestjs/common';

import { BotModule } from './bot/bot.module';
import { TranslateModule } from './translate/translate.module';

@Module({
  imports: [BotModule, TranslateModule],
})
export class AppModule {}
