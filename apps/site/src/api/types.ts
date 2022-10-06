export interface ListResponse<T> {
  next?: string;
  previous?: string;
  count?: number;
  data: T[];
}

export interface NFT {
  nft_id: string;
  audio_url?: string;
  background_color?: string;
  chain: string;
  contract: {
    name: string;
    symbol?: string;
    type: string; // NonFungibleToken
  };
  collection: {
    banner_image_url?: string;
    collection_id: string;
    description?: string;
    discord_url?: string;
    external_url?: string;
    image_url?: string;
    marketplace_pages: [];
    metaplex_first_verified_creator?: string;
    metaplex_mint?: string;
    name: string;
    twitter_username?: string;
  };
  contract_address: string;
  created_date: string;
  description: string;
  extra_metadata: {
    animation_original_url: string;
    attributes?: {
      trait_type: string;
      value: string;
      rarity: {
        score: string;
        max: string;
        description: string;
      };
    }[];
    creator_name: string;
    edition_number: number;
    image_original_url: string;
    max_editions: number;
    media: string[];
    serial_number: number;
    uuid: string;
  };
  external_url: string;
  image_url: string;
  last_sale?: {
    from_address: string;
    to_address: string;
    quantity: number;
    timestamp: string;
    transaction: string;
    marketplace_name: string;
    is_bundle_sale: boolean;
    payment_token: {
      payment_token_id: string;
      name: string;
      symbol: string;
      address?: null;
      decimals: number;
    };
    unit_price: number;
    total_price: number;
  };
  model_url: string;
  name: string;
  previews: {
    blurhash: string;
    image_large_url: string;
    image_medium_url: string;
    image_opengraph_url: string;
    image_small_url: string;
  };
  owner_count: number;
  owners: [
    {
      first_acquired_date: string;
      last_acquired_date: string;
      owner_address: string;
      quantity: 1;
    }
  ];
  status: string; // minted
  token_count: number;
  token_id: string;
  video_url: string;
}

export interface ExchangeRates {
  eth: number;
  usd: number;
}

export interface RefreshResponse {
  message: string;
}

export interface FindProfile {
  address: string;
  allowStoringFollowers: boolean;
  avatar?: string;
  collections?: string[];
  createdAt: string;
  description?: string;
  findName?: string;
  followers?: string[];
  following?: string[];
  gender: string;
  links: string[];
  name: string;
  tags: string[];
  wallets: {
    name: string;
    balance: number;
    accept: string;
  };
}

export type NFTListResponse = ListResponse<NFT>;
