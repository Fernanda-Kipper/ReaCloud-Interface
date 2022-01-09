import React, { ReactNode } from 'react'

import '../Styles/components/modal.css'

interface Props {
  children: ReactNode
  isOpen: boolean
  handleClose(): void
}

export function Modal({ children, isOpen, handleClose }: Props){
  const handleClick = (target: HTMLDivElement) => {
    if(target.id !== 'modal-container') return
    handleClose()
  }

  if(!isOpen) return <></>

  return(
    <div 
      id="modal-container" 
      onClick={(event) => handleClick(event.target as HTMLDivElement)}
    >
      <div id="modal-content">
        {children}
      </div>
    </div>
  )
}