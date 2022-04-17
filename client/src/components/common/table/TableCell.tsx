import React, { FC } from 'react'

import s from 'components/common/table/table.module.scss'
import { TableCellProps } from 'types'

export const TableCell: FC<TableCellProps> = props => {
  const { head, children, btn, onClick } = props
  const handleClick = (): void => {
    // eslint-disable-next-line no-unused-expressions
    onClick && onClick()
  }
  const className = `${s.col} ${head ? s.col_bold : ''}`
  if (head && btn) {
    return (
      <button type="button" onClick={handleClick} className={`${s.col} ${s.col_bold} ${s.col_btn}`}>
        {children}
      </button>
    )
  }
  return <div className={className}>{children}</div>
}
