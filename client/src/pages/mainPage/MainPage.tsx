import React, { ReactElement, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import s from './mainPage.module.scss'

import { userApi } from 'api'
import { Modal } from 'components/common/modal/Modal'
import { Table } from 'components/common/table'
import { useAppDispatch, useAppSelector } from 'hooks'

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
