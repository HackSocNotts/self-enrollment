import React from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store/AppState';
import { Thunks } from '../../store/discord/actions';
import ServiceCard from '../../components/ServiceCard';
import { ProfileProps } from '../Profile';
import { Optional } from '../../utils/types';

const DiscordServiceCard: React.FC = () => {
  const [cookies] = useCookies(['discord']);
  const dispatch = useDispatch();
  const { redirectURI, loading, profile } = useSelector((state: AppState) => state.discord);

  const cardProfile: Optional<ProfileProps> = profile
    ? {
        username: `${profile.username}#${profile.discriminator}`,
        imageURL: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=128`,
      }
    : undefined;

  if (!cookies.discord && !redirectURI && !loading) {
    dispatch(Thunks.getRedirectURI());
  }

  if (cookies.discord && !profile && !loading) {
    dispatch(Thunks.getProfile());
  }

  return <ServiceCard platform="Discord" loginURL={redirectURI} loading={loading} profile={cardProfile} />;
};

export default DiscordServiceCard;
