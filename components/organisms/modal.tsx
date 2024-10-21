{/*
  Modal Organism

  A re-usable component for
	toggling a modal whereever
	we needed.
*/}

import React, { useContext } from "react"
import { ModalContext } from "@/utils/contexts/modalContext"


interface Props {
	children: React.ReactNode
}
const ModalMask: React.FC<Props> = (props: Props): React.JSX.Element => {
	const {
		children,
	} = props

    const modalContext = useContext(ModalContext)

	return (
		<div
			className={`
				fixed
				top-0
				left-0
				w-full
				h-full
				bg-black
				bg-opacity-50

				${!modalContext.state.open ? 'hidden' : ''}
		`}>
			{ children }
		</div>
	)
}

interface ModalContentProps {
	children: React.ReactNode
}
const ModalContent: React.FC<ModalContentProps> = (props: ModalContentProps): React.JSX.Element => {
	const { children } = props

	return (
		<div className="
			mt-20
			w-[90%]
			md:w-[50%]
			mx-auto
            text-black
            bg-white
			p-5
			rounded-md
		">
			{children}
		</div>
	)
}

const Modal: React.FC = (): React.JSX.Element => {

  const modalContext = useContext(ModalContext)

	return (
    <div>
      <ModalMask>
        <ModalContent>
          { modalContext.state.children }
        </ModalContent>
      </ModalMask>
    </div>
	)
}

export default Modal