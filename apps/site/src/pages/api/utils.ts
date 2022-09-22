import * as fcl from '@onflow/fcl';
import { connect } from 'http2';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo } from 'react';
import { addressAtom, userAtom } from '../../atoms';

export const fetchFromApi = async (url: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-API-KEY': process.env.API_KEY,
    },
  });
};

export const useWallet = () => {
  const [user, setUser] = useAtom(userAtom);
  const [address, setAddress] = useAtom(addressAtom);

  const connectWallet = useCallback(() => {
    console.log('this is clicked');
    if (user.loggedIn) {
      fcl.unauthenticate();
    } else {
      fcl.logIn();
    }
  }, [user.loggedIn]);

  useEffect(() => {
    if (user && user.addr) {
      setAddress(user.addr);
    } else {
      setAddress('');
    }
  }, [setAddress, user]);

  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, [setUser]);

  return useMemo(
    () => ({
      connectWallet,
    }),
    [connectWallet]
  );
};
