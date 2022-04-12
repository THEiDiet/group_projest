import React, { FC, useState } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import { cardsApi } from '../../api/cardsApi'
import { Button } from '../../components/common'
import { Paths } from '../../enums'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { requestChangeName } from '../../store/reducers/userReducer'

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const stateName = useAppSelector<string>(state => state.user.userInfo.name)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>(stateName || '')
  const [edit, setEdit] = useState<boolean>(false)

  if (!isLoggedIn) {
    return <Navigate to={Paths.Login} state={{ from: location }} replace />
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const changeName = () => {
    dispatch(requestChangeName(name))
  }
  const setCard = (): void => {
    cardsApi.setPack()
  }
  const getCard = (): void => {
    cardsApi.getPack()
  }
  return (
    <div>
      <div>Profile</div>
      {edit ? (
        <input
          type="text"
          value={name}
          onChange={e => {
            setName(e.currentTarget.value)
          }}
          onBlur={() => setEdit(false)}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setEdit(true)}>{stateName || 'Enter new name'}</span>
      )}
      <div>
        <button type="button" onClick={changeName}>
          Confirm
        </button>
      </div>
      <Button onClick={setCard} type="button">
        setCard
      </Button>
      <Button onClick={getCard} type="button">
        getCard
      </Button>
    </div>
  )
}
