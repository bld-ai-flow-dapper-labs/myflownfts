import { atom } from 'jotai';

export const userAtom = atom({ loggedIn: false, addr: '' });
export const addressAtom = atom('');
export const isLandingPageLoadedAtom = atom(false);
