import {
  DiscordModuleOption,
  TransformPipe,
  ValidationPipe,
} from 'discord-nestjs';

export const discordConfig: DiscordModuleOption = {
  token: process.env.DISCORD_SECRET,
  commandPrefix: '/',
  usePipes: [TransformPipe, ValidationPipe],
};
