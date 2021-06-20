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
import { NoSourceTranslateDto, TranslateDto } from './dto';

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
  async onLanguageList(message: Message): Promise<void> {
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
    try {
      const translation = await this.translateService.getTranslation(content);
      await context.reply(translation);
    } catch (e) {
      Logger.error(e);
      await this.unavailable(context);
    }
  }

  @OnCommand({ name: 't' })
  async onNoSouceTranslate(
    @Content() content: NoSourceTranslateDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    try {
      const translation = await this.translateService.guessAndtranslate(
        content,
      );
      await context.reply(translation);
    } catch (e) {
      Logger.error(e);
      await this.unavailable(context);
    }
  }

  @OnCommand({ name: 'help' })
  async onHelp(message: Message): Promise<void> {
    await message.reply(`
    Bot commands:
    /tr source_language target_language ...text - /tr ru en Привет, ребята!
    `);
  }

  private async unavailable(message: Message): Promise<void> {
    await message.reply('Service currently unavailabe try again later');
  }
}
