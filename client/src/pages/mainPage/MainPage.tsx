import React, { ReactElement, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import s from './mainPage.module.scss'

import { Table } from 'components/common/table'

export const MainPage = (): ReactElement => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: 'GET_CARDS' })
  }, [])

  return (
    <div className={s.main}>
      <Table />
    </div>
  )
}
