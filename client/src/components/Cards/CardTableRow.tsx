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
  <div className={shouldElementBeShown() ? `${s.tableRow}` : s.tableRowFor3} key={card._id}>
    <div>{card.question}</div>
    <div>{card.answer}</div>
    <div>{card.grade}</div>
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
