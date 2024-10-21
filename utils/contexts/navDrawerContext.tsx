{/*
  Navigation Drawer Context API

  Here we manage the state, types
  reducer, context, and provider
  for the Navigation Drawer component.
*/}

import React, { createContext, useReducer } from "react"

export interface IPayload {
    open: boolean
    children?: React.ReactNode
}

// Declaration of Navigation Drawer state
export type State = {
    open: boolean,
    children?: React.ReactNode
}

// Declaration of Navigation Drawer actions
export type Open = {
    readonly type: "OPEN"
    readonly payload: IPayload
}

// Combination of actions
export type Actions = Open

// State initialization
export const initState = {
    open: false,
    children: (<></>)
}

// Declaration of Navigation Drawer reducer
export const navDrawerReducer = (state: State, action: Actions)
: State => {
    switch(action.type) {
        case "OPEN":
            console.log("NavDrawerReducer OPEN called", open)
            
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

export interface INavDrawerContextValue {
    state: State
    dispatch: React.Dispatch<Actions>
}
export const NavDrawerContext = createContext<INavDrawerContextValue>({
    state: initState,
    dispatch: (action) => console.error(
        "Attempted dispatch outside of a provider.", action)
})

interface INavDrawerProvider {
    children: React.ReactNode
}
export const NavDrawerProvider = ({ children }: INavDrawerProvider)
: JSX.Element => {
    const [state, dispatch] = useReducer(navDrawerReducer, initState)

    return (
        <NavDrawerContext.Provider value={{ state, dispatch }}>
            { children }
        </NavDrawerContext.Provider>
    )
}

