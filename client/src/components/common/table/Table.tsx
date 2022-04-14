import React, { FC, useEffect, useState } from 'react'
import React, { FC, useCallback, useState } from 'react'

import { Card } from 'components'
import { Modal } from 'components/common/modal/Modal'
import { Paginator } from 'components/common/Pagination/Paginator'
import { TableCell, TableRow } from 'components/common/table'
import s from 'components/common/table/table.module.scss'
import { EHelpers, EPacksSort } from 'enums'
import { DebounceSearchInput } from 'components/DebounceSearchInput'
import { EPacksSort } from 'enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { sortCards } from 'store/reducers'
import { CardsPackT } from 'types/PacksType'
import { setSearchPacks, sortCards } from 'store/reducers'

export const Table: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const packs = useAppSelector(state => state.cards.packs)
  const currentPage = useAppSelector(state => state.cards.currentPage)
  const portionSize = useAppSelector(state => state.cards.amountOfElementsToShow)
  const [pieceOfPacks, setPieceOfPacks] = useState<CardsPackT[]>([])
  const packs = useAppSelector(state => state.packs.actualPacks)
  const dispatch = useAppDispatch()
  const sortByName = (): void => {
    dispatch(sortCards(EPacksSort.Name))
  }
  const sortByUserName = (): void => {
    dispatch(sortCards(EPacksSort.UserName))
  }
  const sortByDate = (): void => {
    dispatch(sortCards(EPacksSort.Date))
  }
  const sortByCardsCount = (): void => {
    dispatch(sortCards(EPacksSort.CardsCount))
  }
  const onTableRowClick = (id: string): void => {
    dispatch({ type: 'GET_ONE_PACK_CARDS', payload: id })
    setModalOpen(true)
  }

  const tableRows = packs.map(({ user_name: userName, _id: id, name, updated, cardsCount }) => {
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
  const searchByPacks = useCallback((pack: string): void => {
    dispatch(setSearchPacks(pack))
  }, [])
  const tableRows = pieceOfPacks.length
    ? pieceOfPacks.map(({ user_name: userName, _id: id, name, updated, cardsCount }) => {
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
  useEffect(() => {
    setPieceOfPacks(
      packs.slice((currentPage - EHelpers.One) * portionSize, currentPage * portionSize),
    )
  }, [packs, currentPage, portionSize])
  return (
    <div className={s.table}>
      <DebounceSearchInput placeholder="Title" searchValue={searchByPacks} />
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
      <Paginator />
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
