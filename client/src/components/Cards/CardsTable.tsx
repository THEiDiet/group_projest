import React, { useState } from 'react'

import { SagaActions } from '../../enums/sagaActions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { deleteOneCard } from '../../store/sagas/cardsSaga'
import { UpdateORCreateCardInCurrentPackType } from '../../types'
import { CardT, CardTypePartial } from '../../types/PackTypes'
import { Button } from '../common'

import { AddCardInputForm } from './AddCardInputForm/AddCardInputForm'
import s from './style/CardsTable.module.css'

const CardsTable: React.FC = () => {
  const currentPack = useAppSelector(state => state.cards.currentPack)
  const [addNewCardModal, setAddNewCardModal] = useState<boolean>(false)
  // eslint-disable-next-line no-underscore-dangle
  const userID = useAppSelector(state => state.user.userInfo._id)
  const dispatch = useAppDispatch()
  const onClickHandler = (): void => {
    dispatch({ type: SagaActions.GetOnePack, payload: '6259a1e4e09d9d0004160611' })
  }
  const onDeleteClickHandler = (id: string): void => {
    dispatch({ type: SagaActions.DeleteCard, payload: id })
  }
  const onEditClickHandler = (UpdatedCard: CardTypePartial): void => {
    console.log('func')
    dispatch({ type: SagaActions.UpdateOrCreateCard, payload: UpdatedCard })
  }
  // disabled={userID !== m.user_id}
  const tableRows =
    currentPack &&
    currentPack.cards.map(m => (
      // eslint-disable-next-line no-underscore-dangle
      <div className={s.tableRow} key={m._id}>
        <div className={s.tableTest}>{m.question}</div>
        <div className={s.tableTest}>{m.answer}</div>
        <div className={s.tableTest}>{m.grade}</div>
        <div className={s.tableTest}>
          {/* eslint-disable-next-line no-underscore-dangle */}
          <Button red type="button" color="red" onClick={() => onDeleteClickHandler(m._id)}>
            Delete
          </Button>
          {/* eslint-disable-next-line no-underscore-dangle */}
          <Button onClick={() => onEditClickHandler({ _id: m._id })}>Edit</Button>
        </div>
      </div>
    ))
  return (
    <div>
      <Button onClick={onClickHandler}> Click me</Button>
      <Button onClick={()=>setAddNewCardModal(true)}> Add new card</Button>
      <div className={s.tableHead}>
        <span>Question</span>
        <span>Answer</span>
        <span>Grade</span>
        <span>Actions</span>
      </div>
      {tableRows}
      {addNewCardModal && <AddCardInputForm setAddNewCardModal={setAddNewCardModal}/>}
    </div>
  )
}

export default CardsTable
