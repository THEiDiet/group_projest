import React, { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react'

import { Checkbox, FormControlLabel } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { DebounceSearchInput } from '../DebounceSearchInput/DebounceSearchInput'

import { AddPackT } from 'api/cardsApi'
import { Card, Input } from 'components'
import { Button } from 'components/common/button/Button'
import { Modal } from 'components/common/modal/Modal'
import ModalButton from 'components/common/modalButton/ModalButton'
import { Paginator } from 'components/common/Pagination/Paginator'
import s from 'components/common/table/table.module.scss'
import { TableHeader } from 'components/common/table/TableHeader'
import { TableItem } from 'components/common/table/TableItem'
import { EHelpers, PaginationNames } from 'enums'
import { useAppDispatch, useAppSelector } from 'hooks'
import { setSearchPacks } from 'store/reducers'
import { setCurrentPackId } from 'store/reducers/cardsReducer'
import { getPacksS } from 'store/sagas/cardsSaga'
import { addPackS, delPackS, updatePackS } from 'store/sagas/packsSaga'

export const TablePage: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [sortTitle, setSortTitle] = useState('')
  const [oneZero, setOneZero] = useState(true)
  const [addPackValue, setAddPackValue] = useState('')
  const [checkboxValue, setCheckboxValue] = useState(false)
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

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckboxValue(Boolean(e.target.value))
  }
  const onChangePackValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddPackValue(e.target.value)
  }
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
  const navigate = useNavigate()
  const searchByPacks = useCallback((packName: string): void => {
    dispatch(getPacksS({ packName }))
    dispatch(setSearchPacks(packName))
  }, [])
  const [searchParams, setSearchParams] = useSearchParams()
  const onLookButtonClickHandler = (id: string): void => {
    if (id) {
      setSearchParams({ packId: id })
    } else {
      setSearchParams({})
    }
  }
  const addNewPack = (): void => {
    const payload: AddPackT = {
      cardsPack: {
        name: addPackValue,
        deckCover: '',
        private: checkboxValue,
      },
    }
    dispatch(addPackS(payload))
    setAddPackValue('')
    setCheckboxValue(false)
    setModalOpen(false)
  }

  const updatePack = (): void => {
    const payload: AddPackT = {
      cardsPack: {
        _id: '',
        name: addPackValue,
        deckCover: '',
        private: checkboxValue,
      },
    }
    dispatch(addPackS(payload))
    setAddPackValue('')
    setCheckboxValue(false)
    setModalOpen(false)
  }
  const currentPackRef = useRef('')
  const [editPackValue, setEditPackValue] = useState('')
  const onEditPackChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setEditPackValue(e.target.value)
  }
  const [checkboxEditValue, setCheckboxEditValue] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const onEditClick = (packId: string): void => {
    // eslint-disable-next-line no-underscore-dangle
    const currentPack = packs.filter(pack => pack._id === packId)[EHelpers.Zero]
    setEditPackValue(currentPack.name)
    currentPackRef.current = packId
    setCheckboxEditValue(currentPack.private)
    setEditModalOpen(true)
  }
  const onChangeCheckboxEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckboxEditValue(Boolean(e.target.value))
  }
  const onDelPack = (packId: string): void => {
    dispatch(delPackS(packId))
  }
  const tableRows = packs.map(
    ({ user_name: userName, _id: id, name, updated, cardsCount, user_id: idUser }) => (
      <TableItem
        name={name}
        id={id}
        userName={userName}
        updated={updated}
        cardsCount={cardsCount}
        key={id}
        userId={idUser}
        onEditClick={onEditClick}
        onDeleteClick={onDelPack}
        onLookButtonClickHandler={onLookButtonClickHandler}
      />
    ),
  )
  const updateCurrentPack = (): void => {
    const payload: AddPackT = {
      cardsPack: {
        _id: currentPackRef.current,
        name: editPackValue,
        private: checkboxEditValue,
      },
    }
    dispatch(updatePackS(payload))
    setEditModalOpen(false)
  }
  return (
    <div className={s.table}>
      {/* <Button onClick={addNewPack}>add pack</Button> */}
      <ModalButton
        isOpen={isModalOpen}
        handleOpen={() => setModalOpen(!isModalOpen)}
        title="add pack"
      >
        <Input name="add pack" type="text" onChange={onChangePackValue} value={addPackValue} />
        <FormControlLabel
          control={<Checkbox value={checkboxValue} onChange={onChangeCheckbox} />}
          label="private?"
        />
        <Button onClick={addNewPack}>add</Button>
      </ModalButton>
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
      <Modal
        handleOpen={() => {
          setEditModalOpen(!isEditModalOpen)
        }}
        isOpen={isEditModalOpen}
      >
        <Input
          name="edit pack"
          type="text"
          onChange={onEditPackChangeValue}
          value={editPackValue}
        />
        <FormControlLabel
          control={<Checkbox value={checkboxEditValue} onChange={onChangeCheckboxEdit} />}
          label="private?"
        />
        <Button onClick={updateCurrentPack}>update</Button>
      </Modal>
    </div>
  )
}
