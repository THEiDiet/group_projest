import React, { useEffect, useState } from 'react'

import { EHelpers } from '../../../enums'
import { SagaActions } from '../../../enums/sagaActions'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { CardT } from '../../../types/PackTypes'
import { Button } from '../../common'

import s from './Learn.module.css'

import {rateCard} from '../../../store/sagas/cardsSaga';

const grades = ['No clue', 'Forgot', 'Not sure', 'Close enough', 'GOTCHA']

const getCard = (cards: CardT[]): CardT => {
  const sum = cards.reduce(
    (acc, card) => acc + (EHelpers.Six - card.grade) * (EHelpers.Six - card.grade),
    EHelpers.Zero,
  )
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (EHelpers.Six - card.grade) * (EHelpers.Six - card.grade)
      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 },
  )
  return cards[res.id + EHelpers.One]
}

type PropsType = {
  deactivateModal: (value: string) => void
}

const LearnPage: React.FC<PropsType> = ({ deactivateModal }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const currentPackID = useAppSelector(state => state.cards.currentPackId)
  const cards = useAppSelector(state => state.cards.currentPack?.cards) // FIX IT потому что я не знаю где брать пакИД ?
  const cardsTotalCount = useAppSelector(state => state.cards.currentPack?.cardsTotalCount)
  const [rateCardInfo, setRateCardInfo] = useState<{cardId: string, grade:number}>({cardId: '', grade: 0})

  const [card, setCard] = useState<CardT>({} as CardT)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (first) {
      dispatch({
        type: SagaActions.GetOnePack,
        payload: { cardsPack_id: currentPackID, max: cardsTotalCount },
      })
      setFirst(false)
    }
    if (cards?.length > EHelpers.Zero) setCard(getCard(cards))

    return () => {
    }
  }, [dispatch, cards, first])

  const onNext = (): void => {
    setIsChecked(false)
    setRateCardInfo({cardId: '', grade: 0})
    dispatch(rateCard({card_id: rateCardInfo.cardId, grade: rateCardInfo.grade}))
    if (cards.length > EHelpers.Zero) {
      setCard(getCard(cards))
    }
  }

  return (
    /* можно тут если тру , то стили менять карточки, тогда вроде норм будет? */
    <div className={s.container}>
      <div className={s.text}>Q: {card.question}</div>
      {!isChecked && (
        <div className={s.show}>
          <Button onClick={() => setIsChecked(true)}>Show Answer</Button>
        </div>
      )}
      {isChecked && (
        <>
          <div className={s.text}>A: {card.answer}</div>
          <div className={s.options}>
            <span className={s.text}>Rate Yourself:</span>

            {grades.map((g, i) => (
                // eslint-disable-next-line react/no-array-index-key,no-underscore-dangle
                <Button className={s.option} key={`grade-${i}`} onClick={() => {setRateCardInfo({cardId: card._id, grade: i+EHelpers.One})}}>
                  <span className={s.optionText}>{g}</span>
              </Button>
            ))}
          </div>
          <div className={s.buttonContainer}>
            <Button className={s.cancelButton} onClick={() => deactivateModal('')}>
              Cancel
            </Button>
            <Button className={s.nextButton} onClick={onNext} disabled={!rateCardInfo.cardId}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default LearnPage
