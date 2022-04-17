import React, { ChangeEvent, useCallback } from 'react'

import noAvatar from 'assets/user-no-avatar.png'
import { useAppDispatch, useAppSelector } from 'hooks'
import styles from 'pages/profile/Profile.module.scss'
import { requestChangeUserInfo } from 'store/reducers/userReducer'

export const UserAvatar = React.memo(() => {
  const userAvatar = useAppSelector<string | undefined>(state => state.user.userInfo.avatar)
  const userName = useAppSelector<string>(state => state.user.userInfo.name)
  const dispatch = useAppDispatch()
  const changeUserAvatar = (avatar: string, name: string): void => {
    dispatch(requestChangeUserInfo(name, avatar))
  }
  const onAvatarPhotoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const index = 0
      const reader = new FileReader()
      const file = e.target.files[index]
      reader.readAsDataURL(e.target.files[index])
      reader.onloadend = event => {
        if (typeof event?.target?.result === 'string') {
          changeUserAvatar(event?.target?.result, userName)
        }
      }
    }
  }, [])
  return (
    <div>
      <img className={styles.avatarIcon} src={userAvatar || noAvatar} alt="User Avatar" />
      <input type="file" onChange={onAvatarPhotoChange} />
    </div>
  )
})
