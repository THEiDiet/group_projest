import React, { FC } from 'react'

import s from './table.module.scss'

import { Button } from 'components/common/button/Button'
import { useAppSelector } from 'hooks'

type TableItemProps = {
  name: string
  id: string
  userName: string
  updated: string
  cardsCount: number
  userId: string
  onLookButtonClickHandler: (id: string) => void
  onEditClick: (packId: string) => void
  onDeleteClick: (packId: string) => void
}

export const TableItem: FC<TableItemProps> = props => {
  const {
    userName,
    name,
    updated,
    cardsCount,
    id,
    onLookButtonClickHandler,
    userId,
    onEditClick,
    onDeleteClick,
  } = props
  const date = new Date(updated).toLocaleDateString()
  const currentUserId = useAppSelector(state => state.user.userInfo.userId)
  const onEditClickCb = (): void => {
    onEditClick(id)
  }
  const onDelClickCb = (): void => {
    onDeleteClick(id)
  }
  return (
    <div className={`${s.body__row} ${s.row}`}>
      <div>{name}</div>
      <div>{cardsCount}</div>
      <div>{date}</div>
      <div>{userName}</div>
      <div>
        {userId === currentUserId && (
          <>
            <Button onClick={onEditClickCb}>Edit</Button>
            <Button onClick={onDelClickCb}>Delete</Button>
          </>
        )}
        <Button onClick={() => onLookButtonClickHandler(id)}>Look</Button>
      </div>
    </div>
  )
}
