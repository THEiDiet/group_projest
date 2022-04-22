import React, { FC, ReactElement } from 'react'

import { createPortal } from 'react-dom'

import s from './styles/Modal.module.scss'
import { Button } from 'components/common/button/Button'

type ModalProps = {
  component?: ReactElement
  isOpen: boolean
  handleOpen: () => void
}

export const Modal: FC<ModalProps> = props => {
  const { handleOpen, isOpen, component, children } = props
  const root = document.querySelector('body')
  const wrapper = (
    <div className={s.wrapper}>
      <div className={s.editableWrapper}>
        <Button type="button" onClick={handleOpen} className={s.button}>
          close
        </Button>
        {children}
      </div>
    </div>
  )
  if (root && isOpen) {
    return createPortal(wrapper, root)
  }
  return null
}
Modal.defaultProps = {
  component: <div>modal</div>,
}
