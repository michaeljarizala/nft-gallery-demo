{/*
  Skeleton Atom

  A simple skeleton component based on
  Tailwind's example.
*/}

import React from "react"

const Skeleton: React.FC = ():
React.JSX.Element => {
  return (
    <div className="rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-[150px] bg-slate-900 dark:bg-slate-100 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4">
            <div className="h-2 bg-slate-900 dark:bg-slate-100 rounded col-span-3"></div>
              <div className="mt-3 h-2 bg-slate-900 dark:bg-slate-100 rounded col-span-2"></div>
              <div className="h-2 bg-slate-900 dark:bg-slate-100 rounded col-span-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton