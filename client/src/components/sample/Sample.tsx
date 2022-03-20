import React, { ReactElement } from 'react'

import s from 'components/sample/style/sample.module.scss'
import { useAppDispatch, useAppSelector } from 'hooks'
import { UserType } from 'types'

export const Sample = (): ReactElement => {
  const dispatch = useAppDispatch()
  const users: UserType[] = useAppSelector(state => state.test.users)
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch({ type: 'sagaAction' })
  }
  // @ts-ignore
  return (
    <div className={s.sample}>
      <button type="button" onClick={onButtonClick}>
        getUsers
      </button>
      {users.length && users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  )
}
