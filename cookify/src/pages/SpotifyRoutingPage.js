import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const SpotifyRoutingPage = (props) => {
  const { userData, setSpotifyAuth } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const backendAuthCode = async (data) => {
      const res = await axios.post(
        `http://localhost:3000/spotify/callback`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userData.token
          }
        }
      );
      setSpotifyAuth(res.data.access_token);
      history.push('/');
    };

    if (props.location.search.split('=')[1] && userData.token) {
      let data = {
        code: props.location.search.split('=')[1],
        id: userData.user
      };

      backendAuthCode(data).catch = (err) => {
        console.log(err);
        console.log('there was an error with the token routing');
        history.push('/');
      };
    } else if (!props.location.search.split('=')[1]) {
      history.push('/');
    }
  }, [userData, history, props.location.search, setSpotifyAuth]);

  return (
    <div>
      <p>Redirecting you back home... </p>
    </div>
  );
};

export default SpotifyRoutingPage;
