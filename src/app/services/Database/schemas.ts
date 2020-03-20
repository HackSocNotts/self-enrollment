// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface GroupsSchema {
  uuid: string;
  name: string;
  discord_role_name: string;
  discord_role_id: number;
}

export interface PositionGroupsSchema {
  role_id: string;
  name: string;
}

export interface UsersSchema {
  user_id: string;
  display_name: string;
  username: string;
  discord_id: string;
}
