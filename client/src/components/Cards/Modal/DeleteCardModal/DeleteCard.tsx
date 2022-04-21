import React from 'react'

import s from 'components/Cards/AddCardInputForm/style/AddCardInputForm.module.css'
import { Button } from 'components/common'

type propsType = {
  setWhatModalIsActive: (value: string) => void
  onConfirmDeleteClickHandler: (id: string) => void
  useStateId: string
}

const DeleteCard: React.FC<propsType> = ({
  setWhatModalIsActive,
  onConfirmDeleteClickHandler,
  useStateId,
}) => (
  <>
    {' '}
    <div style={{margin:'20px', fontWeight: 'bold'}}> Are you sure you want to delete this card ?</div>
    <Button className={s.cancelButton} type="button" onClick={() => setWhatModalIsActive('')}>
      No
    </Button>
    <Button className={s.confirmButton} type="button" onClick={() => onConfirmDeleteClickHandler(useStateId)}>
      Yes
    </Button>{' '}
  </>
)

export default DeleteCard
