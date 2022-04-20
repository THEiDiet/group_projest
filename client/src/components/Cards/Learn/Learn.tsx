import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { EHelpers } from '../../../enums'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { CardT } from '../../../types/PackTypes'
import { Button } from '../../common'

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал']

const getCard = (cards: CardT[]):CardT => {
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

const LearnPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const cards = useAppSelector(state => state.cards.currentPack?.cards)

  const [card, setCard] = useState<CardT>({
    _id: 'fake',
    cardsPack_id: '',
    answer: 'answer fake',
    question: 'question fake',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('LearnContainer useEffect')
    if (first) {
      // dispatch((id))
      setFirst(false)
    }

    console.log('cards', cards)
    if (cards.length > EHelpers.Zero) setCard(getCard(cards))

    return () => {
      console.log('LearnContainer useEffect off')
    }
  }, [dispatch, cards, first])

  const onNext = ():void => {
    setIsChecked(false)

    if (cards.length > EHelpers.Zero) {
      // dispatch
      setCard(getCard(cards))
    } else {
      console.log('and?')
    }
  }

  return (
    <div>
      LearnPage
      <div>{card.question}</div>
      <div>
        <Button onClick={() => setIsChecked(true)}>check</Button>
      </div>
      {isChecked && (
        <>
          <div>{card.answer}</div>

          {grades.map((g, i) => (
            <Button key={`grade-${i}`} onClick={() => {}}>
              {g}
            </Button>
          ))}

          <div>
            <Button onClick={onNext}>next</Button>
          </div>
        </>
      )}
    </div>
  )
}

export default LearnPage
