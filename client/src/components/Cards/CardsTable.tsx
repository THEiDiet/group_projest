import React, { useState } from 'react'

import { EHelpers } from '../../enums'
import { SagaActions } from '../../enums/sagaActions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { createNewCard, deleteOneCard, updateOneCard } from '../../store/sagas/cardsSaga'
import { CardTypePartial } from '../../types/PackTypes'
import { Button } from '../common'

import { AddCardInputForm } from './AddCardInputForm/AddCardInputForm'
import { EditCardInputForm } from './AddCardInputForm/EditCardInputForm'
import { CardTableRow } from './CardTableRow'
import DeleteCard from './Modal/DeleteCardModal/DeleteCard'
import ModalForCards from './Modal/ModalForCards/ModalForCards'
import s from './style/CardsTable.module.css'

const CardsTable: React.FC = () => {
  // eslint-disable-next-line no-underscore-dangle
  const userID = useAppSelector(state => state.user.userInfo._id)
  const currentPack = useAppSelector(state => state.cards.currentPack)
  const currentPackID = currentPack && currentPack.cards[EHelpers.Zero].cardsPack_id
  const currentPackUserID = currentPack && currentPack.cards[EHelpers.Zero].user_id
  const [whatModalIsActive, setWhatModalIsActive] = useState<string>('')
  const [useStateCardId, setUseStateCardId] = useState<string>('')
  const dispatch = useAppDispatch()
  const onClickHandler = (): void => {
    dispatch({ type: SagaActions.GetOnePack, payload: '6259a1e4e09d9d0004160611' })
  } // temporary function, потом удалить или привести в порядок.
  const onDeleteClickHandlerInTable = (cardId: string) => {
    setUseStateCardId(cardId) // кривое решение, чтобы знать ид карточки которую передаешь вниз при модалке с вопросом точно удалить?
    setWhatModalIsActive('delete') // открыть модалку
  }
  const onConfirmDeleteClickHandler = (id: string): void => {
    dispatch(deleteOneCard(id)) // в модалке, если нажал ДА ТОЧНО УДАЛИТЬ
    setWhatModalIsActive('') // выйти из модалки
  }
  const onEditClickHandler = (cardId: string): void => {
    setUseStateCardId(cardId)
    setWhatModalIsActive('edit')
  }
  const onConfirmEditClickHandler = (UpdatedCard: CardTypePartial) => {
    dispatch(updateOneCard(UpdatedCard))
  }
  const onConfirmCreateClickHandler = (Card: CardTypePartial) => {
    // прицепить CurrentPackId nado ?
    dispatch(createNewCard({ ...Card, cardsPack_id: currentPackID })) // потом надо перезапросить карточки
  }
  const shouldElementBeShown = () => userID !== currentPackUserID // Используется для колонки с кнопками удаления и едита, если не твои карточки - не увидишь( наверное надо и для кнопки добавления )
  const tableRows =
    currentPack &&
    // eslint-disable-next-line no-underscore-dangle
    currentPack.cards.map(m => (
      <CardTableRow
        card={m}
        shouldElementBeShown={shouldElementBeShown}
        onDeleteClickHandlerInTable={onDeleteClickHandlerInTable}
        onEditClickHandler={onEditClickHandler}
        // eslint-disable-next-line no-underscore-dangle
        key={m._id}
      />
    ))
  return (
    <div>
      <Button onClick={onClickHandler}> Click me</Button>
      <Button onClick={() => setWhatModalIsActive('addCard')}> Add new card</Button>
      <div className={s.tableHead}>
        <span>Question</span>
        <span>Answer</span>
        <span>Grade</span>
        {shouldElementBeShown() && <span>Actions</span>}
      </div>
      {tableRows}
      {/* <ModalForCards */}
      {/*  isActive={isModalForAddingCardActive} */}
      {/*  setIsActive={setIsModalForAddingCardActive} */}
      {/* > */}
      {/*  <AddCardInputForm */}
      {/*    setAddNewCardModal={setIsModalForAddingCardActive} */}
      {/*    createCard={onCreateClickHandler} */}
      {/*  /> */}
      {/* </ModalForCards> */}
      {/* <ModalForCards */}
      {/*  isActive={isModalForDeleteCardActive} */}
      {/*  setIsActive={setIsModalForDeleteCardActive} */}
      {/* > */}
      {/*  <div> Are you sure you want to delete this card ?</div> */}
      {/*  <button type="button" onClick={() => setIsModalForDeleteCardActive(false)}> */}
      {/*    No */}
      {/*  </button>{' '} */}
      {/*  <button type="button" onClick={() => onConfirmDeleteClickHandler(useStateId)}> */}
      {/*    Yes */}
      {/*  </button> */}
      {/* </ModalForCards> */}
      <ModalForCards isActive={whatModalIsActive} setIsActive={setWhatModalIsActive}>
        {whatModalIsActive === 'delete' && (
          <DeleteCard
            setWhatModalIsActive={setWhatModalIsActive}
            onConfirmDeleteClickHandler={onConfirmDeleteClickHandler}
            useStateId={useStateCardId}
          />
        )}
        {whatModalIsActive === 'addCard' && (
          <AddCardInputForm
            setAddNewCardModal={setWhatModalIsActive}
            createCard={onConfirmCreateClickHandler}
          />
        )}
        {whatModalIsActive === 'edit' && (
          <EditCardInputForm
            setAddNewCardModal={setWhatModalIsActive}
            editCard={onConfirmEditClickHandler}
            cardId={useStateCardId}
          />
        )}
      </ModalForCards>
    </div>
  )
}

export default CardsTable
