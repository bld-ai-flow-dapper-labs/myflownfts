import {
  BASE_API_URL,
  CURRENCY_API_URL,
  fetchFromApi,
  postToApi,
  postToRecaptcha,
} from '../index';

export const getExchangeRates = async () => {
  const url = `${CURRENCY_API_URL}/price?fsym=FLOW&tsyms=USD,ETH`; // get Flow to USD and ETH pricing
  return await fetchFromApi(url);
};

export const getNFTsByList = async (nftIds: string[]) => {
  const url = `${BASE_API_URL}/nfts/assets?nft_ids=${nftIds}`;
  return await fetchFromApi(url);
};

export const getNFTByTokenId = async (
  chain: string,
  contractAddress: string,
  tokenId: string
) => {
  const url = `${BASE_API_URL}/nfts/${chain}/${contractAddress}/${tokenId}`;
  return await fetchFromApi(url);
};

export const getNFTs = async (chains: string) => {
  const url = `${BASE_API_URL}/nfts?chains=${chains}`;
  return await fetchFromApi(url);
};

export const getNFTsByCollection = async (id: string) => {
  const url = `${BASE_API_URL}/nfts/collection/${id}`;
  return await fetchFromApi(url);
};

export const getNFTsByContract = async (
  chain: string,
  contractAddress: string
) => {
  const url = `${BASE_API_URL}/nfts/${chain}/${contractAddress}`; // get NFTs by Contract
  return await fetchFromApi(url);
};

export const getNFTsByWallet = async (
  chains: string,
  walletAddresses: string[]
) => {
  const url = `${BASE_API_URL}/nfts/owners?chains=${chains}&wallet_addresses=${walletAddresses}&count=1`;
  return await fetchFromApi(url);
};

export const getOwnershipSummaryByWallet = async (
  chains: string,
  walletAddresses: string
) => {
  const url = `${BASE_API_URL}/nfts/contracts?chains=${chains}&wallet_addresses=${walletAddresses}`;
  return await fetchFromApi(url);
};

export const getRawQuery = async (url: string) => {
  return await fetchFromApi(url);
};

export const postRefreshMetadata = async (
  chain: string,
  contractAddress: string,
  tokenId: string
) => {
  const url = `${BASE_API_URL}/nfts/refresh/${chain}/${contractAddress}/${tokenId}`;
  return await postToApi(url);
};

export const postCaptchaValidation = async (
  secretKey: string,
  captcha: string
) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;
  return await postToRecaptcha(url);
};
