import React, { FC, useEffect } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import styles from './Profile.module.scss'

import { Table } from 'components/common'
import { Paths } from 'enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { EditableUserName } from 'pages/profile/EditableUserName'
import { UserAvatar } from 'pages/profile/UserAvatar'
import { getPacksS } from 'store/sagas/cardsSaga'

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const stateName = useAppSelector<string>(state => state.user.userInfo.name)
  const userId = useAppSelector<string>(state => state.user.userInfo.userId)
  const min = useAppSelector(state => state.cards.rangeValues.minCardsCount)
  const max = useAppSelector(state => state.cards.rangeValues.maxCardsCount)

  const dispatch = useAppDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch(getPacksS({ min, max }))
  }, [])
  if (!isLoggedIn) {
    return <Navigate to={Paths.Login} state={{ from: location }} replace />
  }
  return (
    <div>
      <div>
        <h1>Profile</h1>
      </div>
      <div className={styles.wrapperUserInfo}>
        <UserAvatar />
        <EditableUserName />
      </div>
      <div className={styles.userTable}>
        <div>
          <span className={styles.packUserName}> Packs list {stateName}&apos;s</span>
        </div>
        <Table />
      </div>
    </div>
  )
}
