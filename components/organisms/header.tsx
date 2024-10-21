import React, { Suspense, lazy } from "react"

const ConnectButton = lazy(() => import("@/components/molecules/connectButton"))

const Header: React.FC = (): React.JSX.Element => {
  return (
    <div className={`
        p-3 flex w-full
        justify-between items-center
        dark:bg-black bg-white
    `}>
      <div className='
        flex-[75%] items-center
        text-2xl font-bold
        dark:text-white
      '>
        <h1>NFT Showcase</h1>
      </div>
      <Suspense fallback={(<></>)}>
        <div className='flex gap-3 justify-center items-center'>
          <ConnectButton />
        </div>
      </Suspense>
    </div>
  )
}

export default Header 