import React, { FC, useEffect } from 'react'

import { Navigate, useLocation, useSearchParams } from 'react-router-dom'

import CardsTable from '../../components/Cards/CardsTable'
import { TablePage } from '../../components/common/table/TablePage'

import styles from './Profile.module.scss'

import noAvatar from 'assets/user-no-avatar.png'
import { EditableUserInfo } from 'components/EditableUserInfo/EditableUserInfo'
import { Paths } from 'enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { EditableUserName } from 'pages/profile/EditableUserName'
import { UserAvatar } from 'pages/profile/UserAvatar'
import { setEditMode } from 'store/reducers'

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const userName = useAppSelector<string>(state => state.user.userInfo.name)
  const userAvatar = useAppSelector<string | undefined>(state => state.user.userInfo.avatar)
  const isEditMode = useAppSelector<boolean>(state => state.app.isEditMode)
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const trueOrFalse = searchParams.has('packId')
  useEffect(() => {
    setSearchParams({})
  }, [])

  const changeEditMode = (): void => {
    useAppDispatch(setEditMode(!isEditMode))
  }

  if (!isLoggedIn) {
    return <Navigate to={Paths.Login} state={{ from: location }} replace />
  }
  return (
    <div>
      {isEditMode ? <EditableUserInfo changeEditMode={changeEditMode} /> : ''}
      <div className={styles.profileWrapper}>
        <div className={styles.wrapperUserInfo}>
          <div>
            <img className={styles.avatarIcon} src={userAvatar || noAvatar} alt="User Avatar" />
          </div>
          <div className={styles.user_name}>
            <span>{userName || 'Enter your name'}</span>
          </div>
          <button type="button" onClick={changeEditMode}>
            Edit profile
          </button>
        </div>

        <div className={styles.userTableWrapper}>
          <div>
            <span className={styles.packUserName}> Packs list {userName}:</span>
          </div>
          {trueOrFalse ? <CardsTable /> : <TablePage />}
        </div>
      </div>
    </div>
  )
}
