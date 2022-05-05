import React from 'react';

function NFTCard({image, index, nft}) {
    return (
        <div key={index} className='bg-slate-100 p-5 rounded-lg'>      
            <img src={image} className='rounded-lg'/>
            <div className='pt-5 font-bold text-lg'>
                {nft.title}
            </div>
            <button className='py-1 px-8 rounded-lg border-2 border-slate-500 hover:bg-slate-500 mt-2 bg-green-500 text-white font-semibold'
            onClick={() => window.open(nft.externalDomainViewUrl, "blank")}
            >
                View NFT Collection
            </button>
        </div>
    );
}

export default NFTCard;