import React, { ReactElement, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from './mainPage.module.scss'

import { Table } from 'components/common/table'
import { Paths } from 'enums'
import { useAppSelector } from 'hooks'
import { getPacksS } from 'store/sagas/cardsSaga'

export const MainPage = (): ReactElement => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const initStatePacks = useAppSelector(state => state.cards.packs)
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Paths.Login)
    } else {
      dispatch(getPacksS({ packName: '' }))
    }
  }, [isLoggedIn])

  return (
    <div className={s.main}>
      <Table />
    </div>
  )
}
