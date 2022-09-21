export interface ListResponse<T> {
  next?: string;
  previous?: string;
  count?: number;
  data: T[];
}

export interface NFT {
  nft_id: string;
  chain: string;
  contract_address: string;
  token_id: string;
  name: string;
  description: string;
  image_url: string;
  video_url: string;
  audio_url?: string;
  model_url: string;
  previews: {
    image_small_url: string;
    image_medium_url: string;
    image_large_url: string;
    image_opengraph_url: string;
    blurhash: string;
  };
  background_color?: string;
  external_url: string;
  created_date: string;
  status: string; // minted
  token_count: number;
  owner_count: number;
  owners: [
    {
      owner_address: string;
      quantity: 1;
      first_acquired_date: string;
      last_acquired_date: string;
    }
  ];
  last_sale: null;
  contract: {
    type: string; // NonFungibleToken
    name: string;
    symbol?: string;
  };
  collection: {
    collection_id: string;
    name: string;
    description?: string;
    image_url?: string;
    banner_image_url?: string;
    external_url?: string;
    twitter_username?: string;
    discord_url?: string;
    marketplace_pages: [];
    metaplex_mint?: string;
    metaplex_first_verified_creator?: string;
  };
  extra_metadata: {
    uuid: string;
    serial_number: number;
    edition_number: number;
    max_editions: number;
    creator_name: string;
    image_original_url: string;
    animation_original_url: string;
  };
}

export type NFTListResponse = ListResponse<NFT>;
