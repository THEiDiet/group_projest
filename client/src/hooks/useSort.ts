import { useDispatch } from 'react-redux'

import { EHelpers } from 'enums'
import { getPacksS } from 'store/sagas/cardsSaga'

export const useSort = (sortName: string) => {
  let zeroOne = EHelpers.One
  let name: string = ''
  const dispatch = useDispatch()
  if (sortName === name) {
    dispatch(getPacksS({ sortPacks: `${zeroOne}${sortName}` }))
    zeroOne = EHelpers.One
  }
  if (sortName !== name) {
    name = sortName
    dispatch(getPacksS({ sortPacks: `${zeroOne}${sortName}` }))
    zeroOne = EHelpers.Zero
  }
}
