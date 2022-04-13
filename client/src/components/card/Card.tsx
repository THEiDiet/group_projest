import React, { FC } from 'react'

import s from './styles/Card.module.scss'

import { useAppSelector } from 'hooks'

export const Card: FC = () => {
  const currentPack = useAppSelector(state => state.packs.currentPack)
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return currentPack && currentPack.cards[0] ? (
    <div>
      {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
      <div>{currentPack.cards[0].question}</div>
    </div>
  ) : (
    <div>loading</div>
  )
}
