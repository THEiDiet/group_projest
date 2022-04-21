import React, { FC } from 'react'

import s from './table.module.scss'

import { TableCell } from 'components/common/table/TableCell'

type TableHeaderProps = {
  sortByName: () => void
  sortByCardsCount: () => void
  sortByUserName: () => void
  sortByDate: () => void
}

export const TableHeader: FC<TableHeaderProps> = props => {
  const { sortByCardsCount, sortByDate, sortByUserName, sortByName } = props
  return (
    <div className={s.head__row}>
      <button type="button" className={s.head__col} onClick={sortByName}>
        Name
      </button>
      <button type="button" className={s.head__col} onClick={sortByCardsCount}>
        Cards
      </button>
      <button type="button" className={s.head__col} onClick={sortByDate}>
        Last updated
      </button>
      <button type="button" className={s.head__col} onClick={sortByUserName}>
        Created by
      </button>
      <div>Action</div>
    </div>
  )
}
