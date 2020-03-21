// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// App Configuration
export const BASE_URL = process.env.BASE_URL as string;

// Discord Configuration
export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;
export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN as string;
export const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID as string;

// Session Configuration
export const SESSION_SECRET = process.env.SESSION_SECRET;

// AzureAD ODIC
export const AAD_IDENTITY_METADATA = process.env.AAD_IDENTITY_METADATA;
export const AAD_CLIENT_ID = process.env.AAD_CLIENT_ID;
export const AAD_CLIENT_SECRET = process.env.AAD_CLIENT_SECRET;
export const AAD_TENNANT_ID = process.env.AAD_TENNANT_ID;
export const AAD_ISSUER = process.env.AAD_ISSUER;
export const AAD_APPIDURI = process.env.AAD_APPIDURI;
