import * as fcl from '@onflow/fcl';
import { useAtom } from 'jotai';

import { useCallback, useEffect, useMemo } from 'react';
import { addressAtom, userAtom } from '../atoms';
import { ACCESS_NODE, DISCOVERY_WALLET, PROFILE_CONTRACT } from '../constants';

export const config = () => {
  fcl.config({
    'accessNode.api': ACCESS_NODE,
    'app.detail.title': 'My Flow NFTs',
    'discovery.wallet': DISCOVERY_WALLET,
    '0xProfile': PROFILE_CONTRACT,
  });
};

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

export async function getProfile(address) {
  return fcl.query({
    cadence: `
        import Profile from 0xProfile

        //Check the status of a fin user
        pub fun main(address: Address) :  Profile.UserProfile? {
          return getAccount(address)
            .getCapability<&{Profile.Public}>(Profile.publicPath)
            .borrow()?.asProfile()
        }
        `,
    args: (arg, t) => [arg(address, t.Address)],
  });
}
