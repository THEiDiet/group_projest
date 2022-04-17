import React, { useState } from 'react'

import { EHelpers } from '../../enums'
import { SagaActions } from '../../enums/sagaActions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {createNewCard, deleteOneCard, updateOneCard} from '../../store/sagas/cardsSaga'
import { CardTypePartial } from '../../types/PackTypes'
import { Button } from '../common'

import { AddCardInputForm } from './AddCardInputForm/AddCardInputForm'
import s from './style/CardsTable.module.css'

const CardsTable: React.FC = () => {
  const currentPack = useAppSelector(state => state.cards.currentPack)
  const currentPackID = currentPack && currentPack.cards[EHelpers.Zero].cardsPack_id
  const currentPackUserID = currentPack && currentPack.cards[EHelpers.Zero].user_id
  const [addNewCardModal, setAddNewCardModal] = useState<boolean>(false)
  // eslint-disable-next-line no-underscore-dangle
  const userID = useAppSelector(state => state.user.userInfo._id)
  const dispatch = useAppDispatch()
  const onClickHandler = (): void => {
    dispatch({ type: SagaActions.GetOnePack, payload: '6259a1e4e09d9d0004160611' })
  } // temporary function, потом удалить или привести в порядок.
  const onDeleteClickHandler = (id: string): void => {
    dispatch(deleteOneCard(id))
  }
  const onEditClickHandler = (UpdatedCard: CardTypePartial): void => {
    dispatch(updateOneCard(UpdatedCard))
  }
  const onCreateClickHandler = (Card: CardTypePartial) => {
    const newCard = { ...Card, cardsPack_id: currentPackID } // прицепить
    dispatch(createNewCard(newCard))
  }
  const shouldElementBeShown = () => userID === currentPackUserID // Используется для колонки с кнопками удаления и едита, если не твои карточки - не увидишь
  const tableRows =
    currentPack &&
    currentPack.cards.map(m => (
      // eslint-disable-next-line no-underscore-dangle
      <div className={s.tableRow} key={m._id}>
        <div className={s.tableTest}>{m.question}</div>
        <div className={s.tableTest}>{m.answer}</div>
        <div className={s.tableTest}>{m.grade}</div>
        {shouldElementBeShown() && (
          <div className={s.tableTest}>
            {/* eslint-disable-next-line no-underscore-dangle */}
            <Button red type="button" color="red" onClick={() => onDeleteClickHandler(m._id)}>
              Delete
            </Button>
            {/* eslint-disable-next-line no-underscore-dangle */}
            <Button onClick={() => onEditClickHandler({ _id: m._id })}>Edit</Button>
          </div>
        )}
      </div>
    ))
  return (
    <div>
      <Button onClick={onClickHandler}> Click me</Button>
      <Button onClick={() => setAddNewCardModal(true)}> Add new card</Button>
      <div className={s.tableHead}>
        <span>Question</span>
        <span>Answer</span>
        <span>Grade</span>
        {shouldElementBeShown() && <span>Actions</span>}
      </div>
      {tableRows}
      {addNewCardModal && (
        <AddCardInputForm
          setAddNewCardModal={setAddNewCardModal}
          createCard={onCreateClickHandler}
        />
      )}
      {/* {error && <div style={{color: 'red'}}>error</div>} */}
    </div>
  )
}

export default CardsTable
