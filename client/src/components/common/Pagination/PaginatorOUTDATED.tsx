import React, { ChangeEvent } from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import Pagination from '@mui/material/Pagination'
// eslint-disable-next-line import/no-extraneous-dependencies
import Stack from '@mui/material/Stack'

import { EHelpers } from '../../../enums'

import s from './styles/Paginator.module.css'

import { useAppDispatch, useAppSelector } from 'hooks'
import { setAmountOfElementsToShow, setCurrentPage } from 'store/reducers/cardsReducer'

type propsType = {
  currentPage?: number
  totalPacksCount?: number
  amountOfElementsToShow?: number
  itemName?: string
}

const options = [EHelpers.Two, EHelpers.Five, EHelpers.Ten]

export const PaginatorOUTDATED = () => {
  const currentPage = useAppSelector<number>(state => state.cards.currentPage)
  const totalItemsCount = useAppSelector<number>(state => state.cards.cardPacksTotalCount)
  const amountOfElementsToShow = useAppSelector<number>(state => state.cards.amountOfElementsToShow)
  const pages = totalItemsCount / amountOfElementsToShow

  const dispatch = useAppDispatch()

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value))
  }
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAmountOfElementsToShow(+event.target.value))
  }

  return (
    <Stack>
      <Stack spacing={1} className={s.pages} direction="row">
        <Pagination
          count={pages}
          color="primary"
          shape="rounded"
          sx={{ marginY: 3 }}
          page={currentPage}
          onChange={handlePageChange}
          siblingCount={1}
        />
        <Stack spacing={1} className={s.pages} direction="row">
          <span> Show:</span>
          <select
            value={amountOfElementsToShow}
            onChange={handleSelectChange}
            className={s.select}
            defaultValue={10}
          >
            {options.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {/* вместо packs должно быть значение из пропсов props.itemName */}
          <span> packs per page</span>
        </Stack>
      </Stack>
    </Stack>
  )
}
