{/*
  Modal Context API

  Here we manage the state, types
  reducer, context, and provider
  for the Modal component.
*/}

import React, { createContext, useReducer } from "react"

export interface IPayload {
    open: boolean
    children?: React.ReactNode
}

// Declaration of Modal state
export type State = {
    open: boolean,
    children?: React.ReactNode
}

// Declaration of Modal actions
export type Open = {
    readonly type: "OPEN"
    readonly payload: IPayload
}

// Combination of actions
export type Actions = Open

// State initialization
export const modalInitState = {
    open: false,
    children: (<></>)
}

// Declaration of Modal reducer
export const modalReducer = (state: State, action: Actions)
: State => {
    switch(action.type) {
        case "OPEN":
            console.log("ModalReducer OPEN called", open)
            
            return {
                ...state,
                open: action.payload.open,
                children: action.payload.children === false
                    ? (<></>)
                    : action.payload.children
            }
        default: return state
    }
}

export interface IModalContextValue {
    state: State
    dispatch: React.Dispatch<Actions>
}
export const ModalContext = createContext<IModalContextValue>({
    state: modalInitState,
    dispatch: (action) => console.error(
        "Attempted dispatch outside of a provider.", action)
})

interface IModalProvider {
    children: React.ReactNode
}
export const ModalProvider = ({ children }: IModalProvider)
: JSX.Element => {
    const [state, dispatch] = useReducer(modalReducer, modalInitState)

    return (
        <ModalContext.Provider value={{ state, dispatch }}>
            { children }
        </ModalContext.Provider>
    )
}

