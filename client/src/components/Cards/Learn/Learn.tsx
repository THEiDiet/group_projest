import React, { useEffect, useState } from 'react'

import { EHelpers } from '../../../enums'
import { SagaActions } from '../../../enums/sagaActions'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { CardT } from '../../../types/PackTypes'
import { Button } from '../../common'

import s from './Learn.module.css'

import styles from 'styles/Auth/Auth.module.scss'

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал']

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
  console.log('test: ', sum, rand, res)

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
    console.log('cards', cards)
    if (cards?.length > EHelpers.Zero) setCard(getCard(cards))

    return () => {
      console.log('LearnContainer useEffect off')
    }
  }, [dispatch, cards, first])

  const onNext = (): void => {
    setIsChecked(false)
    // dispatch оценки
    if (cards.length > EHelpers.Zero) {
      // dispatch CHEGO ?
      setCard(getCard(cards))
    } else {
      console.log('and?')
      // cheto tut nado delat?
    }
  }

  return (
    /* можно тут если тру , то стили менять карточки, тогда вроде норм будет? */
    <div className={s.container}>
      <div>Q: {card.question}</div>
      {!isChecked && (
        <div>
          <Button onClick={() => setIsChecked(true)}>Show Answer</Button>
        </div>
      )}
      {isChecked && (
        <>
          <div>A: {card.answer}</div>
          <div
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            {grades.map((g, i) => (
              // куда-то записать оценку надо
              // eslint-disable-next-line react/no-array-index-key
              <Button key={`grade-${i}`} onClick={() => {}}>
                {g}
              </Button>
            ))}
          </div>

          <div className={s.buttonContainer}>
            <Button className={s.cancelButton} onClick={() => deactivateModal('')}>
              Cancel
            </Button>
            <Button className={s.nextButton} onClick={onNext}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default LearnPage
