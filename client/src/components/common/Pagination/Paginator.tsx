import React, { ChangeEvent } from 'react'

import { Button } from 'components/common/button/Button'
import s from 'components/common/Pagination/styles/Paginator.module.scss'
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
  onPageChangeHandle: (value: number) => void
}

const options = [EHelpers.Two, EHelpers.Five, EHelpers.Ten]

export const Paginator: React.FC<propsType> = ({
  currentPage,
  totalItemsCount,
  amountOfElementsToShow,
  itemName,
  portionSizeForPages,
  portionNumber,
  onPageChangeHandle,
}) => {
  const pagesAmount = Math.ceil(totalItemsCount / amountOfElementsToShow)
  const leftSideBorder = (portionNumber - EHelpers.One) * portionSizeForPages + EHelpers.One
  const rightSideBorder = portionNumber * portionSizeForPages
  const portionCount = Math.ceil(pagesAmount / portionSizeForPages)
  const pages = []
  for (let i = EHelpers.One; i < pagesAmount + EHelpers.One; i += EHelpers.One) {
    pages.push(i)
  }

  const appDispatch = useAppDispatch()
  // useEffect(() => {
  //   appDispatch(setCurrentPage(EHelpers.One))
  // }, [])

  const handlePortionNumberChange = (value: number): void => {
    appDispatch(setPortionNumber(value))
  }

  const handlePageChange = (value: number): void => {
    onPageChangeHandle(value)
    appDispatch(setCurrentPage(value))
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    appDispatch(setAmountOfElementsToShow(+event.target.value))
    appDispatch(setPortionNumber(EHelpers.One))
    appDispatch(setCurrentPage(EHelpers.One))
  }

  return (
    <div className={s.pages}>
      {portionNumber > EHelpers.One && (
        <>
          <button
            type="button"
            className={s.button}
            onClick={() => handlePortionNumberChange(portionNumber - EHelpers.One)}
            onKeyPress={() => {}}
          >
            Prev
          </button>
          <button
            type="button"
            className={s.page}
            onClick={() => {
              handlePortionNumberChange(EHelpers.One)
              handlePageChange(EHelpers.One)
            }}
            onKeyPress={() => {}}
          >
            {' '}
            1{' '}
          </button>
        </>
      )}
      <div className={s.pageContainer}>
        {pages
          .filter(f => leftSideBorder <= f && f <= rightSideBorder)
          .map(m => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <Button
              type="button"
              className={`${s.page} ${currentPage === m ? s.currentPage : ''}`}
              key={m}
              onClick={() => handlePageChange(m)}
              onKeyPress={() => {}}
            >
              {' '}
              {m}
            </Button>
          ))}
      </div>

      {portionCount > portionNumber && portionNumber > EHelpers.One && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <Button
          type="button"
          className={s.page}
          onClick={() => {
            handlePortionNumberChange(portionCount)
            handlePageChange(pagesAmount)
          }}
          onKeyPress={() => {}}
        >
          {' '}
          {pagesAmount}{' '}
        </Button>
      )}

      {portionCount > portionNumber && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <Button
          type="button"
          className={s.button}
          onClick={() => handlePortionNumberChange(portionNumber + EHelpers.One)}
          onKeyPress={() => {}}
        >
          Next
        </Button>
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
