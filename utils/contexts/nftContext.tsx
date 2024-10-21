{/*
  NFT Context API

  Here we manage the state, types
  reducer, context, and provider
  for NFTs.
*/}

import React, { createContext, useReducer } from "react"

// NFT Opensea interface
export interface InftOpenSea {
    identifier: string
    collection: string
    contract: string
    name: string
    description: string
    image_url: string
  }
// NFT interface
export interface Inft {
    identifier: string
    collection: string
    contract: string
    name: string
    description: string
    imageUrl: string
  }

// Pagination interface
export interface IPagination {
    limit?: number
    next: string
}

// NFT load interface
export interface INFTLoad {
    nfts: Inft[]
    nftCollection?: string
    pagination?: IPagination
}

// Declaration of NFT state
export type State = {
    nfts: Inft[]
    nftCollection?: string
    pagination?: IPagination
}

// Declaration of NFT actions
export type LoadNfts = {
    readonly type: "LOAD_NFTS"
    readonly payload: INFTLoad
}
export type AppendNfts = {
    readonly type: "APPEND_NFTS"
    readonly payload: INFTLoad
}

// Combination of actions
export type Actions = AppendNfts | LoadNfts

// State initialization
export const initState = {
    nfts: [],
    nftCollection: "",
    pagination: {
        limit: 8,
        next: "",
    },
}

// Declaration of Account reducer
export const nftReducer = (state: State, action: Actions)
: State => {
    switch(action.type) {
        case "LOAD_NFTS":
            console.log("NftReducer APPEND_NFTS called")
            
            return {
                ...state,
                nfts: action.payload.nfts,
                nftCollection: action.payload.nftCollection || state.nftCollection,
                pagination: action.payload.pagination || state.pagination,
            }
        case "APPEND_NFTS":
            console.log("NftReducer APPEND_NFTS called")
            
            return {
                ...state,
                nfts: [...state.nfts, ...action.payload.nfts],
                nftCollection: action.payload.nftCollection || state.nftCollection,
                pagination: action.payload.pagination || state.pagination,
            }

        default: return state
    }
}

export interface INFTContextValue {
    state: State
    dispatch: React.Dispatch<Actions>
}
export const NFTContext = createContext<INFTContextValue>({
    state: initState,
    dispatch: (action) => console.error(
        "Attempted dispatch outside of a provider.", action)
})

interface INFTProvider {
    children: React.ReactNode
}
export const NFTProvider = ({ children }: INFTProvider)
: JSX.Element => {
    const [state, dispatch] = useReducer(nftReducer, initState)

    return (
        <NFTContext.Provider value={{ state, dispatch }}>
            { children }
        </NFTContext.Provider>
    )
}

