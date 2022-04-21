import React, { ReactElement, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import {useNavigate, useSearchParams} from 'react-router-dom'

import s from './mainPage.module.scss'

import { TablePage } from 'components/common/table/TablePage'
import { Paths } from 'enums'
import { useAppSelector } from 'hooks'
import CardsTable from '../../components/Cards/CardsTable';

export const MainPage = (): ReactElement => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const [searchParams, setSearchParams ] = useSearchParams();
  const trueOrFalse = searchParams.has('packId')
  useEffect(()=> {
    setSearchParams({})
  }, [])
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Paths.Login)
    }
  }, [isLoggedIn])

  return (
    <div className={s.main}>
      {trueOrFalse? <CardsTable /> :<TablePage /> }
    </div>
  )
}
