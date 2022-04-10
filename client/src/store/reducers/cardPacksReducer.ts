import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {InitialStateType, PacksType, PackType} from "types";

const initialState: InitialStateType = {
    packs: {
        minCardsCount: 0,
        maxCardsCount: 30,
        pageCount: 5,
        page: 1,
        cardPacks: [] as PackType[],
    } as PacksType,
    sort: '',
    searchPack: '',
    isMyPack: false,
    rerenderFlag: ['rerender'],
    localMinRage: 0,
    localMaxRage: 30,
    resultMessageAddPack: '',
};

const slice = createSlice({
    name: 'packs',
    initialState,
    reducers: {
        setSearchPack: (state, action: PayloadAction<string>) => {
            state.searchPack = action.payload
        }
    },
})
export const packsReducer = slice.reducer
export const { setSearchPack } = slice.actions