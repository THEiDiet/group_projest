import React, { FC, useState } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import { Paths } from '../../enums'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { requestChangeName } from '../../store/reducers/userReducer'

export const Profile: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const stateName = useAppSelector<string>(state => state.user.userInfo.name)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [name, setName] = useState<string>(stateName)
  const [edit, setEdit] = useState<boolean>(false)

  if (!isLoggedIn) {
    return <Navigate to={Paths.Login} state={{ from: location }} replace />
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const changeName = () => {
    dispatch(requestChangeName(name))
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
        <span onDoubleClick={() => setEdit(true)}>{name} --</span>
      )}
      <button type="button" onClick={changeName}>
        Send new name?
      </button>
    </div>
  )
}
