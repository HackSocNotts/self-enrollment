import { AuthTypes } from './auth';
import { DiscordTypes } from './discord';

export interface AppState {
  auth: AuthTypes.AuthState;
  discord: DiscordTypes.DiscordState;
}
