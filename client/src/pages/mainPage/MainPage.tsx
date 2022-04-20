import React, { ReactElement, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from './mainPage.module.scss'

import { TablePage } from 'components/common/table/TablePage'
import { Paths } from 'enums'
import { useAppSelector } from 'hooks'
import { getPacksS } from 'store/sagas/cardsSaga'
// import { Table } from 'components/common/table'

export const MainPage = (): ReactElement => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const min = useAppSelector(state => state.cards.rangeValues.minCardsCount)
  const max = useAppSelector(state => state.cards.rangeValues.maxCardsCount)
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Paths.Login)
    }
  }, [isLoggedIn])

  useEffect(() => {
    dispatch(getPacksS({ min, max }))
  }, [])

  return (
    <div className={s.main}>
      <TablePage />
    </div>
  )
}
