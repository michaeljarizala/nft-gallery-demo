import React from "react"

interface Props {
  className?: string
  children: React.ReactNode
}
const Wrapper: React.FC<Props> = 
(props: Props): React.JSX.Element => {
  const { children, className = '' } = props
  return (
    <div className={`
      px-[0]

      max-w-[1440px]
      mx-[auto]
      
      md:px-[50px]
      2xl:px-[150px]

      ${className}
    `}>
        { children }
    </div>
  )
}

export default Wrapper