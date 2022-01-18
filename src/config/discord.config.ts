import {
  DiscordModuleOption,
  TransformPipe,
  ValidationPipe,
} from 'discord-nestjs';
import { Intents } from 'discord.js';

export const discordConfig: DiscordModuleOption = {
  token: process.env.DISCORD_SECRET,
  commandPrefix: '/',
  usePipes: [TransformPipe, ValidationPipe],
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
};
