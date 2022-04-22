import React, { ChangeEvent, FC, useCallback, useState } from 'react'

import { userApi } from 'api'
import addPhoto from 'assets/icons/addPhoto.svg'
import noAvatar from 'assets/user-no-avatar.png'
import { Button } from 'components/common'
import s from 'components/EditableUserInfo/EditableUserInfo.module.scss'
import { Input } from 'components/index'
import { useAppDispatch, useAppSelector } from 'hooks'
import { requestChangeUserInfo } from 'store/reducers/userReducer'
import { restorePassS } from 'store/sagas/userSaga'

export type EditableUserInfoPropsType = {
  changeEditMode: () => void
}

const MIN_EMAIL_LENGTH = 6

export const EditableUserInfo: FC<EditableUserInfoPropsType> = React.memo(({ changeEditMode }) => {
  const dispatch = useAppDispatch()
  const userName = useAppSelector<string>(state => state.user.userInfo.name)
  const userAvatar = useAppSelector<string | undefined>(state => state.user.userInfo.avatar)
  const userEmail = useAppSelector<string>(state => state.user.userInfo.email)
  const [name, setNewName] = useState<string>(userName)
  const [email, setNewEmail] = useState<string>(userEmail)
  const [restoreEmail, setRestoreEmail] = useState('')

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRestoreEmail(e.target.value)
  }

  const restorePassword = async (): Promise<void> => {
    dispatch(restorePassS(restoreEmail))
  }

  return (
    <div className={s.wrapper}>
      <div className={s.editableWrapper}>
        <div>
          <img className={s.avatarIcon} src={userAvatar || noAvatar} alt="User Avatar" />
          <img className={s.avatarAdd} src={addPhoto} alt="Add new avatar" />
          <input className={s.avatarIconChange} type="file" onChange={onAvatarPhotoChange} />
        </div>
        <div>
          <div className={s.customInput}>
            <Input label="Name" name="Name" type="text" onChange={changeUserName} value={name} />
          </div>
          <div className={s.customInput}>
            <Input
              label="Email"
              name="Email"
              type="text"
              onChange={changeUserEmail}
              value={email}
            />
          </div>
        </div>
        <div className={s.buttonContainer}>
          <Button type="button" onClick={changeEditMode}>
            Cancel
          </Button>
          <Button type="button" onClick={changeUserInfo}>
            Save
          </Button>
        </div>
        <div>
          <div className={s.customInput}>
            <Input
              name="restore"
              label="Restore pass"
              type="text"
              onChange={handleChange}
              value={restoreEmail}
            />
          </div>
        </div>
        <Button className={s.button} onClick={restorePassword}>Restore password</Button>
        <div />
      </div>
    </div>
  )
})
