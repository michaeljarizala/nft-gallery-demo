{/*
  Account Context API

  Here we manage the state, types
  reducer, context, and provider
  for the connected MetaMask account.
*/}

import React, { createContext, useReducer } from "react"


// Accounts Interface
export interface IAccount {
    connecting?: boolean
    chain?: string
    account: string
}

// Declaration of Account state
export type State = {
    connecting?: boolean
    chain?: string,
    account: string
}

// Declaration of Account actions
export type RetriveCachedAccount = {
    readonly type: "RETRIEVE_CACHED_ACCOUNT"
    readonly payload: IAccount
}
export type SetAccount = {
    readonly type: "SET_ACCOUNT"
    readonly payload: IAccount
}
export type UnsetAccount = {
    readonly type: "UNSET_ACCOUNT"
}

// Combination of actions
export type Actions = SetAccount | UnsetAccount | RetriveCachedAccount

// State initialization
export const initState = {
    connecting: true,
    chain: "amoy",
    account: "",
}

// Declaration of Account reducer
export const accountReducer = (state: State, action: Actions)
: State => {
    switch(action.type) {
        case "RETRIEVE_CACHED_ACCOUNT":
            console.log("AccountReducer RETRIEVE_CACHED_ACCOUNT called")
            
            return {
                ...state,
                connecting: action.payload.connecting,
                chain: action.payload.chain,
                account: action.payload.account,
            }
        case "SET_ACCOUNT":
            console.log("AccountReducer SET_ACCOUNT called")
            
            // persist account address to the localStorage
            localStorage.setItem("account", action.payload.account)
            localStorage.setItem("chain", action.payload.chain || "")
            return {
                ...state,
                connecting: action.payload.connecting,
                chain: action.payload.chain,
                account: action.payload.account,
            }
        case "UNSET_ACCOUNT":
            console.log("AccountReducer UNSET_ACCOUNT called")
            
            // persist account address to the localStorage
            localStorage.removeItem("account")
            return {
                ...state,
                connecting: true,
                account: "",
                chain: ""
            }

        default: return state
    }
}

export interface IAccountContextValue {
    state: State
    dispatch: React.Dispatch<Actions>
}
export const AccountContext = createContext<IAccountContextValue>({
    state: initState,
    dispatch: (action) => console.error(
        "Attempted dispatch outside of a provider.", action)
})

interface IAccountProvider {
    children: React.ReactNode
}
export const AccountProvider = ({ children }: IAccountProvider)
: JSX.Element => {
    const [state, dispatch] = useReducer(accountReducer, initState)

    return (
        <AccountContext.Provider value={{ state, dispatch }}>
            { children }
        </AccountContext.Provider>
    )
}

