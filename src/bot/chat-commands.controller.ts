import { Controller, Logger } from '@nestjs/common';
import { DiscordClientProvider, Once, OnCommand } from 'discord-nestjs';
import { Message } from 'discord.js';

@Controller()
export class ChatCommandsController {
  constructor(private readonly discordProvider: DiscordClientProvider) {}

  @Once({ event: 'ready' })
  onReady(): void {
    Logger.log(`Logged in as ${this.discordProvider.getClient().user.tag}!`);
  }

  @OnCommand({ name: 'start' })
  async onCommand(message: Message): Promise<void> {
    await message.reply(`Execute command: ${message.content}`);
  }
}
