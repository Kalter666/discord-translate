import { Module } from '@nestjs/common';

import { BotModule } from './bot/bot.module';
import { translateConfig } from './config';
import { TranslateModule } from './translate/translate.module';

@Module({
  imports: [BotModule, TranslateModule.forRoot(translateConfig)],
})
export class AppModule {}
