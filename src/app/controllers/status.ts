// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Controller, Get } from '@overnightjs/core';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { Request, Response } from 'express';
import Axios from 'axios';
import { BASE_URL } from '../../config';
import Database from '../services/Database';
import DiscordService from '../services/Discord/Discord';

@Controller('status')
class StatusController {
  @Get('')
  public async status(_req: Request, res: Response) {
    let healthy = true;
    let database: boolean;
    let discord: boolean;
    let azureAD: boolean;
    let frontend: boolean;

    // Test database
    const db = Database.getInstance();

    try {
      await db.checkConnection();
      database = true;
    } catch (e) {
      database = false;
      healthy = false;
    }

    // Test Discord
    const discordService = new DiscordService();

    try {
      await discordService.status();
      discord = true;
    } catch (e) {
      discord = false;
      healthy = false;
    }

    // Test AzureAD
    try {
      Axios.get('https://graph.microsoft.com/v1.0/');
      azureAD = true;
    } catch (e) {
      azureAD = false;
      healthy = false;
    }

    // Test frontend
    try {
      await Axios.get(BASE_URL + '/manifest.json');
      frontend = true;
    } catch (e) {
      frontend = false;
      healthy = false;
    }

    return res.status(healthy ? OK : INTERNAL_SERVER_ERROR).json({
      healthy,
      database,
      discord,
      azureAD,
      frontend,
    });
  }
}

export default StatusController;
