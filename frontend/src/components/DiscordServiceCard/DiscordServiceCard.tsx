import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/AppState';
import { Thunks } from '../../store/discord/actions';
import ServiceCard from '../../components/ServiceCard';
import { ProfileProps } from '../Profile';
import { Optional } from '../../utils/types';
import Message from './DiscordServiceCardMessage';

const DiscordServiceCard: React.FC = () => {
  const dispatch = useDispatch();
  const { redirectURI, loading, profile } = useSelector((state: AppState) => state.discord);

  const cardProfile: Optional<ProfileProps> = profile
    ? {
        username: `${profile.username}#${profile.discriminator}`,
        imageURL: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=128`,
      }
    : undefined;

  if (profile === undefined && !loading) {
    dispatch(Thunks.getProfile());
  }

  if (profile === false && !redirectURI && !loading) {
    dispatch(Thunks.getRedirectURI());
  }

  return (
    <ServiceCard
      platform="Discord"
      loginURL={redirectURI}
      loading={loading}
      profile={cardProfile}
      message={<Message />}
    />
  );
};

export default DiscordServiceCard;
