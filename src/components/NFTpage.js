import React, { useEffect, useState } from 'react';
import * as fcl from "@onflow/fcl";
import axios from 'axios';
import loadingGif from '../loading.gif'
import NFTCard from './components/NFTCard';
import Nav from './_Nav';

function NFTpage(props) {

    const [user, setUser] = useState({loggedIn: null})
    const [nfts, setNfts] = useState()

    useEffect(() =>{
        fcl.currentUser.subscribe(setUser)
        async function getNFTs() {
            fcl.currentUser.subscribe(async res => {
                if(res.loggedIn === true){
                    await axios.get(`https://flow-mainnet.g.alchemy.com/v2/5wg7vsodim8tqcmccaouianrc50f8r0a/getNFTs/?owner=${res.addr}&offset=0&`)
                    .then(res => setNfts(res?.data?.nfts))
                }
            })
        }
        getNFTs()
    },[])

    return (
        <div>
            <Nav addr={user?.addr}/>
            {user.loggedIn === true ?
            (
            nfts?.length > 1 ?
            <div className='flex grid grid-cols-4 gap-10 mx-10 mt-10 pb-10'>
            {nfts.map((nft, index) =>{
                if(nft?.media[0]?.uri.startsWith('ipfs')){
                    let ipfsHash = nft?.media[0]?.uri.split('ipfs://')[1]
                    let gateway = `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`
                    return(
                    <NFTCard image={gateway} index={index} nft={nft}/>
                    )
                } else if(nft?.media?.length === 0){
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
            )
            :
            <div className='text-xl text-slate-800 border-2 mx-[500px] rounded-lg text-left p-8 bg-slate-200 mt-20'>
                <div className='text-2xl'>
                    Connect your wallet to view your NFT's
                </div>
                <button onClick={fcl.logIn} className='mt-10 bg-green-500 border-[1px] font-bold border-slate-800 text-white px-10 py-2 rounded-lg hover:bg-slate-700'>
                    Connect Wallet
                </button>
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
                                } else if(nft?.media?.length === 0){
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

export default NFTpage