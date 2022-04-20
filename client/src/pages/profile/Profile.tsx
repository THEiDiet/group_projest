import React, { FC } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import styles from './Profile.module.scss'

import { Table } from 'components/common'
import { Paths } from 'enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { EditableUserName } from 'pages/profile/EditableUserName'
import { UserAvatar } from 'pages/profile/UserAvatar'

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const stateName = useAppSelector<string>(state => state.user.userInfo.name)
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to={Paths.Login} state={{ from: location }} replace />
  }
  return (
    <div>
      <div>
        <h1 style={{ margin: '10px 0 20px 0' }}>Profile</h1>
      </div>
      <div className={styles.profileWrapper}>
        <div className={styles.wrapperUserInfo}>
          <UserAvatar />
          <EditableUserName />
        </div>

        <div className={styles.userTableWrapper}>
          <div>
            <span className={styles.packUserName}> Packs list {stateName}:</span>
          </div>
          <Table />
        </div>
      </div>
    </div>
  )
}
