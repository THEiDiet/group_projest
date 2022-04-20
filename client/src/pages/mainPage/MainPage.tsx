import React, { ReactElement, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from './mainPage.module.scss'

import { Table } from 'components/common/table'
import { Paths } from 'enums'
import { useAppSelector } from 'hooks'

export const MainPage = (): ReactElement => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Paths.Login)
    }
  }, [isLoggedIn])

  return (
    <div className={s.main}>
      <Table />
    </div>
  )
}
