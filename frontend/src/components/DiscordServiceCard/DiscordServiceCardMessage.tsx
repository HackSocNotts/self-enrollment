// Copyright (c) 2020 Aaron Osher
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { Thunks } from '../../store/discord/actions';
import { AppState } from '../../store/AppState';

const Message: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, profile, roles } = useSelector((state: AppState) => state.discord);
  if (!profile && !roles) {
    return <></>;
  }

  if (profile && !roles && !loading) {
    dispatch(Thunks.getRoles());
    return <></>;
  }

  if (!roles) {
    return <></>;
  }

  return (
    <>
      <Typography>If the user above is correct, click enroll below to assign the following roles:</Typography>
      <ul>
        {roles.map(role => (
          <li key={role}>
            <Typography>{role}</Typography>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Message;
