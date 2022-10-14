export const BASE_API_URL = 'https://api.simplehash.com/api/v0';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? '';
export const CURRENCY_API_URL = 'https://min-api.cryptocompare.com/data';

export const ACCESS_NODE = 'https://rest-mainnet.onflow.org';
export const DISCOVERY_WALLET = 'https://flow-wallet.blocto.app/authn';
export const PROFILE_CONTRACT = '0x97bafa4e0b48eef';

const NFTS = [
  'A.0b2a3299cc857e29.TopShot/37143972',
  'A.329feb3ab062d289.UFC_NFT/1585361',
  'A.921ea449dffec68a.Flovatar/33',
  'A.807c3d470888cc48.Flunks/9448',
  'A.5b82f21c0edf76e3.StarlyCard/1668',
  'A.f2af175e411dfff8.MetaPanda/864',
  'A.2068315349bdfce5.GoatedGoats/5521',
  'A.28abb9f291cadaf2.BarterYardClubWerewolf/3783',
  'A.7c8995e83c4b1843.Collector/1',
  'A.9d21537544d9123d.Momentables/1083',
  'A.329feb3ab062d289.RareRooms_NFT/51710',
  'A.329feb3ab062d289.Canes_Vault_NFT/1902509',
  'A.329feb3ab062d289.RaceDay_NFT/1400982',
  'A.329feb3ab062d289.The_Next_Cartel_NFT/32565',
  'A.8529aaf64c168952.MonoCatMysteryBox/41',
  'A.329feb3ab062d289.UFC_NFT/1733389',
  'A.0b2a3299cc857e29.TopShot/650',
  'A.8b148183c28ff88f.Gaia/589',
  'A.807c3d470888cc48.Flunks/0',
  'A.f2af175e411dfff8.MetaPanda/13',
  'A.7c8995e83c4b1843.Collector/28',
  'A.799da0ef17f38104.DaysOnFlow/30',
  'A.758252ab932a3416.YahooCollectible/4',
  'A.28abb9f291cadaf2.BarterYardClubWerewolf/20',
  'A.807c3d470888cc48.Backpack/48',
  'A.329feb3ab062d289.RaceDay_NFT/7111',
];

export const FEATURED_NFTS = process.env.NEXT_PUBLIC_FEATURED_NFTS ?? NFTS;
