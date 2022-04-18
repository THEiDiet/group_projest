import React from 'react'

import s from './Modal.module.css'

type ModalPropsType = {
  children: React.ReactNode
  isActive: string
  setIsActive: (value: string) => void
}

const ModalForCards: React.FC<ModalPropsType> = ({ children, isActive, setIsActive }) => {
  const onClickHandler = () => {
    setIsActive('')
  }
  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes,react/jsx-no-useless-fragment
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={isActive ? `${s.modalContainer} ${s.active}` : s.modalContainer}
        onClick={onClickHandler}
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
        <div className={s.modalContent} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>
  )
}

export default ModalForCards
