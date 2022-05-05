import * as fcl from '@onflow/fcl'
import axios from 'axios'

const getSignature = async (signable) =>{


    const sign_url = process.env.REACT_APP_API_URL + 'mint_signature'


    const config = {
        "url": sign_url,
        "method": "POST",
        "headers": {
            'accept': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Credentials': 'true',
        },
        'data': {
            "signing": JSON.stringify({signable}),
        }
    }

    const response = await axios(config)
    // const signed = await response.JSON()
    return response.data.signature
}


export const authorizationFunction = async (account) => {
    // authorization function need to return an account

    const ADDRESS = "0x39d2ec26093f679d"
    const KEY_ID = 0
    return {
        ...account, // bunch of defaults in here, we want to overload some of them though
        tempId: `${ADDRESS}-${KEY_ID}`, // tempIds are more of an advanced topic, for 99% of the times where you know the address and keyId you will want it to be a unique string per that address and keyId
        addr: fcl.sansPrefix(ADDRESS), // the address of the signatory, currently it needs to be without a prefix right now
        keyId: Number(KEY_ID), // this is the keyId for the accounts registered key that will be used to sign, make extra sure this is a number and not a string
        signingFunction: async signable => {
            // Singing functions are passed a signable and need to return a composite signature
            // signable.message is a hex string of what needs to be signed.

            const signature = await getSignature(signable)

            return {
                addr: fcl.withPrefix(ADDRESS), // needs to be the same as the account.addr but this time with a prefix, eventually they will both be with a prefix
                keyId: Number(KEY_ID), // needs to be the same as account.keyId, once again make sure its a number and not a string
                signature, // this needs to be a hex string of the signature, where signable.message is the hex value that needs to be signed
            }
        }
    }
}

export const authorizationFunctionPayer = async (account) => {
    // authorization function need to return an account

    const ADDRESS = "0x39d2ec26093f679d"
    const KEY_ID = 31
    return {
        ...account, // bunch of defaults in here, we want to overload some of them though
        tempId: `${ADDRESS}-${KEY_ID}`, // tempIds are more of an advanced topic, for 99% of the times where you know the address and keyId you will want it to be a unique string per that address and keyId
        addr: fcl.sansPrefix(ADDRESS), // the address of the signatory, currently it needs to be without a prefix right now
        keyId: Number(KEY_ID), // this is the keyId for the accounts registered key that will be used to sign, make extra sure this is a number and not a string
        signingFunction: async signable => {
            // Singing functions are passed a signable and need to return a composite signature
            // signable.message is a hex string of what needs to be signed.

            const signature = await getSignature(signable)

            return {
                addr: fcl.withPrefix(ADDRESS), // needs to be the same as the account.addr but this time with a prefix, eventually they will both be with a prefix
                keyId: Number(KEY_ID), // needs to be the same as account.keyId, once again make sure its a number and not a string
                signature, // this needs to be a hex string of the signature, where signable.message is the hex value that needs to be signed
            }
        }
    }
}