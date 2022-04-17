import React, { FC } from 'react'

import s from 'components/common/table/table.module.scss'
import { TableRowProps } from 'types/TableTypes'

export const TableRow: FC<TableRowProps> = props => {
  const { head, onClick, children } = props
  const className = `${head ? s.head__row : s.body__row} ${s.row}`

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={className} tabIndex={0} role="button" onClick={onClick}>
      {children}
    </div>
  )
}
