import React, { FC, useState } from 'react'

import { useDispatch } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import styles from './Profile.module.scss'

import noAvatar from 'assets/user-no-avatar.png'
import { Table } from 'components/common'
import { EditableUserInfo } from 'components/EditableUserInfo/EditableUserInfo'
import { Paths } from 'enums'
import { useAppSelector } from 'hooks'
import { setEditMode } from 'store/reducers'

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const userName = useAppSelector<string>(state => state.user.userInfo.name)
  const userAvatar = useAppSelector<string | undefined>(state => state.user.userInfo.avatar)
  const isEditMode = useAppSelector<boolean>(state => state.app.isEditMode)
  const location = useLocation()
  const dispatch = useDispatch()
  const changeEditMode = (): void => {
    dispatch(setEditMode(!isEditMode))
  }

  if (!isLoggedIn) {
    return <Navigate to={Paths.Login} state={{ from: location }} replace />
  }
  return (
    <div>
      {isEditMode ? <EditableUserInfo changeEditMode={changeEditMode} /> : ''}
      <div>
        <h1 style={{ margin: '10px 0 20px 0' }}>Profile</h1>
      </div>
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
          <Table />
        </div>
      </div>
    </div>
  )
}
