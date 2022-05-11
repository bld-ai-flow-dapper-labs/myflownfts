import React, { useEffect, useState } from 'react';
import axios from 'axios';
import loadingGif from '../loading.gif'
import NFTCard from './components/NFTCard';
import Nav from './_Nav';

function NFTAddressPage(props) {

    const [nfts, setNfts] = useState()
    const [addr, setAddr] = useState()

    useEffect(() =>{
        const userAddr = window.location.href.split('address/')[1]
        setAddr(userAddr)
        async function getNFTs() {
                    await axios.get(`https://flow-mainnet.g.alchemy.com/v2/mxuvw76vwdiq0vy0vbn502z7ivzu5p83/getNFTs/?owner=${userAddr}&offset=0&`)
                    .then(res => 
                        setNfts(res?.data?.nfts)
                    )
        }
        getNFTs()
    },[])

    return (
        <div>
            <Nav addr={addr}/>
            {nfts?.length > 1 ?
            <div className='flex grid grid-cols-4 gap-10 mx-10 mt-10 pb-10'>
            {nfts.map((nft, index) =>{
                if(nft?.media[0]?.uri.startsWith('Qm')){
                    let ipfsHash = nft?.media[0]?.uri
                    let gateway = `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`
                    return(
                    <NFTCard image={gateway} index={index} nft={nft}/>
                    )
                } else if(nft?.media[0]?.uri.startsWith('ipfs')){
                    let ipfsHash = nft?.media[0]?.uri.split('ipfs://')[1]
                    let gateway = `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`
                    return(
                    <NFTCard image={gateway} index={index} nft={nft}/>
                    )
                } else if(nft?.media?.length === 0 || nft?.media[0]?.uri === ""){
                    return null
                } else{
                return(
                    <NFTCard image={nft?.media[0]?.uri} index={index} nft={nft}/>
                )}
            })}
            </div>
            :
            <div>
                <div className='border-2 rounded-xl mx-96 py-10 mt-32 bg-slate-200' style={{textAlign: '-webkit-center'}}>
                    <div className='font-medium font-mono text-2xl'>
                        {nfts?.length === 0 ?
                        "No NFT's in your Account"
                        :
                        "Looking up your NFT's now"
                        }
                    </div>
                    {nfts?.length === 0 ? 
                    <></>
                    :
                    <img src={loadingGif} className='mt-8 h-16' alt="loading" />
                    }
                </div>
            </div>
            }
            <div>
                <div className='border-2 py-4 bg-slate-50 rounded-lg mx-10 mb-10 mt-4'>
                    <div className='text-xl px-5 font-semibold'>
                        Additional NFT's found in Account
                        <div className='text-sm mt-2 mb-2 px-5 font-medium'>
                            These are additional NFT's we've found in your Flow Address, but <u>we just can't pull the images for them yet</u>. There may also be some in here that haven't been linked to Alchemy so they may not be showing up just yet.
                        </div>
                    </div>
                    <div className='grid grid-cols-4 gap-4 mt-10'>
                        {nfts?.map((nft, index) =>{
                                if(nft?.media[0]?.uri.startsWith('ipfs')){
                                    return null
                                } else if(nft?.media?.length === 0 || nft?.media[0]?.uri === ""){
                                    return(
                                        <div className='text-left px-5 mb-5 bg-slate-700 text-white mx-5 rounded-lg py-3'>
                                            <b className='text-green-400'>NFT Contract Name:</b> {nft?.contract?.name} <br />
                                            <b className='text-green-400'>Token ID:</b> {nft?.id?.tokenId}
                                        </div>
                                    )
                                } else{
                                return null
                            }
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NFTAddressPage