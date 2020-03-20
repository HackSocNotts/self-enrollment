// Copyright (c) 2020 Aaron Osher
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Optional } from '../../utils/types';
import { DiscordProfile } from '../../models/DiscordProfile';

export default {
  redirectURI: undefined as Optional<string>,
  loading: false,
  error: undefined as Optional<string>,
  profile: undefined as Optional<DiscordProfile | false>,
};
