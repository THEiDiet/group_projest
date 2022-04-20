import React, { FC, useCallback, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { Card } from 'components'
import { Button } from 'components/common/button/Button'
import { DebounceRange } from 'components/common/DebounceRange/DebounceRange'
import { DebounceSearchInput } from 'components/common/DebounceSearchInput/DebounceSearchInput'
import { Modal } from 'components/common/modal/Modal'
import { Paginator } from 'components/common/Pagination/Paginator'
import { TableCell, TableRow } from 'components/common/table'
import s from 'components/common/table/table.module.scss'
import { EHelpers, PaginationNames } from 'enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setMinMaxCardInPacks, setSearchPacks } from 'store/reducers'
import { getOnePackS, getPacksS } from 'store/sagas/cardsSaga'

export const Table: FC = React.memo(() => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [sortTitle, setSortTitle] = useState('')
  const [oneZero, setOneZero] = useState(true)
  const packs = useAppSelector(state => state.cards.packs)
  const currentPage = useAppSelector(state => state.cards.currentPage)
  const amountOfElementsToShow = useAppSelector(state => state.cards.amountOfElementsToShow)
  const portionSizeForPages = useAppSelector(state => state.cards.portionSizeForPages)
  const portionNumber = useAppSelector(state => state.cards.portionNumber)
  const totalItemsCount = useAppSelector<number>(state => state.cards.cardPacksTotalCount)
  const localMinRage = useAppSelector<number>(state => state.cards.localMinRage)
  const localMaxRage = useAppSelector<number>(state => state.cards.localMaxRage)
  const searchPack = useAppSelector<string>(state => state.cards.searchPack)
  const userId = useAppSelector<string>(state => state.user.userInfo.userId)
  const appDispatch = useAppDispatch()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPacksS({ packName: searchPack, min: localMinRage, max: localMaxRage }))
  }, [localMinRage, localMaxRage, searchPack, userId])

  const setOnlyUserPacks = (): void => {
    dispatch(getPacksS({ packName: searchPack, min: 0, max: localMaxRage, userId }))
  }
  const setAllPacks = (): void => {
    dispatch(getPacksS({ userId: '', packName: searchPack, min: localMinRage, max: localMaxRage }))
  }
  const sortByParam = (sortName: string): void => {
    if (sortName === sortTitle) {
      dispatch(
        getPacksS({
          sortPacks: `${Number(oneZero)}${sortName}`,
          page: currentPage,
          packName: searchPack,
          min: localMinRage,
          max: localMaxRage,
          userId,
        }),
      )
      setOneZero(!oneZero)
    }
    if (sortName !== sortTitle) {
      dispatch(
        getPacksS({
          sortPacks: `${EHelpers.One}${sortName}`,
          page: currentPage,
          packName: searchPack,
          min: localMinRage,
          max: localMaxRage,
          userId,
        }),
      )
      setOneZero(false)
      setSortTitle(sortName)
    }
  }
  const handlePageChange = (value: number): void => {
    const obj = sortTitle
      ? {
          sortPacks: `${Number(!oneZero)}${sortTitle}`,
          page: value,
          packName: searchPack,
          min: localMinRage,
          max: localMaxRage,
          userId,
        }
      : { page: value, packName: searchPack, min: localMinRage, max: localMaxRage, userId }
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
    dispatch(setSearchPacks(packName))
  }, [])
  const onTableRowClick = (id: string): void => {
    appDispatch(getOnePackS(id))
    setModalOpen(true)
  }
  const showQuantityPacks = useCallback((value: [number, number]): void => {
    dispatch(setMinMaxCardInPacks(value))
  }, [])

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
      <div>
        <DebounceSearchInput
          placeholder="What do you want to learn? "
          searchValue={searchByPacks}
        />
      </div>
      <div className={s.debounceRange}>
        <DebounceRange showQuantityPacks={showQuantityPacks} />
      </div>
      <div>
        <Button onClick={setOnlyUserPacks}> My Packs</Button>
        <Button onClick={setAllPacks}> All Packs</Button>
      </div>
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
})
