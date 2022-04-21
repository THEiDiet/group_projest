import React from 'react'

import { Button } from '../common'

import s from './style/CardsTable.module.css'

type PropsType = {
  handleReturnHomeClick: () => void
  shouldElementBeShown: boolean
  onCreateClickHandler: () => void
}

const CardsHeader: React.FC<PropsType> = ({
  handleReturnHomeClick,
  shouldElementBeShown,
  onCreateClickHandler,
}) => (
  <div className={s.btn}>
    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
    <h1 onClick={handleReturnHomeClick} style={{padding: '10px'}}>Go back</h1>
    <div className={s.test} style={{padding: '5px'}}>
      {shouldElementBeShown && <Button onClick={onCreateClickHandler}> Add new card</Button>}
    </div>
  </div>
)

export default CardsHeader
