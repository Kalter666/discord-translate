import {
  DiscordModuleOption,
  TransformPipe,
  ValidationPipe,
} from 'discord-nestjs';
import { GatewayIntentBits } from 'discord.js';

export const discordConfig: DiscordModuleOption = {
  token: process.env.DISCORD_SECRET,
  commandPrefix: '/',
  usePipes: [TransformPipe, ValidationPipe],
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
};
