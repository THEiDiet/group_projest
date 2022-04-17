import React, { FC, useState } from 'react'

import { useDispatch } from 'react-redux'

import { Card } from 'components'
import { Modal } from 'components/common/modal/Modal'
import { Paginator } from 'components/common/Pagination/Paginator'
import { TableCell, TableRow } from 'components/common/table'
import s from 'components/common/table/table.module.scss'
import { EHelpers, PaginationNames } from 'enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { getPacksS } from 'store/sagas/cardsSaga'

export const Table: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [sortTitle, setSortTitle] = useState('')
  const [oneZero, setOneZero] = useState(true)
  const packs = useAppSelector(state => state.cards.packs)
  const currentPage = useAppSelector(state => state.cards.currentPage)
  const amountOfElementsToShow = useAppSelector(state => state.cards.amountOfElementsToShow)
  const portionSizeForPages = useAppSelector(state => state.cards.portionSizeForPages)
  const portionNumber = useAppSelector(state => state.cards.portionNumber)
  const totalItemsCount = useAppSelector<number>(state => state.cards.totalPacksCount)

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

  const onTableRowClick = (id: string): void => {
    appDispatch({ type: 'GET_ONE_PACK_CARDS', payload: id })
    setModalOpen(true)
  }
  const tableRows = packs.length
    ? packs.map(({ user_name: userName, _id: id, name, updated, cardsCount }) => {
        const date = new Date(updated).toLocaleDateString()
        return (
          <TableRow key={id} onClick={() => onTableRowClick(id)}>
            <TableCell head>{name}</TableCell>
            <TableCell>{cardsCount}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{userName}</TableCell>
            <TableCell>text</TableCell>
          </TableRow>
        )
      })
    : []
  return (
    <div className={s.table}>
      <div className={s.head}>
        <TableRow head>
          <TableCell head btn onClick={sortByName}>
            Name
          </TableCell>
          <TableCell head btn onClick={sortByCardsCount}>
            Cards
          </TableCell>
          <TableCell head btn onClick={sortByDate}>
            Last updated
          </TableCell>
          <TableCell head btn onClick={sortByUserName}>
            Created by
          </TableCell>
          <TableCell head>Action</TableCell>
        </TableRow>
      </div>
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
      <Modal
        component={<Card />}
        handleOpen={() => {
          setModalOpen(!isModalOpen)
        }}
        isOpen={isModalOpen}
      />
    </div>
  )
}
