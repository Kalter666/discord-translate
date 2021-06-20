import { DiscordModuleOption } from 'discord-nestjs';

export const discordConfig: DiscordModuleOption = {
  token: process.env.DISCORD_SECRET,
  commandPrefix: '/',
};
