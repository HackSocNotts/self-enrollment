// Copyright (c) 2020 Aaron Osher
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export class FetchDiscordProfileError extends Error {
  public readonly profileExists: boolean;

  public constructor(message: string, profileExists: boolean) {
    super(message);
    this.profileExists = profileExists;
  }
}
