import { ExchangeRates, NFT, NFTListResponse } from './types';

export const getNFTsByWallet = async (
  walletAddresses: string,
  chains = 'flow'
): Promise<NFTListResponse> => {
  const response = await fetch(
    `/api/nfts/owners?chains=${chains}&wallet_addresses=${walletAddresses}&count=1`
  );
  const json = await response.json();
  return json;
};

export const getNFTsByCollection = async (
  collectionId: string
): Promise<NFTListResponse> => {
  const response = await fetch(`/api/nfts/collection/${collectionId}`);
  const json = await response.json();
  return json;
};

export const getNFTsByContract = async (
  contractAddress: string,
  chain = 'flow'
): Promise<NFTListResponse> => {
  const response = await fetch(
    `/api/nfts?chain=${chain}&contract_address=${contractAddress}`
  );
  const json = await response.json();
  return json;
};

export const getNFTByTokenId = async (
  contractAddress: string,
  tokenId: string,
  chain = 'flow'
): Promise<NFT> => {
  const response = await fetch(
    `/api/nfts/token?chain=${chain}&contract_address=${contractAddress}&token_id=${tokenId}`
  );
  const json = await response.json();
  return json;
};

export const getNFTs = async (chains = 'flow'): Promise<NFTListResponse> => {
  const response = await fetch(`/api/nfts?chains=${chains}`);
  const json = await response.json();
  return json;
};

export const getRawQuery = async (url: string): Promise<NFTListResponse> => {
  const newUrl = encodeURIComponent(url);
  const response = await fetch(`/api/nfts?query=${newUrl}`);
  const json = await response.json();
  return json;
};

export const getOwnershipSummaryByWallet = async (
  walletAddresses: string,
  chains = 'flow'
): Promise<NFTListResponse> => {
  const response = await fetch(
    `/api/nfts/contracts?chains=${chains}&wallet_addresses=${walletAddresses}`
  );
  const json = await response.json();
  return json;
};

export const getExchangeRates = async (): Promise<ExchangeRates> => {
  const response = await fetch(`/api/currencies`);
  const json = await response.json();
  return json;
};
