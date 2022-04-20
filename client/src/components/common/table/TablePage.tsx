import React, { FC, useCallback, useState } from 'react'

import { TableHead } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Paginator } from 'components/common/Pagination/Paginator'
import s from 'components/common/table/table.module.scss'
import { TableCell } from 'components/common/table/TableCell'
import { TableHeader } from 'components/common/table/TableHeader'
import { TableItem } from 'components/common/table/TableItem'
import { TableRow } from 'components/common/table/TableRow'
import { DebounceSearchInput } from 'components/DebounceSearchInput'
import { EHelpers, PaginationNames } from 'enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setCurrentPackId } from 'store/reducers/cardsReducer'
import { getPacksS } from 'store/sagas/cardsSaga'

export const TablePage: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [sortTitle, setSortTitle] = useState('')
  const [oneZero, setOneZero] = useState(true)
  const packs = useAppSelector(state => state.cards.packs)
  const currentPage = useAppSelector(state => state.cards.currentPage)
  const amountOfElementsToShow = useAppSelector(state => state.cards.amountOfElementsToShow)
  const portionSizeForPages = useAppSelector(state => state.cards.portionSizeForPages)
  const portionNumber = useAppSelector(state => state.cards.portionNumber)
  const totalItemsCount = useAppSelector<number>(state => state.cards.cardPacksTotalCount)
  const appDispatch = useAppDispatch()
  const dispatch = useDispatch()

  const sortByParam = (sortName: string): void => {
    if (sortName === sortTitle) {
      dispatch(getPacksS({ sortPacks: `${Number(oneZero)}${sortName}`, page: currentPage }))
      setOneZero(!oneZero)
    }
    if (sortName !== sortTitle) {
      dispatch(getPacksS({ sortPacks: `${EHelpers.One}${sortName}`, page: currentPage }))
      setOneZero(false)
      setSortTitle(sortName)
    }
  }
  const handlePageChange = (value: number): void => {
    const obj = sortTitle
      ? { sortPacks: `${Number(!oneZero)}${sortTitle}`, page: value }
      : { page: value }
    dispatch(getPacksS(obj))
  }
  const sortByName = (): void => {
    sortByParam('name')
  }
  const sortByUserName = (): void => {
    sortByParam('user_name')
  }
  const sortByDate = (): void => {
    sortByParam('updated')
  }
  const sortByCardsCount = (): void => {
    sortByParam('cardsCount')
  }
  const searchByPacks = useCallback((packName: string): void => {
    dispatch(getPacksS({ packName }))
  }, [])
  // const onTableRowClick = (id: string): void => {
  //   appDispatch(getOnePackS(id))
  //   setModalOpen(true)
  // }
  const navigate = useNavigate()
  const onTableRowClick = (id: string): void => {
    appDispatch(setCurrentPackId(id))
    navigate('/test')
  }

  const tableRows = packs.map(({ user_name: userName, _id: id, name, updated, cardsCount }) => (
    <TableItem
      name={name}
      id={id}
      userName={userName}
      updated={updated}
      cardsCount={cardsCount}
      key={id}
    />
  ))
  return (
    <div className={s.table}>
      <DebounceSearchInput placeholder="Search..." searchValue={searchByPacks} />
      <TableHeader
        sortByName={sortByName}
        sortByCardsCount={sortByCardsCount}
        sortByUserName={sortByUserName}
        sortByDate={sortByDate}
      />
      <div className={s.body}>{tableRows}</div>
      <Paginator
        currentPage={currentPage}
        itemName={PaginationNames.Packs}
        totalItemsCount={totalItemsCount}
        amountOfElementsToShow={amountOfElementsToShow}
        portionSizeForPages={portionSizeForPages}
        portionNumber={portionNumber}
        onPageChangeHandle={handlePageChange}
      />
    </div>
  )
}
