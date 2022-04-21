import React, {FC, useEffect} from 'react'

import {Navigate, useLocation, useSearchParams} from 'react-router-dom'

import styles from './Profile.module.scss'


import { Paths } from 'enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { EditableUserName } from 'pages/profile/EditableUserName'
import { UserAvatar } from 'pages/profile/UserAvatar'
import {TablePage} from '../../components/common/table/TablePage';
import CardsTable from '../../components/Cards/CardsTable';

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const stateName = useAppSelector<string>(state => state.user.userInfo.name)
  const location = useLocation()
  const [searchParams, setSearchParams ] = useSearchParams();
  const trueOrFalse = searchParams.has('packId')
  useEffect(()=> {
    setSearchParams({})
  }, [])

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
          {trueOrFalse? <CardsTable /> : <TablePage />  }
        </div>
      </div>
    </div>
  )
}
