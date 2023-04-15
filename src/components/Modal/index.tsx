import React from 'react'
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean
  setIsOpen(isOpen:boolean): void
  children:React.ReactNode
}

export function Modal({isOpen, setIsOpen, children}:ModalProps) {
  const [modalStatus,setModalStatus] = useState<boolean>(false)

  useEffect(() => {
    if (modalStatus !== isOpen) {
      setModalStatus(isOpen)
    }
  }, [isOpen,modalStatus])
  
  const reactModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#F0F0F5',
      color: '#000000',
      borderRadius: '8px',
      width: '736px',
      border: 'none',
    },
    overlay: {
      backgroundColor: '#121214e6',
    },
  }

  function onRequestClose() {
    setIsOpen(false)
  }

  return (
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={onRequestClose}
        isOpen={modalStatus}
        ariaHideApp={false}
        style={reactModalStyles}
      >
        {children}
      </ReactModal>
    );
}

