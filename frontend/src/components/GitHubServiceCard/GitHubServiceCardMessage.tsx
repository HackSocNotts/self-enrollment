/**
 * Copyright (c) 2020 HackSoc Nottingham
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Thunks } from '../../store/github/actions';
import { AppState } from '../../store/AppState';

const Message: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, profile, teams, attempts } = useSelector((state: AppState) => state.github);
  if (!profile && !teams) {
    return <></>;
  }

  if (profile && !teams && !loading && attempts < 5) {
    dispatch(Thunks.getTeams());
    return <></>;
  }

  if (!teams) {
    return <></>;
  }

  return (
    <>
      <Typography>
        If the user above is correct, click enroll below to invite the user and assign the following teams:
      </Typography>
      <ul>
        {teams.map(team => (
          <li key={team}>
            <Typography>{team}</Typography>
          </li>
        ))}
      </ul>
      <Typography>
        In addition, to adding the user to the teams, you HackSoc email will be added to your account.
      </Typography>
    </>
  );
};

export default Message;
