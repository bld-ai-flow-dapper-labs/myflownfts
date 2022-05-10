import React from 'react';
import logo from '../flowgo.png'

function Nav({addr}) {
    return (
        <div className='flex border-b-[1px] border-slate-600 py-3 bg-slate-200'>
            <div className='font-semibold flex text-2xl flex-none ml-10 mt-0'>
                <img src={logo} className='h-12' alt='navlogo'/>
                <div className='mt-2 ml-4'>
                    My Flow NFT's
                </div>
            </div>
            <div className='flex pt-1 pb-2 ml-3 text-slate-900 w-full'>
                <div className='ml-auto mr-10 -mb-2 -mt-[3px]'>
                    <div className='mt-3'>
                    Address: {addr} 
                    </div>        
                </div>
            </div>
        </div>
    );
}

export default Nav;