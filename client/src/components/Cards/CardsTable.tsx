import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { SagaActions } from '../../enums/sagaActions'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { createNewCard, deleteOneCard, getPacksS, updateOneCard } from '../../store/sagas/cardsSaga'
import { CardTypePartial } from '../../types/PackTypes'
import { Button } from '../common'

import { AddCardInputForm } from './AddCardInputForm/AddCardInputForm'
import { EditCardInputForm } from './AddCardInputForm/EditCardInputForm'
import CardsHeader from './CardsHeader'
import CardsTableHeader from './CardsTableHeader'
import { CardTableRow } from './CardTableRow'
import LearnPage from './Learn/Learn'
import DeleteCard from './Modal/DeleteCardModal/DeleteCard'
import ModalForCards from './Modal/ModalForCards/ModalForCards'

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
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({
      type: SagaActions.GetOnePack,
      payload: { cardsPack_id: currentPackID, max: cardsTotalCount },
    })
  }, [cardsTotalCount])
  const page = useAppSelector(state => state.cards.currentPage)
  const handleReturnHomeClick = (): void => {
    dispatch(getPacksS({ page }))
    navigate('/')
  }

  const onDeleteClickHandlerInTable = (cardId: string): void => {
    setUseStateCardId(cardId) // кривое решение, чтобы знать ид карточки которую передаешь вниз при модалке с вопросом точно удалить?
    setWhatModalIsActive('delete') // открыть модалку
  }
  const onConfirmDeleteClickHandler = (id: string): void => {
    dispatch(deleteOneCard(id)) // в модалке, если нажал ДА ТОЧНО УДАЛИТЬ
    setWhatModalIsActive('') // close modal
  }
  const onEditClickHandler = (cardId: string): void => {
    setUseStateCardId(cardId)
    setWhatModalIsActive('edit')
  }
  const onConfirmEditClickHandler = (updatedCard: CardTypePartial): void => {
    dispatch(updateOneCard({ ...updatedCard, _id: useStateCardId })) // цепляю ид карточки из юз стейта
  }
  const onCreateClickHandler = (): void => {
    setWhatModalIsActive('addCard')
  }
  const onConfirmCreateClickHandler = (card: CardTypePartial): void => {
    dispatch(createNewCard({ ...card, cardsPack_id: currentPackID })) // цепляю ид каррент пака
  }
  const shouldElementBeShown = (): boolean => userID === currentPackUserID // Используется для колонки с кнопками удаления и едита, если не твои карточки - не увидишь( наверное надо и для кнопки добавления )
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
      <Button onClick={() => setWhatModalIsActive('learn')}> Learn </Button>
      <CardsHeader
        handleReturnHomeClick={handleReturnHomeClick}
        shouldElementBeShown={shouldElementBeShown()}
        onCreateClickHandler={onCreateClickHandler}
      />
      <CardsTableHeader shouldElementBeShown={shouldElementBeShown()} />
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
        {whatModalIsActive === 'learn' && <LearnPage />}
      </ModalForCards>
    </div>
  )
}

export default CardsTable
