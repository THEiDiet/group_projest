import React from 'react'

import { SagaActions } from '../../enums/sagaActions'
import { useAppDispatch, useAppSelector } from '../../hooks'

import s from './style/CardsTable.module.css'

const CardsTable: React.FC = () => {
  const currentPack = useAppSelector(state => state.cards.currentPack)
  // eslint-disable-next-line no-underscore-dangle
  const userID = useAppSelector(state => state.user.userInfo._id)
  const dispatch = useAppDispatch()
  const onClickHandler = (): void => {
    dispatch({ type: SagaActions.GetOnePack, payload: '6259a1e4e09d9d0004160611' })
  }
  const tableRows =
    currentPack &&
    currentPack.cards.map(m => (
      // eslint-disable-next-line no-underscore-dangle
      <div className={s.tableRow} key={m._id}>
        <div className={s.tableTest}>{m.question}</div>
        <div className={s.tableTest}>{m.answer}</div>
        <div className={s.tableTest}>{m.grade}</div>
        <div className={s.tableTest}>
          <button type="button" color="red" disabled={userID !== m.user_id}>
            Delete
          </button>
          <button type="button" disabled={userID !== m.user_id}>
            Edit
          </button>
        </div>
      </div>
    ))
  return (
    <div>
      <button type="button" onClick={onClickHandler}>
        {' '}
        Click me
      </button>
      <div className={s.tableHead}>
        <span>Question</span>
        <span>Answer</span>
        <span>Grade</span>
        <span>Actions</span>
      </div>
      {tableRows}
    </div>
  )
}

export default CardsTable
