// Copyright (c) 2020 Aaron Osher
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Optional } from '../../utils/types';
import { GitHubProfile } from '../../models/GitHubProfile';

export default {
  loading: false,
  error: undefined as Optional<string>,
  profile: undefined as Optional<GitHubProfile | false>,
  teams: undefined as Optional<string[]>,
  enrolSuccess: false,
  attempts: 0,
};
