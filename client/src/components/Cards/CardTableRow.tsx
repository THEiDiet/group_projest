import React from 'react'

import { CardT } from '../../types/PackTypes'
import { Button } from '../common'

import s from './style/CardsTable.module.css'
import {EHelpers} from '../../enums';

type CardTableRowPropsType = {
  card: CardT
  shouldElementBeShown: () => boolean
  onDeleteClickHandlerInTable: (id: string) => void
  onEditClickHandler: (id: string) => void
  index: number
}
export const CardTableRow: React.FC<CardTableRowPropsType> = ({
  card,
  shouldElementBeShown,
  onDeleteClickHandlerInTable,
  onEditClickHandler,
  index,
}) => {
  const style = () => {
    if (index % EHelpers.Two > EHelpers.Zero) {
      return { backgroundColor: '#EBE0E9' }
    }

    return {}
  }

  return (
    // eslint-disable-next-line no-underscore-dangle,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={shouldElementBeShown() ? `${s.tableRow}` : s.tableRowFor3} key={card._id} style={style()}>
      <div>{card.question}</div>
      <div>{card.answer}</div>
      <div>{`${(card.grade).toFixed(EHelpers.One)} / 5`}</div>
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
}
