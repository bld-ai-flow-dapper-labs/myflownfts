import {
  BASE_API_URL,
  CURRENCY_API_URL,
  fetchFromApi,
  postToApi,
} from '../index';

export const getExchangeRates = async () => {
  const url = `${CURRENCY_API_URL}/price?fsym=FLOW&tsyms=USD,ETH`; // get Flow to USD and ETH pricing
  return await fetchFromApi(url);
};

export const getNFTByList = async (nft_ids: string) => {
  const url = `${BASE_API_URL}/nfts/assets?nft_ids=${nft_ids}`;
  return await fetchFromApi(url);
};

export const getNFTByTokenId = async (
  chain: string,
  contract_address: string,
  token_id: string
) => {
  const url = `${BASE_API_URL}/nfts/${chain}/${contract_address}/${token_id}`;
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
  contract_address: string
) => {
  const url = `${BASE_API_URL}/nfts/${chain}/${contract_address}`; // get NFTs by Contract
  return await fetchFromApi(url);
};

export const getNFTsByWallet = async (
  chains: string,
  wallet_addresses: string
) => {
  const url = `${BASE_API_URL}/nfts/owners?chains=${chains}&wallet_addresses=${wallet_addresses}&count=1`;
  return await fetchFromApi(url);
};

export const getOwnershipSummaryByWallet = async (
  wallet_addresses: string,
  chains: string
) => {
  const url = `${BASE_API_URL}/nfts/contracts?chains=${chains}&wallet_addresses=${wallet_addresses}`;
  return await fetchFromApi(url);
};

export const getRawQuery = async (url: string) => {
  return await fetchFromApi(url);
};

export const postRefreshMetadata = async (
  chain: string,
  contract_address: string,
  token_id: string
) => {
  const url = `${BASE_API_URL}/nfts/refresh/${chain}/${contract_address}/${token_id}`;
  return await postToApi(url);
};
