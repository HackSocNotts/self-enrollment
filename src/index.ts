// Copyright (c) 2020 HackSoc Nottingham
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import SelfEnrollmentServer from './app';

const PORT = ((process.env.PORT as unknown) as number) || 3000;

const selfEnrollmentServer = new SelfEnrollmentServer();
selfEnrollmentServer.start(PORT);
