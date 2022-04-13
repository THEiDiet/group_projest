import React, {ReactElement, useCallback, useState} from 'react'

import {userApi} from 'api'
import {useAppSelector} from 'hooks'
import {Paths} from 'enums'
import {Navigate} from 'react-router-dom'
import {DebounceSearchInput} from 'components/DebounceSearchInput'
import {useDispatch} from 'react-redux'

export const MainPage = (): ReactElement => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const searchByPacks = useCallback((pack: string): void => {
        // dispatch()
        // dispatch(setSearchPackAC(pack));
        // dispatch(rerenderPackAC());
    }, []);

    if (!isLoggedIn) return <Navigate to={Paths.Login}/>
    return <div>
        <h1>MainPage</h1>
        <DebounceSearchInput searchValue={searchByPacks}/>
    </div>
}
