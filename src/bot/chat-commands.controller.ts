import { Controller, Logger } from '@nestjs/common';
import {
  Content,
  Context,
  DiscordClientProvider,
  Once,
  OnCommand,
} from 'discord-nestjs';
import { Message } from 'discord.js';
import { TranslateService } from '../translate';
import { TranslateDto } from './dto';

@Controller()
export class ChatCommandsController {
  constructor(
    private readonly discordProvider: DiscordClientProvider,
    private readonly translateService: TranslateService,
  ) {}

  @Once({ event: 'ready' })
  onReady(): void {
    Logger.log(`Logged in as ${this.discordProvider.getClient().user.tag}!`);
  }

  @OnCommand({ name: 'langs' })
  async onCommand(message: Message): Promise<void> {
    try {
      const supportedLangs =
        await this.translateService.getSupportedLanguages();
      let res = `List of supported languages:\n`;
      res += supportedLangs
        .map(({ code, name }) => `${name} - ${code}`)
        .join(', ');
      await message.reply(`List of supported languages:\n ${res}.`);
      return;
    } catch (e) {
      Logger.error(e);
      await this.unavailable(message);
    }
  }

  @OnCommand({ name: 'tr' })
  async onTranslate(
    @Content() content: TranslateDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    const translation = await this.translateService.translate(content);
    await context.reply(`${translation}`);
  }

  private async unavailable(message: Message): Promise<void> {
    await message.reply('Service currently unavailabe try again later');
  }
}
