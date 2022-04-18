import React from 'react'

import { CardT, CardTypePartial } from '../../types/PackTypes'
import { Button } from '../common'

import s from './style/CardsTable.module.css'

type CardTableRowPropsType = {
  card: CardT
  shouldElementBeShown: () => boolean
  onDeleteClickHandlerInTable: (id: string) => void
  onEditClickHandler: (id: string) => void
}
export const CardTableRow: React.FC<CardTableRowPropsType> = ({
  card,
  shouldElementBeShown,
  onDeleteClickHandlerInTable,
  onEditClickHandler,
}) => (
  // eslint-disable-next-line no-underscore-dangle,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div className={s.tableRow} key={card._id}>
    <div className={s.tableTest}>{card.question}</div>
    <div className={s.tableTest}>{card.answer}</div>
    <div className={s.tableTest}>{card.grade}</div>
    {shouldElementBeShown() && (
      <div className={s.tableTest}>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <Button red type="button" onClick={() => onDeleteClickHandlerInTable(card._id)}>
          Delete
        </Button>
        {/* eslint-disable-next-line no-underscore-dangle */}
        <Button onClick={() => onEditClickHandler(card._id)}>Edit</Button>
      </div>
    )}
  </div>
)
