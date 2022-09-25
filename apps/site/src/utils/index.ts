import * as fcl from '@onflow/fcl';
import { useAtom } from 'jotai';

import { useCallback, useEffect, useMemo } from 'react';
import { addressAtom, userAtom } from '../atoms';

export const useWallet = () => {
  const [user, setUser] = useAtom(userAtom);
  const [, setAddress] = useAtom(addressAtom);

  const connectWallet = useCallback(() => {
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
