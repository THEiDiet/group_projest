import React, { FC } from 'react'

import CardsTable from '../../components/Cards/CardsTable'
import { Paginator } from '../../components/common/Pagination/Paginator'

export const TestComponent: FC = () => (
  <div>
    <CardsTable />
    <Paginator
      onPageChangeHandle={() => {}}
      currentPage={1}
      totalItemsCount={100}
      amountOfElementsToShow={10}
      itemName="cards"
      portionSizeForPages={10}
      portionNumber={1}
    />
  </div>
)
