import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [BotModule],
})
export class AppModule {}
