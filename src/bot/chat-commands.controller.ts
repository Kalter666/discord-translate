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

  @OnCommand({ name: 'start' })
  async onCommand(message: Message): Promise<void> {
    await message.reply(`Execute command: ${message.content}`);
  }

  @OnCommand({ name: 'translate' })
  async onTranslate(
    @Content() content: TranslateDto,
    @Context() [context]: [Message],
  ): Promise<void> {
    const translation = await this.translateService.translate(content);
    await context.reply(
      `String: ${content.string},\n Target language: ${content.language}, \n Translation: \n
        ${translation}`,
    );
  }
}
