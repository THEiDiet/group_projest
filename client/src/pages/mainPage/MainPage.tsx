import React, { ReactElement, useCallback, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from './mainPage.module.scss'

// import { DebounceSearchInput } from 'components/common'
import { Table } from 'components/common/table'
import { Paths } from 'enums'
import { useAppSelector } from 'hooks'
import { setSearchPacks } from 'store/reducers'

export const MainPage = (): ReactElement => {
  const dispatch = useDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Paths.Login)
    }
  }, [isLoggedIn])
  useEffect(() => {
    dispatch({ type: 'GET_CARDS' })
  }, [])
  const searchByPacks = useCallback((pack: string): void => {
    dispatch(setSearchPacks(pack))
  }, [])
  return (
    <div className={s.main}>
      {/* <DebounceSearchInput placeholder="Search by title" searchValue={searchByPacks} /> */}
      <Table />
    </div>
  )
}
