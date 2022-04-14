import React, { ChangeEvent } from 'react'

import s from './styles/Paginator.module.css'

import { EHelpers } from 'enums'
import { useAppDispatch } from 'hooks'
import {
  setAmountOfElementsToShow,
  setCurrentPage,
  setPortionNumber,
} from 'store/reducers/cardsReducer'

type propsType = {
  currentPage: number
  totalItemsCount: number
  amountOfElementsToShow: number
  itemName: string
  portionSizeForPages: number
  portionNumber: number
}

const options = [EHelpers.Two, EHelpers.Five, EHelpers.Ten]

export const Paginator: React.FC<propsType> = ({
  currentPage,
  totalItemsCount,
  amountOfElementsToShow,
  itemName,
  portionSizeForPages,
  portionNumber,
}) => {
  const pagesAmount = Math.ceil(totalItemsCount / amountOfElementsToShow)
  const leftSideBorder = (portionNumber - EHelpers.One) * portionSizeForPages + EHelpers.One
  const rightSideBorder = portionNumber * portionSizeForPages
  const portionCount = Math.ceil(pagesAmount / portionSizeForPages)
  const pages = []
  for (let i = EHelpers.One; i < pagesAmount + EHelpers.One; i += EHelpers.One) {
    pages.push(i)
  }

  const dispatch = useAppDispatch()

  const handlePortionNumberChange = (value: number): void => {
    dispatch(setPortionNumber(value))
  }

  const handlePageChange = (value: number): void => {
    dispatch(setCurrentPage(value))
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setAmountOfElementsToShow(+event.target.value))
    dispatch(setPortionNumber(EHelpers.One))
    dispatch(setCurrentPage(EHelpers.One))
  }

  return (
    <div className={s.pages}>
      {portionNumber > EHelpers.One && (
        <>
          {' '}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <span
            className={s.button}
            onClick={() => handlePortionNumberChange(portionNumber - EHelpers.One)}
            onKeyPress={() => {}}
          >
            Prev
          </span>
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <span
            className={s.page}
            onClick={() => {
              handlePortionNumberChange(EHelpers.One)
              handlePageChange(EHelpers.One)
            }}
            onKeyPress={() => {}}
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
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <span
              className={`${s.page} ${currentPage === m ? s.currentPage : ''}`}
              key={m}
              onClick={() => handlePageChange(m)}
              onKeyPress={() => {}}
            >
              {' '}
              {m}
            </span>
          ))}
      </div>

      {portionCount > portionNumber && portionNumber > EHelpers.One && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span
          className={s.page}
          onClick={() => {
            handlePortionNumberChange(portionCount)
            handlePageChange(pagesAmount)
          }}
          onKeyPress={() => {}}
        >
          {' '}
          {pagesAmount}{' '}
        </span>
      )}

      {portionCount > portionNumber && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span
          className={s.button}
          onClick={() => handlePortionNumberChange(portionNumber + EHelpers.One)}
          onKeyPress={() => {}}
        >
          Next
        </span>
      )}

      <span className={s.space}> Show:</span>
      <select value={amountOfElementsToShow} onChange={handleSelectChange} className={s.select}>
        {options.map(m => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <span> {itemName} per page</span>
    </div>
  )
}
