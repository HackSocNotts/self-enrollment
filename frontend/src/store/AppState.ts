import { AuthTypes } from './auth';
import { DiscordTypes } from './discord';
import { GitHubTypes } from './github';

export interface AppState {
  auth: AuthTypes.AuthState;
  discord: DiscordTypes.DiscordState;
  github: GitHubTypes.GitHubState;
}
