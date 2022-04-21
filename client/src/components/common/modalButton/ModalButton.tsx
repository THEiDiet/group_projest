import React, { FC, ReactElement } from 'react'

import { Button } from 'components/common/button/Button'
import { Modal } from 'components/common/modal/Modal'

type ModalButtonProps = {
  title: string
  isOpen: boolean
  handleOpen: () => void
}

const ModalButton: FC<ModalButtonProps> = props => {
  const { children, isOpen, handleOpen, title } = props
  const onClick = (): void => {
    handleOpen()
  }
  return (
    <div>
      <Button onClick={onClick}>{title}</Button>
      <Modal handleOpen={handleOpen} isOpen={isOpen}>
        {children}
      </Modal>
    </div>
  )
}

export default ModalButton
