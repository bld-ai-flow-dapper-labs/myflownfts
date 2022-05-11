import React from 'react';
import ReactPlayer from 'react-player';



function NFTCard({image, index, nft}) {
    return (
        <div key={index} className='bg-slate-100 p-5 rounded-lg'>   
            {image.endsWith("mp4") === true ? 
            <ReactPlayer url={image} 
            width='100%' 
            playing={true}
            volume={0}
            loop={true}
            /> 
                :
            <img src={image} className='rounded-lg' alt="logo" />            
            }
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