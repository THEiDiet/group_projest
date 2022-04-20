import React, { useEffect, useState } from 'react'

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
  const currentPackID = useAppSelector(state => state.cards.currentPackId) // FIX IT потому что я не знаю где брать пакИД ?
  const currentPackUserID = currentPack && currentPack.packUserId
  const cardsTotalCount = currentPack && currentPack.cardsTotalCount
  const [whatModalIsActive, setWhatModalIsActive] = useState<string>('')
  const [useStateCardId, setUseStateCardId] = useState<string>('') //  кривое решение, чтобы знать ид карточки которую передаешь вниз при модалке с вопросом точно удалить?
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({
      type: SagaActions.GetOnePack,
      payload: { cardsPack_id: currentPackID, max: cardsTotalCount },
    })
  }, [cardsTotalCount])

  const onDeleteClickHandlerInTable = (cardId: string) => {
    setUseStateCardId(cardId) // кривое решение, чтобы знать ид карточки которую передаешь вниз при модалке с вопросом точно удалить?
    setWhatModalIsActive('delete') // открыть модалку
  }
  const onConfirmDeleteClickHandler = (id: string): void => {
    dispatch(deleteOneCard(id)) // в модалке, если нажал ДА ТОЧНО УДАЛИТЬ
    setWhatModalIsActive('')
  }
  const onEditClickHandler = (cardId: string): void => {
    setUseStateCardId(cardId)
    setWhatModalIsActive('edit')
  }
  const onConfirmEditClickHandler = (UpdatedCard: CardTypePartial) => {
    dispatch(updateOneCard({ ...UpdatedCard, _id: useStateCardId }))
  }
  const onCreateClickHandler = (): void => {
    setWhatModalIsActive('addCard')
  }
  const onConfirmCreateClickHandler = (Card: CardTypePartial) => {
    dispatch(createNewCard({ ...Card, cardsPack_id: currentPackID }))
  }
  const shouldElementBeShown = () => userID === currentPackUserID // Используется для колонки с кнопками удаления и едита, если не твои карточки - не увидишь( наверное надо и для кнопки добавления )
  const tableRows =
    currentPack &&
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
      {/* все названия кнопок и строк в константы? */}
      {shouldElementBeShown() && <Button onClick={onCreateClickHandler}> Add new card</Button>}
      <div className={shouldElementBeShown() ? `${s.tableHead}` : s.tableHeadFor3}>
        <span>Question</span>
        <span>Answer</span>
        <span>Grade</span>
        {shouldElementBeShown() && <span>Actions</span>}
      </div>
      {tableRows}
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
