import {
  ExchangeRates,
  NFT,
  NFTByList,
  NFTListResponse,
  RefreshResponse,
} from '@myflownfts/data-access';

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

export const getNFTsByList = async (nftIds: string): Promise<NFTByList> => {
  const response = await fetch(`/api/nfts/assets?nft_ids=${nftIds}`);
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

export const postRefreshMetadata = async (
  chain = 'flow',
  contractAddress: string,
  tokenId: string
): Promise<RefreshResponse> => {
  const response = await fetch(
    `/api/nfts/refresh?chain=${chain}&contract_address=${contractAddress}&token_id=${tokenId}`,
    { method: 'POST' }
  );
  const json = await response.json();
  return json;
};

export const postCaptchaValidation = async (captcha: string) => {
  const response = await fetch(`/api/captcha?captcha=${captcha}`, {
    method: 'POST',
  });
  const json = await response.json();
  return json;
};
