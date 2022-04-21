import React from 'react'

import s from './style/CardsTable.module.css'

type PropsType = {
    shouldElementBeShown: boolean
}

const CardsTableHeader: React.FC<PropsType> = ({shouldElementBeShown}) => (
  <div className={shouldElementBeShown ? `${s.tableHead}` : s.tableHeadFor3}>
    <span>Question</span>
    <span>Answer</span>
    <span>Grade</span>
    {shouldElementBeShown && <span>Actions</span>}
  </div>
)

export default CardsTableHeader
