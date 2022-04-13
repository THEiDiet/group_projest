import React, { ChangeEvent } from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import Pagination from '@mui/material/Pagination'
// eslint-disable-next-line import/no-extraneous-dependencies
import Stack from '@mui/material/Stack'

import s from './styles/Paginator.module.css'

import { useAppDispatch, useAppSelector } from 'hooks'
import { setAmountOfElementsToShow, setCurrentPage } from 'store/reducers/cardsReducer'

type propsType = {
  currentPage?: number
  totalPacksCount?: number
  amountOfElementsToShow?: number
  itemName?: string
  portionSize: number
}
// TODO: вынести в enum
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const options = [2, 5, 10]
    // TODO: не забываем типизировать
export const Paginator = () => {
  const currentPage = useAppSelector<number>(state => state.cards.currentPage)
  const totalItemsCount = useAppSelector<number>(state => state.cards.totalPacksCount)
  const amountOfElementsToShow = useAppSelector<number>(state => state.cards.amountOfElementsToShow)
  const pagesAmount = Math.ceil(totalItemsCount / amountOfElementsToShow)
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [portionNumber, setPortionNumber] = useState<number>(1)
  const portionSize = 10
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const leftSideBorder = (portionNumber - 1) * portionSize + 1
  const rightSideBorder = portionNumber * portionSize
  const portionCount = Math.ceil(pagesAmount / portionSize)

  const pages = []
  // eslint-disable-next-line no-plusplus,@typescript-eslint/no-magic-numbers
  for (let i = 1; i < pagesAmount + 1; i++) {
    pages.push(i)
  }

  const dispatch = useAppDispatch()
  // TODO: не забываем типизировать
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value))
  }
  // TODO: не забываем типизировать
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAmountOfElementsToShow(+event.target.value))
  }

  return (
    <div className={s.pages}>
      {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
      {portionNumber > 1 && (
        <>
          {' '}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,@typescript-eslint/no-magic-numbers */}
          <span className={s.button} onClick={() => setPortionNumber(prevState => prevState - 1)}>
            Prev
          </span>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span
            className={s.page}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              setPortionNumber(1)
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              handlePageChange(1)
            }}
          >
            {' '}
            1{' '}
          </span>
        </>
      )}
      <div className={s.pageContainer}>
        {pages
          .filter(f => leftSideBorder <= f && f <= rightSideBorder)
          .map(m => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <span
              className={`${s.page} ${currentPage === m ? s.currentPage : ''}`}
              key={m}
              onClick={() => handlePageChange(m)}
            >
              {' '}
              {m}
            </span>
          ))}
      </div>

      {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
      {portionCount > portionNumber && portionNumber > 1 && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <span
          className={s.page}
          onClick={() => {
            setPortionNumber(portionCount)
            handlePageChange(pagesAmount)
          }}
        >
          {' '}
          {pagesAmount}{' '}
        </span>
      )}

      {portionCount > portionNumber && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,@typescript-eslint/no-magic-numbers
        <span className={s.button} onClick={() => setPortionNumber(prevState => prevState + 1)}>
          Next
        </span>
      )}

      <span className={s.space}> Show:</span>
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
    </div>
  )
}
