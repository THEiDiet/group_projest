import React, { FC, useCallback, useEffect } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import styles from './Profile.module.scss'

import { DebounceSearchInput, Table } from 'components/common'
import { DebounceRange } from 'components/common/DebounceRange/DebounceRange'
import { Paths } from 'enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { EditableUserName } from 'pages/profile/EditableUserName'
import { UserAvatar } from 'pages/profile/UserAvatar'
import { setSearchPacks } from 'store/reducers'
import { setFixCountPack } from 'store/reducers/cardsReducer'

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const stateName = useAppSelector<string>(state => state.user.userInfo.name)
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector<string>(state => state.user.userInfo._id)
  const dispatch = useAppDispatch()
  const location = useLocation()
  useEffect(() => {
    if (isLoggedIn) {
      dispatch({ type: 'GET_CARDS' })
    }
  }, [dispatch, isLoggedIn])
  const searchByPacks = useCallback((packName: string): void => {
    dispatch(setSearchPacks(packName))
  }, [])
  // const showOnlyUserPack = useCallback(() => {
  //   dispatch({ type: 'GET_CARDS', payload: userId })
  // }, [])
  const showQuantityPacks = useCallback((value: [number, number]): void => {
    dispatch(setFixCountPack(value))
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
      <DebounceRange showQuantityPacks={showQuantityPacks} />
      <div className={styles.userTable}>
        <div>
          <span className={styles.packUserName}> Packs list {stateName}&apos;s</span>
        </div>
        <DebounceSearchInput placeholder="Search by title" searchValue={searchByPacks} />
        <Table />
      </div>
    </div>
  )
}
