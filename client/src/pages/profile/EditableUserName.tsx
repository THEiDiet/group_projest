import React, { FC, useState } from 'react'

import styles from './Profile.module.scss'

import { useAppDispatch, useAppSelector } from 'hooks'
import { requestChangeUserInfo } from 'store/reducers/userReducer'

export const EditableUserName: FC = React.memo(() => {
  const dispatch = useAppDispatch()
  const stateName = useAppSelector<string>(state => state.user.userInfo.name)
  const userAvatar = useAppSelector<string | undefined>(state => state.user.userInfo.avatar)
  const [name, setName] = useState<string>(stateName)
  const [edit, setEdit] = useState<boolean>(false)
  const changeName = (): void => {
    if (userAvatar) {
      dispatch(requestChangeUserInfo(name, userAvatar))
    } else {
      dispatch(requestChangeUserInfo(name, ''))
    }
  }
  return (
    <div className={styles.user_name}>
      {edit ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={e => {
              setName(e.currentTarget.value)
            }}
            onBlur={() => setEdit(false)}
            //  eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
        </div>
      ) : (
        <span onDoubleClick={() => setEdit(true)}>{stateName || 'Enter new name'}</span>
      )}
      <div>
        <button type="button" onClick={changeName}>
          Confirm
        </button>
      </div>
    </div>
  )
})


