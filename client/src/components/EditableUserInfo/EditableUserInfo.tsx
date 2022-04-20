import React, { ChangeEvent, FC, useCallback, useState } from 'react'

import noAvatar from 'assets/user-no-avatar.png'
import { Button } from 'components/common'
import styles from 'components/EditableUserInfo/EditableUserInfo.module.scss'
import { Input } from 'components/index'
import { useAppDispatch, useAppSelector } from 'hooks'
import { requestChangeUserInfo } from 'store/reducers/userReducer'

export type EditableUserInfoPropsType = {
  changeEditMode: () => void
}

export const EditableUserInfo: FC<EditableUserInfoPropsType> = React.memo(({ changeEditMode }) => {
  const dispatch = useAppDispatch()
  const userName = useAppSelector<string>(state => state.user.userInfo.name)
  const userAvatar = useAppSelector<string | undefined>(state => state.user.userInfo.avatar)
  const userEmail = useAppSelector<string>(state => state.user.userInfo.email)
  const [name, setNewName] = useState<string>(userName)
  const [email, setNewEmail] = useState<string>(userEmail)

  const changeUserInfo = (): void => {
    if (userAvatar) {
      dispatch(requestChangeUserInfo(name, userAvatar, email))
    } else {
      dispatch(requestChangeUserInfo(name, '', email))
    }
  }
  const changeUserAvatar = (avatar: string): void => {
    dispatch(requestChangeUserInfo(name, avatar, email))
  }
  const onAvatarPhotoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const index = 0
      const reader = new FileReader()
      const file = e.target.files[index]
      reader.readAsDataURL(e.target.files[index])
      reader.onloadend = event => {
        if (typeof event?.target?.result === 'string') {
          changeUserAvatar(event?.target?.result)
        }
      }
    }
  }, [])
  const changeUserName = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewName(e.currentTarget.value)
  }
  const changeUserEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewEmail(e.currentTarget.value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.editableWrapper}>
        <div>
          <img className={styles.avatarIcon} src={userAvatar || noAvatar} alt="User Avatar" />
          <input className={styles.avatarIconChange} type="file" onChange={onAvatarPhotoChange} />
        </div>
        <div>
          <div className={styles.customInput}>
            <Input label="Name" name="Name" type="text" onChange={changeUserName} value={name} />
          </div>
          <div className={styles.customInput}>
            <Input
              label="Email"
              name="Email"
              type="text"
              onChange={changeUserEmail}
              value={email}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button type="button" onClick={changeEditMode}>
            Cancel
          </Button>
          <Button type="button" onClick={changeUserInfo}>
            Save
          </Button>
        </div>
        <div />
      </div>
    </div>
  )
})
