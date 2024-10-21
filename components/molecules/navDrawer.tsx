import React, { useContext } from "react";
import { NavDrawerContext } from "@/utils/contexts/navDrawerContext";
import XIcon from "@/components/atoms/icons/x";

const NavDrawer: React.FC = ():
React.JSX.Element => {
  const navDrawerContext = useContext(NavDrawerContext)

  const handleClose = () => {
    navDrawerContext.dispatch({
      type: "OPEN",
      payload: {
        open: !navDrawerContext.state.open,
      }
    })
  }

  if (!navDrawerContext.state.open) {
    return (<></>)
  }
  
  return (
  <div 
      className={`
          flex
          flex-col
          fixed
          top-0
          right-[-1000px]
          w-[100%]
          min-w-[400px]
          h-[100%]
          z-[99999]
          items-center
          justify-center
          cursor-pointer
          ${navDrawerContext.state.open ? 'animate-maskIn right-[0]' : 'duration-1000 translate-x-[1000px]'}
      `}
      // onClick={handleClose}
  >
      <div
          className={`
              fixed
              flex
              flex-col
              h-[96%]
              shadow-2xl
              right-0
              my-[2%]
              z-[999]
              bg-zinc-50
              duration-300
              cursor-default
              py-8
              px-10
              rounded-md

              ${navDrawerContext.state.open ? 'transition-transform -translate-x-[0px]' : 'transition-transform translate-x-[1000px]'}

              w-[96%]
              mx-[2%]
              right-0
              
              md:mx-0
              md:right-[15px]
              md:max-w-[320px]
              xl:max-w-[400px]
          `}
          onClick={(e) => { e.stopPropagation() }}
      >
        <div className="flex w-[100%] justify-end items-center">
          <div className="cursor-pointer" onClick={handleClose}>
            <XIcon />
          </div>
        </div>
        <div className="mt-10">
          {navDrawerContext.state.children}
        </div>
      </div>
    </div>
  )
}

export default NavDrawer